# Project Guidelines

## Commit Convention

- Format: `feat(portfolio): short description`
- Keep commit messages concise
- Commit frequently
- Do not include AI tool names in commit messages

## Author

- Name: Mohanad Elhag

## Tech Stack

- TypeScript (no frameworks)
- Vite (dev server only)
- Custom Static Site Generator
- Hand-written CSS
- Markdown for blog posts

## Project Structure

```
src/build/       - SSG build script
src/templates/   - HTML templates
src/styles/      - CSS files
content/posts/   - Markdown blog posts
dist/            - Generated output (gitignored)
```

## Commands

- `npm run dev` - Build and start dev server
- `npm run build` - Build static site
- `npm run test` - Run tests
- `npm run preview` - Preview production build

## Development

1. Blog posts go in `content/posts/` as markdown with frontmatter
2. Run `npm run build` to regenerate the site
3. CSS uses custom properties defined in `variables.css`

## Testing

- Tests are in `src/build/build.test.ts`
- Run with `npm test`
