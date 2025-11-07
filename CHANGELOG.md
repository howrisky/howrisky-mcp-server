# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-10

### Added
- Initial release of HowRisky MCP Server
- 8 MCP tools for financial risk analysis:
  - `calculate_portfolio_risk` - CVaR, ruin probability, survival metrics
  - `simulate_future_timelines` - Year-by-year portfolio evolution
  - `compare_portfolios` - Multi-portfolio comparison with rankings
  - `text_to_portfolio` - Natural language to asset allocations
  - `add_startup` - Startup equity with exit scenario modeling
  - `add_real_estate` - Real estate cash flow and IRR analysis
  - `add_private_asset` - Illiquid asset modeling with discounts
  - `add_gamble` - Kelly criterion for high-risk betting
- MCP lifecycle methods (`initialize`, `tools/list`, `tools/call`)
- stdio transport for local AI integration (Claude Desktop, Cline, Cursor, Windsurf)
- HTTP remote server at https://mcp.howrisky.ai
- API key authentication with flexible configuration (env, file, CLI)
- Comprehensive documentation and installation guides
- Support for popular AI assistants (Claude, ChatGPT, Cursor, Windsurf, Cline, Copilot)
- Proprietary fat-tail KDE modeling
- Tax-aware calculations for 15+ countries
- Custom market scenario support via `guesses` parameter

[1.0.0]: https://github.com/howrisky/howrisky-mcp-server/releases/tag/v1.0.0
