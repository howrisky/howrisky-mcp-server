#!/usr/bin/env node

/**
 * HowRisky MCP Server
 *
 * Bridges stdio (MCP protocol) to HowRisky HTTP API.
 * Enables Claude Desktop, Cline, and other MCP clients to access
 * institutional-grade Monte Carlo simulations.
 *
 * Usage:
 *   howrisky-mcp
 *   howrisky-mcp --api-key=your-key-here
 *   HOWRISKY_API_KEY=your-key howrisky-mcp
 */

import { createInterface } from 'readline';
import { loadConfig } from './lib/config.js';
import { makeHttpRequest } from './lib/http-client.js';

const API_BASE_URL = 'https://mcp.howrisky.ai';

class HowRiskyMCPServer {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.running = true;

    // Create readline interface for stdin/stdout
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    // Log to stderr (stdout is reserved for JSON-RPC)
    this.log('HowRisky MCP Server started (stdio transport)');
    this.log(`API endpoint: ${API_BASE_URL}`);

    if (!this.apiKey) {
      this.log('WARNING: No API key configured. Get one at https://howrisky.ai/mcp/pricing');
    }
  }

  log(message) {
    /**
     * Log to stderr (stdout is reserved for JSON-RPC messages).
     */
    process.stderr.write(`[HowRisky MCP] ${message}\n`);
  }

  async handleMessage(messageData) {
    /**
     * Handle a single JSON-RPC message.
     *
     * @param {Object} messageData - Parsed JSON-RPC request
     * @returns {Object} JSON-RPC response
     */
    try {
      // Make HTTP request to HowRisky API
      const response = await makeHttpRequest(
        API_BASE_URL,
        messageData,
        this.apiKey
      );

      return response;

    } catch (error) {
      this.log(`Error handling message: ${error.message}`);

      // Return JSON-RPC error
      return {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal error',
          data: error.message
        },
        id: messageData.id || null
      };
    }
  }

  async run() {
    /**
     * Main server loop - read from stdin, write to stdout.
     */
    this.rl.on('line', async (line) => {
      try {
        // Skip empty lines
        if (!line.trim()) {
          return;
        }

        // Parse JSON-RPC message
        let messageData;
        try {
          messageData = JSON.parse(line);
        } catch (error) {
          // Send parse error
          const errorResponse = {
            jsonrpc: '2.0',
            error: {
              code: -32700,
              message: 'Parse error',
              data: error.message
            },
            id: null
          };
          process.stdout.write(JSON.stringify(errorResponse) + '\n');
          return;
        }

        // Handle the message
        const response = await this.handleMessage(messageData);

        // Write response to stdout
        process.stdout.write(JSON.stringify(response) + '\n');

      } catch (error) {
        this.log(`Unexpected error: ${error.message}`);
      }
    });

    this.rl.on('close', () => {
      this.log('Client disconnected');
      this.running = false;
    });

    // Handle process signals
    process.on('SIGINT', () => {
      this.log('Received SIGINT, shutting down...');
      this.rl.close();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      this.log('Received SIGTERM, shutting down...');
      this.rl.close();
      process.exit(0);
    });
  }
}

// Main entry point
async function main() {
  try {
    // Load configuration (API key)
    const config = await loadConfig();

    // Create and run server
    const server = new HowRiskyMCPServer(config.apiKey);
    await server.run();

  } catch (error) {
    process.stderr.write(`Fatal error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
