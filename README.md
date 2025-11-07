# HowRisky MCP Server

**Monte Carlo risk analysis for AI agents**

Enable your AI assistant (Claude Desktop, Cursor, Windsurf, Cline, GitHub Copilot, PearAI, ChatGPT) to access institutional-grade financial risk modeling with fat-tail distributions and proprietary KDE algorithms.

---

## Installation

### Option 1: NPX Package (Recommended - stdio transport)

For local AI tools (Claude Desktop, Cline, Cursor, Windsurf):

```bash
npm install -g howrisky-mcp-server
```

Or use directly with NPX (no install needed):

```bash
npx howrisky-mcp-server
```

### Option 2: Remote HTTP Server (Direct API access)

For custom integrations, web-based AI tools, or programmatic access:

**Endpoint:** `https://mcp.howrisky.ai`

No installation required - just make HTTP POST requests with your API key.

---

## Setup

### 1. Get API Key

Sign up for a free API key at: **https://howrisky.ai/mcp/pricing**

Free tier includes:
- 100 API calls/month
- All 8 MCP tools
- Full Monte Carlo simulations (up to 100K paths)

---

### 2. Configure API Key

**For NPX Package (Option 1):**

**Method A: Environment Variable** (Recommended)
```bash
export HOWRISKY_API_KEY="your-api-key-here"
```

**Method B: Config File**
```bash
mkdir -p ~/.howrisky
echo '{"apiKey": "your-api-key-here"}' > ~/.howrisky/config.json
```

**Method C: CLI Argument**
```bash
howrisky-mcp --api-key=your-api-key-here
```

**For Remote Server (Option 2):**

Include in HTTP request headers:
```bash
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

---

## Integration with AI Tools

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "howrisky": {
      "command": "npx",
      "args": ["howrisky-mcp-server"],
      "env": {
        "HOWRISKY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Restart Claude Desktop. Ask: *"Using HowRisky, calculate the risk of a 60/40 portfolio"*

---

### Cline (VS Code Extension)

**MCP Marketplace:** Install HowRisky from Cline's built-in MCP Marketplace (search "howrisky")

**Manual Setup:** Add to VS Code Settings → MCP Servers:

```json
{
  "mcpServers": {
    "howrisky": {
      "command": "npx",
      "args": ["howrisky-mcp-server"]
    }
  }
}
```

Ensure `HOWRISKY_API_KEY` is set in your shell environment.

---

### Cursor

Cursor supports MCP via VS Code extension compatibility. Add to Cursor settings:

```json
{
  "mcpServers": {
    "howrisky": {
      "command": "npx",
      "args": ["howrisky-mcp-server"],
      "env": {
        "HOWRISKY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Or use the **Remote Server Option** (see below).

---

### Windsurf

Windsurf supports MCP servers. Add to Windsurf MCP configuration:

```json
{
  "mcpServers": {
    "howrisky": {
      "command": "npx",
      "args": ["howrisky-mcp-server"]
    }
  }
}
```

---

### GitHub Copilot / VS Code

Use the remote server option via custom extension or API proxy.

---

### Custom / Web-Based AI Tools

**Use Remote Server (HTTP API):**

```javascript
// Example: Call HowRisky from your AI tool
const response = await fetch('https://mcp.howrisky.ai', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'calculate_portfolio_risk',
      arguments: {
        assets: [{ ticker: 'SPY', allocation: 1.0 }],
        initial_investment: 100000,
        time_horizon_years: 20,
        simulations: 10000
      }
    },
    id: 1
  })
});

const result = await response.json();
```

---

## Available Tools

### Portfolio Risk Analysis

1. **`calculate_portfolio_risk`** - Comprehensive risk metrics
   - Returns: CVaR 95/99, VaR, ruin probability, survival probability, percentiles
   - Use case: "What's the CVaR of my 100% TQQQ portfolio?"

2. **`simulate_future_timelines`** - Full timeline paths with percentile bands
   - Returns: Year-by-year evolution with p5, p25, p50, p75, p95 bands
   - Use case: "Show me all possible futures for my 60/40 portfolio over 30 years"

3. **`compare_portfolios`** - Side-by-side risk comparison
   - Returns: Risk metrics, rankings, differential analysis
   - Use case: "Compare 60/40 vs 100% stocks vs Ray Dalio All Weather"

4. **`text_to_portfolio`** - Natural language → asset allocations
   - Returns: Structured allocations with confidence score
   - Use case: "70% global stocks, 20% bonds, 10% gold" → structured portfolio

### Private Asset Modeling

5. **`add_startup`** - Startup equity with exit scenarios
   - Returns: Risk-adjusted value, Kelly optimal bet, ruin probability
   - Use case: "$50K for 0.5% equity, 10% IPO chance, 70% bankruptcy"

6. **`add_real_estate`** - Real estate cash flow analysis
   - Returns: IRR, cash flows, total return, risk metrics
   - Use case: "$400K property, $80K down, $2.5K/month rent"

7. **`add_private_asset`** - Generic illiquid assets
   - Returns: Risk-adjusted valuation with liquidity discount
   - Use case: "PE fund with 15% IRR, 25% volatility, 5-year lockup"

8. **`add_gamble`** - High-risk binary outcomes
   - Returns: Kelly optimal bet, expected value, ruin probability
   - Use case: "Sports betting with 52% win rate, 1.9x payout"

---

## Usage Examples

### Example 1: MCP Protocol (via Claude Desktop, Cline, etc.)

Once configured, ask your AI assistant:

> "Using HowRisky, calculate the risk of investing $100K in a 60/40 portfolio (VTI/AGG) over 20 years with $12K annual contributions"

The AI will:
1. Call `tools/list` to discover HowRisky tools
2. Call `tools/call` with `calculate_portfolio_risk`
3. Parse and explain the results (CVaR, survival probability, etc.)

---

### Example 2: Remote Server (Direct HTTP API)

**Initialize & Discover Tools:**

```bash
# Initialize handshake
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {},
    "id": 1
  }'

# List available tools
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "params": {},
    "id": 2
  }'
```

**Call a Tool:**

```bash
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "calculate_portfolio_risk",
      "arguments": {
        "assets": [
          {"ticker": "VTI", "allocation": 0.60},
          {"ticker": "AGG", "allocation": 0.40}
        ],
        "initial_investment": 100000,
        "time_horizon_years": 20,
        "simulations": 10000
      }
    },
    "id": 3
  }'
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"risk_metrics\":{\"cvar_95\":-18750.0,\"survival_probability\":0.977,...}}"
      }
    ]
  }
}
```

---

### Example 3: Direct Method Call (Backward Compatible)

For simpler integrations, you can call methods directly (skips `tools/call` wrapper):

```bash
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "calculate_portfolio_risk",
    "params": {
      "assets": [{"ticker": "SPY", "allocation": 1.0}],
      "initial_investment": 100000,
      "time_horizon_years": 10
    },
    "id": 1
  }'
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "risk_metrics": {
      "cvar_95": -18750.45,
      "survival_probability": 0.977,
      "ruin_probability": 0.023,
      ...
    },
    "computation_time_seconds": 2.341
  }
}
```

---

## Advanced Features

### Custom Market Assumptions

All methods support a `guesses` parameter for scenario modeling:

```json
{
  "method": "calculate_portfolio_risk",
  "params": {
    "assets": [{"ticker": "SPY", "allocation": 1.0}],
    "initial_investment": 100000,
    "time_horizon_years": 10,
    "guesses": [
      {
        "asset_ticker": "SPY",
        "scenario_name": "2025 Recession",
        "expected_return": -0.15,
        "volatility": 0.42,
        "crash_probability": 0.35,
        "crash_magnitude": -0.40
      }
    ]
  }
}
```

### Tax Jurisdictions

Specify your country for accurate after-tax returns:

```json
{
  "tax_country": "US"  // US, GB, DE, FR, IT, ES, JP, AU, CA, etc.
}
```

### Fat-Tail Modeling

Enable proprietary KDE (Kernel Density Estimation) for accurate tail risk:

```json
{
  "kde_enabled": true  // Default: true
}
```

**Why it matters:** Gaussian models underestimate crash risk by 3-10x. Our fat-tail KDE captures reality.

---

## Troubleshooting

### "No API key configured"

Set your API key via environment variable:
```bash
export HOWRISKY_API_KEY="your-key-here"
```

Or create config file:
```bash
mkdir -p ~/.howrisky
echo '{"apiKey": "your-key-here"}' > ~/.howrisky/config.json
```

### "Connection refused" or "fetch failed"

Check that the API endpoint is accessible:
```bash
curl -I https://mcp.howrisky.ai/health
```

Expected response: `200 OK`

### "Rate limit exceeded"

You've exceeded your tier's quota. Options:

1. **Wait for reset** - Rate limits reset hourly (time shown in error message)
2. **Upgrade tier** - Visit: https://howrisky.ai/mcp/pricing

Check current usage:
```bash
curl -X GET https://mcp.howrisky.ai/rate-limit \
  -H "X-API-Key: your-key"
```

### "Asset with ticker 'XXX' not found"

The ticker doesn't exist in our database. Try:
- Common ETFs: VTI, SPY, AGG, BND, GLD
- Major stocks: AAPL, MSFT, GOOGL, TSLA, NVDA
- Crypto: BTC-USD, ETH-USD

Full asset list: https://howrisky.ai/explore

---

## Rate Limits & Pricing

| Tier | Price | Calls/Month | Cost per Call |
|------|-------|-------------|---------------|
| **Free** | $0 | 100 | $0 |
| **Developer** | $99 | 10,000 | $0.01 |
| **Professional** | $299 | 100,000 | $0.003 |
| **Enterprise** | $999 | 1,000,000 | $0.001 |

Get started: https://howrisky.ai/mcp/pricing

---

## Documentation

### API Reference
Complete documentation for all 8 tools:
- **Full Docs:** https://howrisky.ai/mcp/docs
- **Method Examples:** https://howrisky.ai/mcp/docs/examples
- **Schema Reference:** https://howrisky.ai/mcp/docs/schemas

### Quick Links
- **Dashboard:** https://howrisky.ai/mcp/dashboard (view usage, manage keys)
- **Pricing:** https://howrisky.ai/mcp/pricing
- **Changelog:** https://github.com/howrisky/howrisky-mcp-server/releases

---

## Development

### Local Testing

```bash
# Clone repository
git clone https://github.com/howrisky/howrisky-mcp-server.git
cd howrisky-mcp-server

# Install dependencies
npm install

# Run tests
npm test

# Test manually with echo
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | HOWRISKY_API_KEY=your-key node index.js
```

### Testing Remote Server

```bash
# Health check
curl https://mcp.howrisky.ai/health

# List available tools
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

---

## Integration Examples

### Python Example (Remote Server)

```python
import requests

def calculate_risk(ticker, amount, years):
    response = requests.post('https://mcp.howrisky.ai', json={
        "jsonrpc": "2.0",
        "method": "calculate_portfolio_risk",
        "params": {
            "assets": [{"ticker": ticker, "allocation": 1.0}],
            "initial_investment": amount,
            "time_horizon_years": years,
            "simulations": 10000
        },
        "id": 1
    }, headers={"X-API-Key": "your-key"})

    return response.json()["result"]["risk_metrics"]

# Use it
metrics = calculate_risk("SPY", 100000, 20)
print(f"CVaR 95: ${metrics['cvar_95']:,.2f}")
print(f"Survival Probability: {metrics['survival_probability']:.2%}")
```

### JavaScript Example (Remote Server)

```javascript
async function calculateRisk(ticker, amount, years) {
  const response = await fetch('https://mcp.howrisky.ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your-key'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'calculate_portfolio_risk',
      params: {
        assets: [{ ticker, allocation: 1.0 }],
        initial_investment: amount,
        time_horizon_years: years,
        simulations: 10000
      },
      id: 1
    })
  });

  const result = await response.json();
  return result.result.risk_metrics;
}

// Use it
const metrics = await calculateRisk('SPY', 100000, 20);
console.log(`CVaR 95: $${metrics.cvar_95.toLocaleString()}`);
```

---

## Why HowRisky?

### Unique Features

**Fat-Tail Modeling** - Standard models use Gaussian (normal) distributions, which underestimate tail risk by 3-10x. HowRisky uses proprietary Kernel Density Estimation (KDE) to model reality:
- Fat tails (extreme events more likely)
- Asymmetry (crashes ≠ rallies)
- Path dependence (sequence matters)

**Comprehensive Analysis** - 12 different risk metrics:
- VaR 95/99 (Value at Risk)
- CVaR 95/99 (Conditional VaR)
- Ruin probability
- Survival probability
- Max drawdown
- Percentiles (5th, 25th, 50th, 75th, 95th)

**Private Asset Support** - Model illiquid investments:
- Startup equity with exit scenarios
- Real estate with mortgage + cash flows
- Private equity with lockups
- High-risk gambles with Kelly criterion

**No Competitor** - Only MCP server offering Monte Carlo risk simulations with proprietary fat-tail modeling.

---

## Support

- **Issues:** https://github.com/howrisky/howrisky-mcp-server/issues
- **Email:** mcp@howrisky.ai
- **Documentation:** https://howrisky.ai/mcp/docs

---

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

See `CONTRIBUTING.md` for guidelines.

---

## License

Proprietary License - Copyright (c) 2025 Diogo Seca / HowRisky.ai

This software is proprietary and all rights are reserved. You may use this software
to access the HowRisky MCP API, but you may not modify, redistribute, or create
derivative works.

See `LICENSE` file for full details.

---

## Changelog

### v1.0.0 (2025-01-10)
- Initial release
- 8 MCP tools implemented
- stdio transport for local AI tools
- Remote HTTP server at https://mcp.howrisky.ai
- Rate limiting with 4 pricing tiers
- Comprehensive documentation

---

**Built by HowRisky.ai** | *The future isn't average. See all 100,000 possible futures.*

[Get API Key](https://howrisky.ai/mcp/pricing) | [Documentation](https://howrisky.ai/mcp/docs) | [Report Issue](https://github.com/howrisky/howrisky-mcp-server/issues)
