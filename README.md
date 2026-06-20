# getman-website

Marketing and documentation site for [GetMan](https://github.com/getman-dev/getman-ui) — a zero-dependency, embeddable OpenAPI explorer.

**Live site:** [getman.dev](https://getman.dev) &nbsp;·&nbsp; **Product repo:** [getman-dev/getman-ui](https://github.com/getman-dev/getman-ui)

---

## Stack

- [Astro 6](https://astro.build) — static site generator
- [Tailwind CSS 4](https://tailwindcss.com) — utility-first styling via the Vite plugin
- [TypeScript](https://www.typescriptlang.org)
- Served by nginx inside Docker

## Project structure

```
src/
├── components/        # Reusable Astro components
│   └── icons/         # SVG icon components (Feather-style)
├── layouts/           # Base page layout
├── pages/             # File-based routes
│   ├── index.astro    # Homepage
│   ├── examples.astro # Live examples gallery
│   ├── explorer.astro # Full-screen API explorer embed
│   └── docs.astro     # QuickStart & API reference
├── data/              # Static data (example specs list)
├── styles/            # Global CSS & design tokens
└── config.ts          # Site-wide URLs and constants
public/                # Static assets (logo, favicon, OG image)
```

## Local development

```bash
npm install
npm run dev      # → http://localhost:4321
```

```bash
npm run build    # Production build → ./dist/
npm run preview  # Preview the build locally
```

## Deployment

The site ships as a static build served by nginx via a two-stage Docker image.

```bash
# Build the image
docker build -t getman-website .
docker run -p 3000:80 getman-website
```

The nginx config (`nginx.conf`) enables `gzip_static` and sets a 1-year immutable cache on hashed assets.

## Contributing

Open an issue or pull request. For changes to the GetMan product itself (the embeddable explorer), see [getman-dev/getman-ui](https://github.com/getman-dev/getman-ui).

## License

[MIT](./LICENSE) © GetMan