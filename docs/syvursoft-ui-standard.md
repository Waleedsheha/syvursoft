# Syvursoft UI Standard

The MEND landing page is the visual and interaction standard for Syvursoft product pages and future homepage refinements.

Canonical reference:

- `public/mend/landing.html`
- Local route: `/mend`

## Visual Direction

- Premium medical software, not generic SaaS.
- Dark cinematic hero sections with precise blue/cyan clinical accents.
- Light downstream sections using soft blue-gray backgrounds, glassy cards, and high contrast text.
- Strong display typography with Sora-style headings and DM Sans-style body copy.
- Rounded pill navigation, rounded large cards, restrained glow, and subtle grain.

## Color System

- Hero base: near-black navy, around `#070c17`.
- Text base: slate ink, around `#0f172a`.
- Main accent: clinical cyan/blue, around `#0ea5e9`, `#2563eb`, `#22d3ee`.
- Backgrounds: cool medical whites and blue-grays, around `#f4f8fb` and `#edf3f9`.
- Success accents: green, around `#10b981`.
- Avoid orange as the dominant product-page theme unless the product specifically requires it.

## Layout

- Header uses a floating pill-shaped dark glass container.
- Hero uses a two-column structure on desktop: strong text/CTA/stats on the left, animated medical-system visual on the right.
- Sections use generous vertical spacing and a `1280px` max-width container.
- Cards are arranged in bento/grid layouts with varied width where useful.
- Product pages should have clear section anchors and top navigation.

## Components

- Cards use translucent/light surfaces, soft borders, blur, and layered shadows.
- Card icons sit in rounded square accent washes.
- Highlight cards use large gradient numbers or short statements.
- Feature-list rows use check icons and become interactive on hover.
- CTA sections return to the dark hero style.

## Motion

- Scroll reveal is subtle: fade up, small translate, no bounce.
- Hero visual can use continuous slow motion: rings, ECG line, floating pills, soft drift.
- All cards and card-like blocks should move on hover:
  - Lift upward.
  - Slight scale.
  - Border/glow intensifies.
  - Icon moves subtly.
  - Optional shine/glass sweep.
- Respect `prefers-reduced-motion`.

## Copy Tone

- Clear, confident, clinical.
- Short headings with strong rhythm.
- Avoid explaining UI mechanics in the page copy.
- Product value should sound operational and real: workflows, departments, audit, roles, records, facility scale.

## Implementation Rule

When building or redesigning Syvursoft pages, first compare against the MEND page. If a new section feels less premium, less clinical, or less polished than MEND, revise it toward this standard before shipping.

Do not run `npm run build` after routine visual edits unless explicitly requested. Use lighter checks or browser refreshes when needed.
