# Ideas Processor

AI-powered content pipeline using **PWT (Providers, Workers, Transformers)** architecture over **Hexagonal (Ports & Adapters)**.

## Architecture

- **Providers** — I/O and state (read/write external data stores)
- **Workers** — Compute and generation (LLM-powered content creation)
- **Transformers** — Data shaping and parsing (pure domain logic)
- **Cleaners** — File management (uploads, promotion, cleanup)

## Setup

```bash
cp .env.example .env
# Edit .env with your API keys and credentials
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Compile TypeScript to dist/ |
| `npm start` | Run production build |
| `npm test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage |
