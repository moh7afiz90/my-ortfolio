---
title: "Rebuilding My Fundamentals"
date: "2025-01-17"
description: "Why I'm going back to basics after 8 years as a frontend engineer."
slug: "rebuilding-my-fundamentals"
---

After 8 years of working as a frontend engineer, I've decided to go back to basics. Here's why.

## The Problem with Frameworks

Don't get me wrong — frameworks like React, Vue, and Angular are incredibly powerful. They've helped me build complex applications and ship features quickly. But somewhere along the way, I realized I'd become dependent on them.

When faced with a simple task like centering a div, I found myself reaching for Flexbox utilities in Tailwind instead of understanding the underlying CSS. When building a form, I'd pull in a library instead of writing the validation logic myself.

## What I Lost

The abstractions that made me productive also made me complacent:

- **CSS intuition**: I forgot how the cascade actually works
- **HTML semantics**: I'd reach for `<div>` when a `<button>` or `<article>` was more appropriate
- **Browser APIs**: I couldn't remember how `fetch` works without looking it up
- **Performance awareness**: I'd bundle megabytes of JavaScript without thinking

## The Plan

So I'm rebuilding from the ground up. This site is the first step:

1. **No CSS frameworks** — Every style is hand-written
2. **No React/Vue** — Pure HTML templates
3. **Minimal dependencies** — Only what's truly necessary
4. **Build my own tools** — This site uses a custom static site generator

## What I'm Learning

Even building this simple blog taught me things:

```css
/* I'd forgotten you could do this without Flexbox */
.container {
  max-width: 720px;
  margin: 0 auto;
}
```

```html
<!-- Semantic HTML matters for accessibility -->
<article>
  <header>
    <h1>Post Title</h1>
    <time datetime="2025-01-17">January 17, 2025</time>
  </header>
  <main>Content here</main>
</article>
```

## Moving Forward

This is just the beginning. I'll be documenting my journey here — the things I re-learn, the mistakes I make, and the insights I gain along the way.

If you're feeling like you've lost touch with the fundamentals, maybe it's time to strip away the abstractions and see what's underneath. You might be surprised what you find.
