# Syvursoft Homepage And Product Pages Design

Date: 2026-05-09

## Goal

Reposition the current site so Syvursoft is the main company presence and RADex becomes a dedicated product page. The main homepage should introduce Syvursoft as a healthcare software company, then route visitors clearly to the three active product pages: RADex, MEND, and ADAM.

## Confirmed Scope

- `/` is the main Syvursoft company homepage.
- `/radex` is the dedicated RADex landing page.
- `/mend` is the dedicated MEND product page.
- `/adam` is the dedicated ADAM product page.
- Product navigation on the company page includes RADex, MEND, and ADAM.
- BOND is not included in the main product grid because it is not ready.
- Anime.js is used for premium, controlled motion inspired by animejs.com, but with a healthcare software tone.
- Existing Radex page content can be reused and moved rather than redesigned from zero.

## Product Positioning

### Syvursoft

Syvursoft is the parent company: clinical software built from real medical workflow. The homepage should explain the company mission, clinical credibility, and product ecosystem without feeling like a single product landing page.

### RADex

RADex is the radiology engine. It includes RIS, PACS, DICOM viewer, patient portal, scheduling, reporting, billing, inventory, and operational modules. The current landing page already carries this product story and should become the `/radex` page.

### MEND

MEND is a new, adaptive way to manage any medical facility. The facility is built and simulated inside the system to match its real-world structure, so administrators and clinical teams can control operations from every corner of the organization. Its page should present MEND as a full medical-facility operating system, not a single-department workflow tool.

### ADAM

ADAM is the intelligence layer of the Syvursoft ecosystem. Its page should present AI orchestration, clinical decision support, automation, and cross-product insight as the product vision.

## Homepage Information Architecture

1. Header
   - Brand: Syvursoft
   - Navigation: Home, Products, About, Contact
   - Products menu/routes: RADex, MEND, ADAM

2. Hero
   - H1 centered on "Syvursoft" or a literal company-category headline.
   - Supporting copy: healthcare software built from real clinical workflows.
   - Primary CTA: explore products or book a demo.
   - Secondary CTA: learn about the company.
   - Visual: animated clinical/data system motif, not a decorative generic gradient.

3. Mission
   - Short, trust-building company explanation.
   - Emphasize medical expertise, clarity, speed, and practical tools for clinicians.

4. Product Ecosystem
   - Three product cards or panels: RADex, MEND, ADAM.
   - Each card has a concise role, short description, and direct link to its page.
   - Cards should feel related but visually distinct.
   - MEND card role: adaptive medical-facility management and simulation system.

5. Connected System Map
   - A visual system map showing Syvursoft connected to RADex, MEND, and ADAM.
   - Anime.js draws connector lines and reveals nodes on scroll.
   - This section explains how the products can become one ecosystem.

6. Clinical Credibility
   - Compact founder/company story adapted from the current About page.
   - Keep it shorter than the full About page.

7. Contact CTA
   - Reuse the existing contact grid or a refined version of it.
   - Make demo/contact paths obvious.

## Product Page Structure

### `/radex`

Use the current homepage content as the base:

- Header
- RADex hero
- RADex feature journey
- Ecosystem or product support section adjusted so it does not imply BOND is available
- Contact
- Footer

### `/mend`

Create a product page with this structure:

- Hero focused on building and controlling a digital twin of any medical facility.
- Problem section: hospitals and medical centers rely on scattered paperwork, disconnected departments, delayed maintenance reporting, weak audit visibility, and manual administrative workflows.
- Solution section: MEND simulates the facility exactly as it is, then gives each team the dashboards and tools needed to manage work from its own operational corner.
- Facility simulation section: show how the real building, departments, units, rooms, workflows, and responsibility zones are represented inside the system.
- Clinical workflow section: doctor and nurse dashboards, patient management, automatic file writing, hospital form automation, laboratory workflow, radiology workflow, built-in PACS, and DICOM viewer.
- Operations section: maintenance detection and reporting with exact problem location, HR, finance, attendance, call system, audit system, administrative work-from-home support, and access from any device.
- Specialized units section: blood bank management and dialysis unit management.
- Audit section: fast one-minute audit visibility across the facility.
- CTA: book a demo or contact Syvursoft.

### `/adam`

Create a product page with this structure:

- Hero focused on AI clinical intelligence across Syvursoft products.
- Capabilities section: orchestration, automation, insight, decision support.
- Ecosystem section: how ADAM connects RADex and MEND.
- Safety/trust section: human-centered AI, clinician-in-the-loop framing.
- CTA: discuss ADAM.

## Animation System

Use Anime.js for new company homepage motion:

- Hero reveal timeline.
- Product card stagger.
- SVG line drawing in the connected system map.
- Subtle background data-point motion.
- Scroll-triggered section reveals where supported cleanly.

Animation should be premium and controlled:

- Smooth, purposeful timing.
- No bouncy, playful, or demo-like motion.
- No excessive rotation, morphing, or distracting background movement.
- Respect `prefers-reduced-motion`.

Existing Framer Motion components can remain where already used. Do not rewrite working Radex animations unless Anime.js simplifies or improves a specific section.

## Components And Data

Create or refactor toward:

- Shared product data for RADex, MEND, and ADAM.
- Reusable product card component.
- Homepage-specific company sections.
- Product-page-specific hero and content sections.
- Isolated Anime.js client component(s) so animation code stays contained.

Header navigation should be updated to route directly to:

- `/`
- `/radex`
- `/mend`
- `/adam`
- `/about`
- `/#contact` or equivalent contact target

## Visual Direction

The site should feel:

- Professional.
- Medical.
- Modern.
- High-trust.
- Animated but not noisy.

Avoid:

- Generic SaaS bento grids.
- Overly playful animation.
- One-color orange-only visual palette.
- Placeholder product pages.
- Showing BOND as an active product.

## Validation

Implementation should be checked with:

- Lint or build command supported by the project.
- Local dev server.
- Desktop and mobile viewport review.
- Navigation across `/`, `/radex`, `/mend`, and `/adam`.
- Contact CTA behavior.
- Animation behavior.
- Reduced-motion behavior.

## Self-Review

- No placeholders remain in this spec.
- The route ownership is explicit.
- Product scope excludes BOND intentionally.
- The animation direction is constrained and practical.
- Product pages have enough structure to implement without guessing the route model.
