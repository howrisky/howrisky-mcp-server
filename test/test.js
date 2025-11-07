#!/usr/bin/env node

/**
 * Test script for howrisky-mcp-server
 *
 * Tests the stdio-to-HTTP bridge by simulating MCP client interactions.
 */

import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

const API_KEY = process.env.HOWRISKY_API_KEY || 'test-key';

// Test messages
const testMessages = [
  {
    name: 'Initialize',
    message: { jsonrpc: '2.0', method: 'initialize', params: {}, id: 1 }
  },
  {
    name: 'Tools List',
    message: { jsonrpc: '2.0', method: 'tools/list', params: {}, id: 2 }
  },
  {
    name: 'Calculate Portfolio Risk',
    message: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'calculate_portfolio_risk',
        arguments: {
          assets: [{ ticker: 'SPY', allocation: 1.0 }],
          initial_investment: 100000,
          time_horizon_years: 10,
          simulations: 1000
        }
      },
      id: 3
    }
  }
];

async function runTests() {
  console.log('🧪 Testing howrisky-mcp-server\n');

  // Spawn the MCP server
  const server = spawn('node', ['index.js'], {
    env: { ...process.env, HOWRISKY_API_KEY: API_KEY },
    cwd: process.cwd()
  });

  let testIndex = 0;
  let passedTests = 0;
  let failedTests = 0;

  // Handle server output (JSON-RPC responses)
  server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());

    for (const line of lines) {
      try {
        const response = JSON.parse(line);
        const testName = testMessages[testIndex - 1]?.name || 'Unknown';

        console.log(`\n✅ ${testName}:`);
        console.log(JSON.stringify(response, null, 2));

        if (response.error) {
          console.log(`❌ Test failed: ${response.error.message}`);
          failedTests++;
        } else {
          passedTests++;
        }

      } catch (error) {
        console.error(`Parse error: ${line}`);
      }
    }
  });

  // Handle server errors
  server.stderr.on('data', (data) => {
    process.stderr.write(`[Server] ${data}`);
  });

  // Handle server exit
  server.on('close', (code) => {
    console.log(`\n\n📊 Test Summary:`);
    console.log(`   Passed: ${passedTests}`);
    console.log(`   Failed: ${failedTests}`);
    console.log(`   Total:  ${passedTests + failedTests}`);

    if (failedTests === 0 && passedTests > 0) {
      console.log(`\n✅ All tests passed!`);
      process.exit(0);
    } else {
      console.log(`\n❌ Some tests failed`);
      process.exit(1);
    }
  });

  // Wait for server to initialize
  await setTimeout(1000);

  // Send test messages
  for (const test of testMessages) {
    console.log(`\n📤 Sending: ${test.name}`);
    server.stdin.write(JSON.stringify(test.message) + '\n');
    testIndex++;

    // Wait between messages
    await setTimeout(500);
  }

  // Wait for responses
  await setTimeout(3000);

  // Close server
  server.stdin.end();
}

// Run tests
runTests().catch(error => {
  console.error(`Test runner error: ${error.message}`);
  process.exit(1);
});
