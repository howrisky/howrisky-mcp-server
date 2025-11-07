# HowRisky MCP Server

Monte Carlo risk analysis for AI agents. Institutional-grade financial modeling with fat-tail distributions and proprietary KDE algorithms.

**8 Tools:** Portfolio risk (CVaR, ruin probability), startup equity, real estate, Kelly criterion betting, and more.

**Compatible with:** Claude Desktop, ChatGPT Desktop, Cursor, Windsurf, Cline, GitHub Copilot, VS Code, Codex

---

## Standard Config

```json
{
  "mcpServers": {
    "howrisky": {
      "command": "npx",
      "args": ["-y", "howrisky-mcp-server"],
      "env": {
        "HOWRISKY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Get your free API key at: **https://howrisky.ai/app/settings** (100 calls/month free)

---

## Getting Started

**Step 1:** Get your API key from https://howrisky.ai/app/settings

**Step 2:** Add the standard config above to your AI tool's MCP configuration

That's it! Your AI can now access Monte Carlo risk simulations.

---

## Installation

<details>
<summary>Claude Desktop</summary>

Edit config file:
- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add the **standard config above**.

Restart Claude Desktop.

**Test it:** Ask Claude *"Using HowRisky, what's the risk of a 60/40 portfolio?"*

</details>

<details>
<summary>ChatGPT Desktop</summary>

1. Open ChatGPT Desktop Settings
2. Go to **Apps & Connectors** → **Advanced settings**
3. Enable **Developer mode**
4. Add MCP server configuration (use **standard config above**)

Restart ChatGPT Desktop.

**Test it:** Ask ChatGPT *"Use HowRisky to calculate CVaR for 100% SPY portfolio"*

</details>

<details>
<summary>Cursor</summary>

Add to Cursor's MCP configuration file:

Use the **standard config above**.

Cursor supports MCP via VS Code extension compatibility.

</details>

<details>
<summary>Windsurf</summary>

Add to Windsurf MCP settings:

Use the **standard config above**.

Windsurf's MCP integration works similarly to Cursor.

</details>

<details>
<summary>Cline (VS Code)</summary>

**Via Cline MCP Marketplace:**
1. Open Cline in VS Code
2. Search for "howrisky" in MCP Marketplace
3. Click Install
4. Enter API key when prompted

**Manual Setup:**

Add to VS Code Settings → Extensions → Cline → MCP Servers:

Use the **standard config above**.

</details>

<details>
<summary>GitHub Copilot / VS Code</summary>

Add to VS Code `settings.json`:

Use the **standard config above** in the MCP servers configuration section.

</details>

<details>
<summary>Remote Server (HTTP)</summary>

For custom integrations or web-based AI tools:

**Endpoint:** `https://mcp.howrisky.ai`

**Authentication:** Include `X-API-Key` header with your API key

**Documentation:** https://howrisky.ai/mcp/docs

Example:
```bash
curl -X POST https://mcp.howrisky.ai \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

</details>

---

## Available Tools

| Tool | Description |
|------|-------------|
| `calculate_portfolio_risk` | CVaR, VaR, ruin probability, survival probability |
| `simulate_future_timelines` | Year-by-year portfolio evolution with percentiles |
| `compare_portfolios` | Side-by-side risk comparison of multiple portfolios |
| `text_to_portfolio` | Natural language → asset allocations |
| `add_startup` | Startup equity modeling with exit scenarios |
| `add_real_estate` | Real estate with cash flows, IRR, mortgage analysis |
| `add_private_asset` | Illiquid asset modeling (PE funds, etc.) |
| `add_gamble` | Kelly criterion for high-risk betting strategies |

**Full documentation:** https://howrisky.ai/mcp/docs

---

## Example Usage

Once configured, ask your AI:

> *"Using HowRisky, calculate the risk of investing $100K in a 60/40 portfolio over 20 years"*

The AI will:
1. Discover HowRisky tools via `tools/list`
2. Call `calculate_portfolio_risk` with correct parameters
3. Return CVaR, survival probability, ruin risk, and other metrics

---

## Features

**Fat-Tail Modeling** - Gaussian models underestimate crash risk by 3-10x. Our proprietary KDE captures reality.

**Comprehensive Metrics** - 12 risk metrics including CVaR 95/99, VaR, ruin probability, percentiles

**Private Assets** - Model startups, real estate, PE funds, and high-risk gambles

**Tax-Aware** - 15+ countries supported (US, GB, DE, FR, IT, ES, JP, AU, CA, etc.)

**Custom Scenarios** - Override historical data with your own market assumptions

---

## Pricing

| Tier | Calls/Month | Price |
|------|-------------|-------|
| Free | 100 | $0 |
| Developer | 10,000 | $99 |
| Professional | 100,000 | $299 |
| Enterprise | 1,000,000 | $999 |

View pricing: https://howrisky.ai/mcp/pricing

---

## Support

- **Issues:** https://github.com/howrisky/howrisky-mcp-server/issues
- **Docs:** https://howrisky.ai/mcp/docs
- **Email:** mcp@howrisky.ai

---

## License

Proprietary - Copyright © 2025 Diogo Seca / HowRisky.ai

You may use this software to access HowRisky MCP API. Modification and redistribution prohibited. See `LICENSE` for details.
