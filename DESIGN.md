# Design System: M1kunya Portfolio (Minimalist Monolithic)

## 1. Visual Theme & Atmosphere
A restrained, architectural gallery-airy workspace focused on clean lines, high-contrast typography, and functional layouts. The mood is clinical, clean, and developer-centric, eliminating all neon glows, gradient overlays, and AI-generation tropes in favor of raw structural beauty. The interface utilizes a strict monochrome grayscale hierarchy, relying on layout variance, negative space, and micro-motion to communicate status and interactivity.

- **Density:** 5 (Balanced Gallery Layout)
- **Variance:** 7 (Asymmetric Grid)
- **Motion:** 5 (Fluid Spring-like Transitions)

## 2. Color Palette & Roles
All colors belong to the calibrated Slate/Zinc family to guarantee temperature consistency.

- **Canvas Background** (`#09090b` / `zinc-950`) — Deepest base.
- **Surface Level 1** (`#18181b` / `zinc-900`) — Cards, tabs, code interfaces.
- **Surface Level 2** (`#27272a` / `zinc-800`) — Inputs, active controls, borders.
- **Whisper Border** (`rgba(255, 255, 255, 0.08)`) — Thin 1px separators.
- **High-Contrast Text** (`#fafafa` / `zinc-50`) — Headings, prominent labels.
- **Muted Text** (`#a1a1aa` / `zinc-400`) — Body text, descriptions.
- **Subtle Muted Text** (`#71717a` / `zinc-500`) — Subtitles, inactive status.
- **Primary Accent** (`#ffffff` / pure white) — For high-contrast focus, active nav pills, and interactive highlights.

## 3. Typography Rules
- **Display Headlines:** `Outfit`, Sans-Serif. Track-tight (`-0.03em`), bold weight, clean line heights. Letters should feel tightly structured, never shouting in scale.
- **Body Text:** `Plus Jakarta Sans`, Sans-Serif. Relaxed line height (`1.6`), max line width of `65ch` to guarantee comfortable readability.
- **Monospace Text:** standard system monospace (e.g., `SFMono-Regular`, `Consolas`, `ui-monospace`). Used for metrics, technical specs, code listings, status badges, and interactive control labels.
- **Banned:** `Inter`, generic system fonts, decorative serifs, emojis within body text or headers.

## 4. Component Stylings
- **Navigation Menu:** Horizontal pill bar with container fill (`#18181b`), subtle 1px border. Active tab uses high-contrast white fill with black text. Hovering inactive tabs applies a clean, swift background transition.
- **Interactive Cards:** No drop shadows. Instead, we use thin `Whisper Borders` and subtle `Surface Level 1` background. Hover triggers slight vertical offset (`-2px`) and border highlight to Zinc-700.
- **Control Demos (Tweaker/Note/Read):** Rendered as embedded micro-applications with dark window frames, header control dots (mock buttons), and system-mono typography.
- **Status Indicators:** Micro-circles with a soft pulsate (pure white/light gray), surrounded by a thin border rather than an oversaturated neon glow.

## 5. Layout Principles
- **No Overlapping:** Elements occupy clean, separate layout slots. No absolute-positioned visual floaters.
- **Hero Grid:** Asymmetric two-column split screen. Left side contains the primary typography and developer introduction; right side contains high-density monospace metrics.
- **Equal Card Ban:** No 3-column equal card layouts. Features are displayed in unequal spans (e.g., 2/3 and 1/3 splits) or staggered vertical sections to add rhythm.
- **Responsive strategy:** Universal single-column stack below `768px` with proportional typography scaling.

## 6. Motion & Interaction
- **Spring Physics:** Hover states use custom cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) for snappy yet weighty animations.
- **Active State Feedback:** Active click/press scales down slightly (`scale(0.98)`) for tactile response.
- **No custom mouse cursors** — native pointers are cleaner and more reliable.

## 7. Banned Patterns (Anti-Patterns)
- ❌ Emojis in buttons, headers, or lists.
- ❌ Neon/purple/blue background glows, glowing buttons, or glowing text.
- ❌ Center-aligned hero layouts.
- ❌ Fake metrics or stats (must clearly present actual tools, code repositories, or clear placeholders).
- ❌ Complex gradients on text headers.
