# The Digital Atelier: implemented design system

The active stylesheet is [`src/atelier.css`](../src/atelier.css). Shared primitives live in [`src/components/ui.jsx`](../src/components/ui.jsx). This document describes the current implementation, including its compact typography and component-specific rules.

## Visual direction

The composition combines an editorial portfolio with a technical notebook: large name typography, occasional italic serif emphasis, quiet grid lines, numbered captions, thin borders, and a muted sage accent. Dark surfaces are blue charcoal; light surfaces are warm off-white and pale green. The portrait uses the existing photograph in an arched frame, with cropping and restrained desaturation.

Typography and content provide hierarchy. Project visuals are CSS/HTML illustrations in `ProjectVisual.jsx`, explicitly labeled as interface studies and exposed as illustrative images. They are not screenshots or evidence of the applications' actual appearance. Project titles and case-study actions remain separate links.

## Semantic tokens

Dark values are declared on `:root`; `[data-theme="light"]` overrides the same tokens and sets the native `color-scheme`. Change semantic tokens rather than introducing alternate theme colors within ordinary interface components.

| Token | Use | Dark | Light |
| --- | --- | --- | --- |
| `--bg` | Page background | `#10151b` | `#f4f3ee` |
| `--surface` | Panels and secondary sections | `#161c23` | `#eaece5` |
| `--surface-raised` | Raised/selected surface | `#1c242c` | `#ffffff` |
| `--text` | Primary text | `#eeefe7` | `#202923` |
| `--text-secondary` | Supporting text | `#b3b9b8` | `#505c55` |
| `--text-muted` | Metadata and quiet text | `#929b9e` | `#5c6961` |
| `--border` | Panel/control boundaries | `#30383d` | `#c4ccc2` |
| `--border-soft` | Subtle dividers | `#262e35` | `#d6dbd1` |
| `--accent` | Primary actions and emphasis | `#c3d9a5` | `#456137` |
| `--accent-hover` | Primary-action hover | `#d9e9c5` | `#354d29` |
| `--accent-soft` | Selected-control background | `#242e27` | `#e1e7d6` |
| `--button-text` | Text on primary actions | `#152015` | `#ffffff` |
| `--secondary` | Secondary emphasis/self-reported evidence | `#a7c8cb` | `#386770` |
| `--focus` | Keyboard outline | `#e1bd80` | `#9b4b18` |
| `--success` | Accepted form submission message | `#bde1af` | `#315e30` |
| `--error` | Form error and cooldown message | `#ffaca2` | `#a92c27` |
| `--grid` | Hero grid | `#343e44` | `#c5cec2` |
| `--shadow` | Elevated-panel shadow | `0 16px 44px #00000020` | `0 16px 44px #2939260a` |

Illustrative project scenes have their own fixed palettes to preserve the artwork. They are not additional semantic interface themes. Print rules override selected tokens for white paper and dark text.

## Typography

Font delivery is system-first: there is no external font service or bundled webfont request. The browser uses the first available local font from these stacks:

- Sans: `"Inter", "Segoe UI", Arial, sans-serif`.
- Monospace: `"Cascadia Code", "SFMono-Regular", Consolas, monospace`.
- Italic emphasis: `Georgia, "Times New Roman", serif` through `.serif-word`.

| Role | Implemented size and rhythm |
| --- | --- |
| Body default | `15px`, line-height `1.7`. |
| General H1 | `clamp(42px, 6vw, 84px)`; headings default to weight `500`, line-height `1.18`, letter-spacing `-0.045em`. |
| Hero name | `clamp(70px, 7.65vw, 110px)`, line-height `0.99`, letter-spacing `-0.075em`. Overrides: `124px` at ≥1600px, `87px` at ≤1100px, `70px` at ≤800px, `clamp(70px, 18vw, 105px)` at ≤640px, `69px` at ≤359px. |
| General H2 | `clamp(32px, 3.55vw, 48px)`. About/contact headings use `clamp(32px, 3.3vw, 46px)`. |
| General H3 / project titles | `25px` default; project-card titles `29px`, `25px` at ≤800px and `28px` at ≤640px. |
| Hero professional headline | `clamp(19px, 2vw, 26px)`, line-height `1.45`; compact overrides are `20px`, then `23px`, then `21px` at the corresponding 800/640/359px breakpoints. |
| Interior page title | General H1 with line-height `1.1`; `45px` at ≤640px and `39px` at ≤359px. |
| Reading copy | Page descriptions `15px`/`1.9`; section descriptions `14px`/`1.85`; project and research-card copy `12px`/`1.85–1.9`; Journal definitions `13px`/`1.95`. |
| Technical labels | `.mono` and `.eyebrow` `10px`/`1.6`; eyebrows uppercase with `0.12em` tracking, reduced to `9px` at ≤640px. |
| Compact metadata | Evidence labels `9px`, with some `8px` overrides; technology names/categories `11px`/`9px`, then `10px`/`8px` on mobile and names `9px` at ≤359px. Footer/caption text includes `7–8px`; the mobile hero-bottom label is `6px`. |
| Illustration detail | Miniature interface labels include `4–8px` text inside the illustrative image. These sizes are not the reading-copy scale. |
| Code | Monospace `12px`/`1.8`, horizontal overflow inside a focusable `<pre>`. Lightweight JavaScript highlighting distinguishes comments, strings, and a few keywords. |

The design does not impose a universal 16px text minimum. Preserve the distinction between reading copy, compact metadata, and miniature illustration detail when making changes.

## Spacing and layout

The shared spacing tokens are `--container: 1180px` and `--section-space: clamp(68px, 8.5vw, 122px)`. Sections use the latter as block padding. Components also use explicit gaps and padding; there is no separate numeric spacing-token scale.

| Viewport | Container rule |
| --- | --- |
| Default | `min(1180px, calc(100% - 96px))`; centered with automatic inline margins. |
| ≥1600px | Maximum container becomes `1320px`. |
| ≤1100px | `calc(100% - 64px)`. |
| ≤800px | `calc(100% - 48px)`. |
| ≤640px | `calc(100% - 40px)`. |
| ≤359px | `calc(100% - 32px)`. |

Shared section headings have a `40px` flex gap and `38px` bottom margin; at ≤640px they stack and use `29px` bottom margin. Project cards use `32px 28px` gallery gaps; research notebook cards use `22px`. Borders are generally `1px`; primary buttons use `3px` corners and project cards `4px` corners.

| Pattern | Desktop | Compact behavior |
| --- | --- | --- |
| Hero | Two columns, `1.1fr 1fr`, `70px` gap | Still two columns at 800px; one column at ≤640px. |
| Project gallery | Two columns; flagship spans both with an internal two-column layout | Flagship content stacks at ≤800px; gallery becomes one column at ≤640px. |
| Research preview / full notebook | Three columns / two columns | Both become one column at ≤640px. |
| Technology explorer | Four columns | Three at ≤1100px; two at ≤640px. Search toolbar stacks at ≤800px. |
| About / contact | Two columns | About stacks at ≤640px; contact at ≤800px. Form fields become one column at ≤640px. |
| Case study / Journal | Contents sidebar plus article | One column at ≤800px; contents lose sticky positioning. |
| Atlas | Wrapping topic buttons above the selected detail | Topic buttons fill the available width at ≤640px. Full interest notes remain below. |
| Navigation | Sticky header, `88px` minimum inner height | `76px` at ≤800px; `70px` at ≤640px, where the mobile menu replaces desktop links. |

The document uses `106px` scroll padding, reduced to `86px` at ≤640px. Individual content targets also have scroll margins. Print styling removes navigation/controls, uses full-width content and `30px` section padding, and avoids splitting project cards where possible.

## Reusable primitives and states

- `SectionHeading`: eyebrow, H2, optional description and trailing action. `.container` and `.section` provide the shared layout boundaries.
- `Surface`: configurable element with semantic panel background and border.
- `Button`: native button or `Link` according to `href`, with primary and secondary variants. Base minimum height is `48px`; component-specific compact controls are smaller.
- `Link`: real anchors with local History API navigation. External HTTP links use a new tab with `noopener noreferrer`; modified clicks retain native behavior.
- `Icon`: local inline SVG, decorative to assistive technology unless the surrounding control provides its name.
- `EvidenceLabel`: visible words plus a small dot. Verified uses accent, self-reported uses secondary, interest uses supporting text, and planned/unverified use muted text. Meaning is not conveyed by color alone.
- `CodeBlock`: labeled, keyboard-focusable code region with overflow contained inside the block.
- Native `<details>/<summary>`: technology disclosures and the architecture explorer's complete component descriptions. Open toolkit details rotate the decorative plus into a cross.
- Pressed controls: lens, filters, atlas, and architecture use native buttons and `aria-pressed`. Filters/atlas use accent text and border with an accent-soft fill; lens selection uses the raised surface.

## Motion and keyboard behavior

Motion uses native CSS: most controls transition over `0.2s`; illustrative windows transition their transform over `0.35s`. Primary buttons rise `2px` on hover, link arrows shift slightly, and desktop navigation reveals a thin underline. There is no reveal gate that hides the reading content until an animation runs.

The one pointer-responsive effect is the hero's `35px` technical grid. `AtelierHero` updates `--grid-x` and `--grid-y` for the radial mask only when `(pointer: fine) and (prefers-reduced-motion: no-preference)` matches. The default grid is centered and the heading/portrait remain visible without pointer movement. This decoration has no keyboard task to perform.

With reduced motion enabled, CSS disables transitions and animations and changes smooth document scrolling to `auto`; the hero handler also stops updating the grid. The default page otherwise uses native smooth anchor scrolling, without scroll interception.

Global `:focus-visible` draws a `2px` `--focus` outline with a `5px` offset. The skip link appears on focus. Routing focuses the main region or intended fragment target; main/programmatic section focus suppresses its outline. Native buttons activate with Enter/Space; these groups are not custom arrow-key tab widgets. The mobile menu exposes expanded state, loops Tab between its opener and links while open, closes on Escape, and restores opener focus. Atlas and architecture details update announced status regions, and both retain complete readable static content.

## Forms and feedback

The contact form uses visible wrapping labels, required fields, email input semantics, and native length constraints. Inputs use `--bg`, `--text`, `--border`, muted placeholders, and the global focus rule. Desktop input text is `11px`; at ≤640px it becomes `16px`. There is no separate custom invalid-field palette: initial validity feedback comes from the browser.

Sending disables the submit button, uses a wait cursor and `0.65` opacity, and changes its label. Provider HTTP acceptance shows a success-colored status and resets the form. Failure retains input and shows an error-colored status; the cooldown message uses the same error token. The live status is polite. A hidden honeypot, 30-second client cooldown, and 15-second request timeout support the form; actual delivery and provider spam controls require separate verification.

## Verification boundary

See [`docs/browser-qa.md`](browser-qa.md) for the executed route/theme contrast and accessibility scans, keyboard journeys, responsive widths, artifacts, and limitations. That report records automated results; this design document makes no WCAG conformance claim. Keep both themes in verification when changing tokens or text sizes, including the fixed-color illustrative scenes.
