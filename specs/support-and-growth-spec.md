# GetMan — Support & Community Growth Spec

## Overview

After launch, surface three asks to visitors in a natural, non-intrusive way:

1. **Star on GitHub** — primary social-proof signal; grows discoverability on GitHub.
2. **Follow on X** — builds an audience for announcements and release posts.
3. **Buy Me a Coffee** — lets fans support continued development; `buymeacoffee.com/mohsenk` is the active channel.

All three should feel like invitations from an indie maker, not a SaaS upsell. Tone: warm, low-pressure, grateful.

---

## Placement Strategy

Three integration points — each targeted at a different moment in the visitor's journey:

| Placement | Trigger moment | Ask |
|---|---|---|
| **Hero social proof bar** | First impression — visitor hasn't tried the tool yet | Star on GitHub |
| **Post-demo nudge** (below InlineDemo) | Visitor just interacted with the live demo | Star + Buy Me a Coffee |
| **Footer "Links" column** | Visitor has read the page and is about to leave | All three |

No pop-ups, no modals, no toast banners. Everything is inline and skippable.

---

## Config additions (`src/config.ts`)

Add the following exports alongside the existing `githubUrl`:

```ts
export const githubUrl        = 'https://github.com/getman-dev/getman-ui';
export const githubStarsUrl   = 'https://github.com/getman-dev/getman-ui/stargazers';
export const buyMeACoffeeUrl  = 'https://buymeacoffee.com/mohsenk';
export const xUrl             = 'https://x.com/getman_dev';  // create this handle
```

> **Note**: Create the `@getman_dev` X account before the feature ships. If the handle is unavailable, use the founder's personal handle and update `xUrl` accordingly.

---

## Components

### 1. `SocialProofBar` (`src/components/SocialProofBar.astro`)

A slim, single-line bar that sits **below the hero headline / above the CTAs**.

**Content:**
```
★ [Live star count] stars on GitHub  ·  Open source · MIT
```

The star count is fetched at **build time** via the GitHub REST API (`GET /repos/getman-dev/getman-ui`) and injected as a static number. It updates on each site deploy — no client-side API call.

**Visual:**
- Background: `var(--color-badge-bg)` (#fef3c7)
- Border: `1px solid var(--color-badge-border)`
- Text: `var(--color-badge-text)` (amber-800)
- Rounded pill (`rounded-full`)
- Star icon (filled ★) in amber
- The whole pill is a link to `githubStarsUrl` (opens new tab)

```astro
---
// Fetch at build time
const res = await fetch('https://api.github.com/repos/getman-dev/getman-ui');
const data = await res.json();
const stars: number = data.stargazers_count ?? 0;
const formatted = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);
---
```

If the fetch fails, render the pill without the count: "★ Star us on GitHub".

---

### 2. `SupportNudge` (`src/components/SupportNudge.astro`)

A small card placed **directly below the InlineDemo section** on the home page.

**Layout:** centered, max-width 640px, two rows:
- Row 1: short heading + sub-copy
- Row 2: two side-by-side buttons

**Copy:**
> **Like what you see?**
> GetMan is free and MIT licensed. If it saves you time, a star or a coffee goes a long way.

**Buttons:**

| Button | Style | Label | Link |
|---|---|---|---|
| Star on GitHub | Primary (flat orange shadow) | ★ Star on GitHub | `githubStarsUrl` |
| Buy Me a Coffee | Secondary (outline) | ☕ Buy me a coffee | `buyMeACoffeeUrl` |

Both open in a new tab.

**Visual tweaks:**
- Card background: `var(--color-bg)` with `border: 1px solid var(--color-border)`
- Rounded-2xl, padding: `py-8 px-10`
- Shadow: `0 2px 8px rgba(0,0,0,0.04)`
- The coffee button may optionally use the Buy Me a Coffee brand yellow (`#FFDD00`) as its outline/shadow color to add a playful touch — keep it subtle.

---

### 3. Footer "Links" column update (`src/components/Footer.astro`)

Extend the existing "Links" column with a divider and the new support links. Keep the 3-column grid.

```
Links
──────
GitHub ↗
Releases
──────
★ Star on GitHub
☕ Buy me a coffee
𝕏 Follow on X
```

**Style guidance:**
- Coffee link: use a warm amber tone matching the badge palette — not the BMC brand yellow (too loud in the footer).
- X link: same secondary style as GitHub.
- Add a thin `<hr>` or a small spacer (`mt-4 pt-4 border-t border-[var(--color-border)]`) between Releases and the new links.

---

## Page-level integration

### Home (`src/pages/index.astro`)

Insert components in this order:

```
TopBar
Hero
  └─ SocialProofBar  ← NEW (inside Hero, below subheading, above CTAs)
InlineDemo
SupportNudge           ← NEW (between InlineDemo and FeaturesGrid)
FeaturesGrid
QuickInstall
Footer
  └─ Support links    ← NEW (in "Links" column)
```

No other pages require changes — the footer update propagates automatically.

---

## Prerequisites

### Buy Me a Coffee (done)
- URL: `https://buymeacoffee.com/mohsenk` — active, no further setup needed.
- No widget embed — link only. The BMC floating widget is too intrusive for this site's tone.

### X account
1. Register `@getman_dev` on X.
2. Pin a launch tweet.
3. Bio: "Embeddable OpenAPI explorer. Drop it anywhere with one script tag. Free & open source."
4. Link: `getman.dev`

### GitHub Sponsors (optional, future)
Not required for v1 since Buy Me a Coffee is live. Can be added later — add a `FUNDING.yml` to the main repo:
```yaml
custom: https://buymeacoffee.com/mohsenk
```
This surfaces the support link natively on the GitHub repo page.

---

## Copy guidelines

Use the indie-maker voice from the existing site theme. Avoid:
- "Support our mission" — too corporate
- "Help us keep the lights on" — too desperate
- "Upgrade" / "Pro plan" — doesn't apply

Use instead:
- "If it saves you time, a star helps a lot."
- "Follow along for releases and updates."
- "Buy me a coffee" — exactly this phrase; it matches the platform name and feels human.

---

## Implementation Tasks

### Phase 1 — Prerequisites
1. Register `@getman_dev` on X; configure bio and pinned tweet.
2. Add `githubStarsUrl`, `buyMeACoffeeUrl`, and `xUrl` to `src/config.ts`.
3. (Optional) Add `FUNDING.yml` to the main `getman-ui` repo pointing to BMC.

### Phase 2 — Components
4. Build `SocialProofBar.astro` with build-time star count fetch and fallback.
5. Build `SupportNudge.astro` with "Star" and "Buy Me a Coffee" buttons.
6. Update `Footer.astro` to add Star, BMC, and X links under the "Links" column with a divider.

### Phase 3 — Integration
7. Embed `SocialProofBar` inside `Hero.astro` (below subheading, above CTAs).
8. Add `SupportNudge` to `src/pages/index.astro` between `InlineDemo` and `FeaturesGrid`.
9. Smoke-test layout at 375px, 768px, 1280px widths.
10. Verify build-time star fetch works in CI (add `GITHUB_TOKEN` env var if rate-limited).

### Phase 4 — Polish
11. Check that all external links use `target="_blank" rel="noopener noreferrer"`.
12. Confirm star count refreshes on every production deploy (Astro rebuilds the page statically).
13. Add Open Graph tags to the home page so link previews on X/GitHub look good.

---

## Out of Scope

- Analytics on CTA click-through rate (add later with Plausible or similar).
- Automated tweet on new release (separate CI workflow, not website scope).
- BMC floating widget embed.
- Newsletter / email list.
- Discord / community server.