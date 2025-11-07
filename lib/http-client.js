/**
 * HTTP client for HowRisky API.
 *
 * Makes JSON-RPC 2.0 requests to https://mcp.howrisky.ai
 */

import fetch from 'node-fetch';

/**
 * Make HTTP request to HowRisky MCP API.
 *
 * @param {string} baseUrl - API base URL (default: https://mcp.howrisky.ai)
 * @param {Object} jsonRpcMessage - JSON-RPC 2.0 request
 * @param {string} apiKey - HowRisky API key
 * @returns {Promise<Object>} JSON-RPC 2.0 response
 */
export async function makeHttpRequest(baseUrl, jsonRpcMessage, apiKey) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
        'User-Agent': 'howrisky-mcp-server/1.0.0'
      },
      body: JSON.stringify(jsonRpcMessage),
      // Timeout after 60 seconds (Monte Carlo can be slow)
      timeout: 60000
    });

    // Parse response
    const responseData = await response.json();

    // Return the JSON-RPC response (could be success or error)
    return responseData;

  } catch (error) {
    // Network or parsing error - return JSON-RPC error
    return {
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: 'HTTP request failed',
        data: {
          error: error.message,
          hint: 'Check your internet connection and that https://mcp.howrisky.ai is accessible'
        }
      },
      id: jsonRpcMessage.id || null
    };
  }
}
