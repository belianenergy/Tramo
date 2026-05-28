# Stitch Configuration for EnergyOS

## Setup

API key stored in `.env` file:
```
STITCH_API_KEY=AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw
```

## Usage

### 1. Generate Screen from Prompt
```bash
# Using Stitch MCP server
npx stitch-mcp generate_screen \
  --project energyos \
  --prompt "Energy dashboard with emerald green theme, metric cards, consumption chart"
```

### 2. Extract Design Context
```bash
npx stitch-mcp extract_design_context \
  --screen dashboard \
  --output design-context.json
```

### 3. Fetch Screen Code
```bash
npx stitch-mcp fetch_screen_code \
  --screen dashboard \
  --output dashboard.html
```

## Integration with DESIGN.md

Our `DESIGN.md` defines:
- Colors: Emerald green primary (#059669), slate dark background (#0f172a)
- Typography: Inter font family
- Components: Cards, buttons, badges, charts

When generating screens, reference these tokens for consistency.

## Workflow

1. Use `generate_screen_from_text` with DESIGN.md context
2. Extract code with `fetch_screen_code`
3. Convert to React components
4. Integrate into EnergyOS app/

## Security

- `.env` file should NOT be committed to git
- Add to `.gitignore`:
  ```
  .env
  *.env
  ```
- Token should be rotated regularly
