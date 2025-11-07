/**
 * Configuration loader for HowRisky MCP Server.
 *
 * Loads API key from (in priority order):
 * 1. CLI argument: --api-key=xxx
 * 2. Environment variable: HOWRISKY_API_KEY
 * 3. Config file: ~/.howrisky/config.json
 */

import { readFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

export async function loadConfig() {
  let apiKey = null;

  // Priority 1: CLI argument
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith('--api-key=')) {
      apiKey = arg.split('=')[1];
      break;
    }
  }

  // Priority 2: Environment variable
  if (!apiKey) {
    apiKey = process.env.HOWRISKY_API_KEY;
  }

  // Priority 3: Config file
  if (!apiKey) {
    try {
      const configPath = join(homedir(), '.howrisky', 'config.json');
      const configContent = await readFile(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      apiKey = config.apiKey;
    } catch (error) {
      // Config file doesn't exist or is invalid - that's okay
    }
  }

  return {
    apiKey,
    apiBaseUrl: process.env.HOWRISKY_API_URL || 'https://mcp.howrisky.ai'
  };
}

/**
 * Validate that an API key is configured.
 *
 * @param {string} apiKey
 * @throws {Error} if API key is missing or invalid format
 */
export function validateApiKey(apiKey) {
  if (!apiKey) {
    throw new Error(
      'API key is required. Set it via:\n' +
      '  - Environment variable: export HOWRISKY_API_KEY=your-key\n' +
      '  - Config file: ~/.howrisky/config.json\n' +
      '  - CLI argument: --api-key=your-key\n\n' +
      'Get your API key at: https://howrisky.ai/mcp/pricing'
    );
  }

  // Basic format validation (should be prefix.key format)
  if (!apiKey.includes('.')) {
    throw new Error(
      'Invalid API key format. Expected: prefix.key\n' +
      'Get a valid key at: https://howrisky.ai/mcp/pricing'
    );
  }
}
