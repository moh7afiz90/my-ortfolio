---
title: "Rebuilding My Fundamentals"
date: "2025-01-17"
description: "After 8 years in frontend development, I'm going back to the basics. Here's why."
slug: "rebuilding-my-fundamentals"
---

Eight years ago, I wrote my first line of JavaScript. Since then, I've shipped production code at scale, led frontend teams, and architected applications used by millions. But somewhere along the way, I realized something uncomfortable: I'd become dependent on abstractions I didn't fully understand.

## The Realization

It happened during a performance debugging session. Our React app was sluggish, and after hours of profiling, the issue came down to a fundamental misunderstanding of how the browser's rendering pipeline works. I knew *what* `requestAnimationFrame` did, but not *why* it mattered. I understood React's reconciliation at a high level, but couldn't explain the actual DOM operations happening underneath.

That was a wake-up call.

## What I Lost Along the Way

When you spend years working with abstractions, you start to lose touch with the platform:

- **CSS became utility classes** — I could build any layout with Tailwind, but forgot how `position: sticky` actually works
- **HTML became JSX** — I stopped thinking about semantic structure and accessibility
- **JavaScript became React** — Hooks replaced my understanding of closures and the event loop
- **The browser became a black box** — I trusted the framework to handle everything

This isn't a critique of frameworks. React made me incredibly productive. Tailwind ships fast. But productivity without understanding has a ceiling.

## The Experiment

This site is my reset button. The rules are simple:

1. **No UI frameworks** — No React, Vue, or Svelte
2. **No CSS frameworks** — Every style written by hand
3. **Minimal dependencies** — Only what's absolutely necessary
4. **Build my own tools** — A custom static site generator, not Gatsby or Astro

The result? A site that loads in milliseconds, scores 100 on Lighthouse, and forced me to actually *think* about every decision.

## What I'm Relearning

Even building this simple blog surfaced gaps in my knowledge:

**CSS Layout** — I'd forgotten that `margin: 0 auto` centers block elements. I'd been reaching for Flexbox for everything.

```css
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

**Semantic HTML** — There's a `<time>` element with a `datetime` attribute. Screen readers use it. I'd been using `<span>` for years.

```html
<time datetime="2025-01-17">January 17, 2025</time>
```

**Template Literals** — Before JSX, we had template strings. They're still powerful:

```typescript
function renderPost(post: Post): string {
  return `
    <article>
      <h1>${post.title}</h1>
      <p>${post.content}</p>
    </article>
  `;
}
```

## The Path Forward

I'm not abandoning React — it's still my tool of choice for complex applications. But I want to be the kind of engineer who *chooses* the abstraction rather than *needing* it.

Over the coming months, I'll be documenting what I relearn:
- How CSS cascade and specificity actually work
- Browser rendering and the critical path
- JavaScript execution and the event loop
- Web APIs I've never touched

If you're a senior engineer who feels like you've been coasting on framework knowledge, maybe it's time to dig deeper. The fundamentals haven't changed — we just stopped paying attention.
