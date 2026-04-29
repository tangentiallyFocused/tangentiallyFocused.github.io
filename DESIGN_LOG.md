# Portfolio Design Log

A chronological record of design decisions, implementation changes, and version history for the portfolio site.

---

## v9.10.0 — Graph Interaction Enhancement & Navigation Typography
**Date:** 2026-04-29
**Branch:** portfolio-v2.0

### Major Features

#### Node Locking System
**Decision:** Implement click-to-lock functionality for cytoscape graph project nodes
**Rationale:**
- Media links in sidebar require mouse movement from graph to sidebar
- Hovering over other nodes accidentally changes sidebar content before user can click
- Needed deliberate selection mechanism to "freeze" a project view

**Implementation:**
- Click project node → locks selection (highlights persist, sidebar stays)
- Click same node again → unlocks
- Click graph background → unlocks
- Locked state ignores hover events on other nodes (dimmed nodes non-clickable)
- ESC key unlocks (progressive: unlock → deactivate graph)

**Interaction Flow:**
1. Hover node → temporary highlight + sidebar preview
2. Click node → lock selection (safe to move mouse to sidebar)
3. Unlock via: click node again, click background, or ESC

**Files Modified:**
- `src/cytoscape-graph.js` — Added `lockedNode` state, `lockNode()`, `unlockNode()` functions

---

#### Graph Help Tooltip
**Decision:** Add [Help] button with tooltip in fig caption for graph instructions
**Rationale:**
- Original caption provided basic instructions but not advanced features (locking, ESC behavior)
- Tooltip keeps caption clean while providing comprehensive help on-demand
- [Help] in brackets matches academic aesthetic (citations, placeholders)

**Design Evolution:**
- Tested ⓘ (circled i) → generic UI feel
- Tested [i] → too cryptic
- Tested [?] → font rendering made it hard to read
- **Selected [Help]** → clear, approachable, fits bracket pattern

**Tooltip Behavior:**
- **Hover [Help]** → shows tooltip temporarily
- **Move away** → hides (unless locked)
- **Click [Help]** → locks tooltip open
- **Click again / outside / ESC** → closes
- **Tab to [Help]** → shows tooltip
- **Tab away** → hides (unless locked)

**Tooltip Content:**
```
Interactive Network Graph
• Click overlay to activate
• Hover nodes to explore connections
• Click project node to lock selection
• ESC to unlock, ESC again to deactivate
• Scroll to zoom, drag to pan
```

**Accessibility:**
- ARIA label: "More instructions, press ESC to close"
- Keyboard focusable (`tabindex="0"`)
- Tab/focus shows tooltip
- No close button needed (ESC + click-outside + tab-away covers all modalities)

**Files Modified:**
- `src/content.html` — Added [Help] button and tooltip structure to fig caption
- `src/style.css` — `.fig-info-icon` and `.fig-info-tooltip` styling
- `src/interactions.js` — `initGraphInfoTooltip()` with locked/unlocked states

---

#### ESC Key Hierarchy System
**Decision:** Implement progressive ESC key behavior across all interactive elements
**Rationale:**
- Multiple overlays/states can be active simultaneously (modal + graph + tooltip + locked node)
- Users expect ESC to close the "most immediate" thing first
- Prevent cascading closes (ESC shouldn't close everything at once)

**Priority Order (top to bottom):**
1. Media carousel modal open → closes modal
2. Graph help tooltip open → closes tooltip
3. Graph node locked → unlocks node
4. Graph active → deactivates graph

**Technical Implementation:**
- Each handler checks its own state first
- If handled, calls `e.preventDefault()` to signal completion
- Subsequent handlers check `e.defaultPrevented` and skip if true
- Prevents multiple handlers from firing for same ESC press

**Files Modified:**
- `src/interactions.js` — Media carousel and tooltip ESC handlers with `preventDefault()`
- `src/cytoscape-graph.js` — Graph ESC handler checks `defaultPrevented`

---

### Typography Refinements

#### Bold Navigation Text
**Decision:** Apply `font-weight: 700` to all navigation elements
**Rationale:**
- Improved readability, especially in dark mode
- Magenta text on dark background benefits from heavier weight
- Creates stronger visual hierarchy for primary navigation
- More authoritative/confident feeling while maintaining refinement

**Implementation:**
- `nav.top-nav a`: `font-weight: 700`
- `.nav-resume`: `font-weight: 700`
- `.titlebar-name`: `font-weight: 700`

**Comment Added:** "Bold nav links for better readability, especially in dark mode. Could be conditional (dark mode only) if refined aesthetic is preferred in light mode."

**Files Modified:**
- `src/style.css` — Added font-weight to nav elements

---

### Design Principles Applied

**Progressive Disclosure:**
- ESC key unlocks layers one at a time (doesn't cascade)
- Help tooltip provides advanced info without cluttering main UI
- Lock state adds complexity only when needed

**Interaction Consistency:**
- Lock/unlock pattern mirrors common UI patterns (click to stick, click to release)
- ESC always "goes back one step"
- Bracket notation [Help] fits existing academic conventions

**Accessibility First:**
- All interactions keyboard accessible
- ARIA labels communicate behavior
- Multiple escape mechanisms (ESC, click-outside, tab-away)
- No reliance on single input method

**Visual Weight & Hierarchy:**
- Bold nav improves scannability without sacrificing refinement
- Magenta [Help] signals interactivity
- Tooltip only appears when requested (not overwhelming)

---

### Future Considerations

**Tooltip Enhancements:**
- Could add animations (fade-in/out)
- Could position dynamically based on viewport space
- Could add keyboard shortcut hints (e.g., "or press H")

**Node Locking UX:**
- Visual indicator on locked node (beyond highlight)?
- "Locked" chip near graph controls?
- Multi-select for comparing projects?

**ESC Hierarchy:**
- Document expected behavior for new features
- Consider global state manager for overlay priority

---

## v9.9.1 — Media Link Placement & Alignment Refinements
**Date:** 2026-04-27
**Branch:** portfolio-v2.0

### Media Link Integration on Cards

#### Decision: Add Media Links to Project Cards
**Rationale:** Ensure feature parity between project cards and cytoscape sidebar - both interfaces should provide equal access to project media

**Implementation:**
- Media link button added inside `.card-back-actions` container alongside theme tag
- Uses same validation as sidebar: `modal_files.some(file => file && file.trim() !== '')`
- Matches placement of commented-out "Open case study" button
- Consistent styling and behavior across both cards and sidebar

**Files Modified:**
- `src/projects.js` — Added media link to card template inside `.card-back-actions`
- `src/content.html` — Moved sidebar media link into `.card-back-actions` container
- `src/cytoscape-graph.js` — Changed display value to `'block'` for proper rendering
- `src/style.css` — Added `.card-media-link` styling, alignment adjustments

---

### Layout & Typography Refinements

#### Media Link & Theme Tag Layout
**Decision:** Horizontal layout with flex-start alignment
**Rationale:**
- Theme tags can be long ("Civic Tech + Accessibility") and may wrap to 2 lines
- Media link should maintain consistent vertical position across projects
- `justify-content: space-between` keeps media link anchored right
- `align-items: flex-start` prevents visual jumping when switching between projects

**Implementation:**
- `.card-back-actions`: `display: flex; justify-content: space-between; align-items: flex-start`
- Media link: `white-space: nowrap` to prevent wrapping
- Theme tag: allowed to wrap naturally if needed
- Both set to 9px font size (reduced from initial 10px experiment)

**Options Evaluated:**
1. `align-items: center` — Media link floats when tag wraps (inconsistent)
2. `align-items: flex-end` — Bottom alignment feels grounded but less conventional
3. **`align-items: flex-start` (SELECTED)** — Top alignment creates consistent position and clean baseline

---

#### Sidebar Padding Optical Balance
**Decision:** Asymmetric padding: 22px top, 20px sides, 20px bottom
**Rationale:**
- All-caps labels at top (EYEBROW, SUMMARY) have more visual weight and density
- No ascenders/descenders create uniform, solid letterforms
- Title-case tags at bottom feel lighter and airier
- Reducing bottom padding from 22px to 20px creates better optical balance

**Implementation:**
- `.cy-sidebar`: `padding: 22px 20px 20px 20px` (was `22px 20px`)

---

### Design Principles Applied

**Visual Weight Compensation:**
- All-caps text appears heavier due to uniform height and rectangular letterforms
- Optical adjustments (like asymmetric padding) often trump mathematical symmetry
- Consistent vertical positioning reduces cognitive load when browsing projects

**Future Considerations:**
- If "Open case study" button is re-enabled, it would go inside `.card-back-actions` after theme tag
- Media link maintains priority placement and visibility
- Structure is future-proof for additional action buttons

---

## v9.9.0 — Media Carousel & Typography Refinements
**Date:** 2026-04-27
**Branch:** portfolio-v2.0

### Major Features

#### Media Carousel System
**Decision:** Implement modal carousel for project media with automatic file type detection
**Rationale:** Needed accessible way to display project imagery/media without cluttering the cytoscape sidebar (280px width constraint)

**Implementation:**
- "View media (n) ↗" link appears in cytoscape sidebar when projects have `modal_files`
- Modal overlay with prev/next navigation, keyboard controls (←/→ arrows, Esc)
- Automatic media type detection:
  - Images (jpg, png, gif, webp, svg) → `<img>` with object-fit: contain
  - Videos (mp4, webm, ogg) → `<video>` with controls
  - PDFs → `<iframe>` for native browser viewing
  - External URLs → `<iframe>` for embedded content
- Pulls from existing `modal_files` and `modal_files_alt` JSON fields
- Link only displays if media exists (hideProject() resets display state)

**Files Modified:**
- `src/content.html` — Modal structure, sidebar link
- `src/cytoscape-data.js` — Added mediaFiles/mediaAlt to projectSidebarData
- `src/cytoscape-graph.js` — showProject() media link rendering
- `src/interactions.js` — initMediaCarousel() with type detection
- `src/style.css` — Modal styling, media element sizing

---

### Typography & Content Organization

#### Hero Keywords: Pills → Semicolon-Separated List
**Decision:** Replace keyword pills with italicized, semicolon-separated text
**Rationale:**
- Pills created visual ambiguity with skill chips (same shape, different meaning)
- Semicolons are academic standard for multi-word keyword phrases
- More compact on mobile (critical vertical space)
- Italics signal conceptual/theoretical terms (consistent with academic papers)

**Options Evaluated:**
1. Alternating italics (odd/even) — Creates rhythm but unequal visual weight
2. Dimmed semicolons + spacing — Subtle, treats keywords equally
3. Color alternation — Higher contrast but arbitrary
4. **All italicized (SELECTED)** — Academic, refined, lighter visual weight

**Final Implementation:**
- All keywords italic
- Semicolons roman, dimmed (`--text-lo`), 4px padding-right
- `white-space: nowrap` on `.kw-item` prevents mid-phrase breaks
- Removed max-width constraint for natural flow

**Design Note:** Semicolons used instead of commas because keywords are multi-word phrases ("linguistic relativity", "culture & meaning") — standard academic convention

---

#### Abstract References Moved to Expansion
**Decision:** Move citation list inside "Read more" expansion
**Rationale:**
- Citations `[1]`, `[2]`, `[3]` only appear in expanded paragraphs
- Co-locating references with their citations improves information architecture
- Saves significant vertical space on mobile
- Metadata section (Author, Affiliation, etc.) remains visible for credibility signals

**Before:** References visible below metadata
**After:** References inside `.abstract-expansion`, appear only when expanded

---

#### Abstract Keyword Pills Removed
**Decision:** Remove keyword pill row from abstract section
**Rationale:**
- Redundant with inline `abstract-kw` highlighting throughout text
- Keywords already present in hero section
- Metadata section provides structured information
- Reduced visual clutter

---

#### Hero Affiliation Consistency
**Decision:** Remove "Dept. of" prefix from first affiliation
**Before:** "Dept. of Cognitive & Linguistic Sciences¹"
**After:** "Cognitive & Linguistic Sciences¹"
**Rationale:** Cleaner presentation, consistent with second affiliation format

---

#### Citation Numbering System
**Decision:** Use bracketed numbers `[1]`, `[2]`, `[3]` for citations (not letters)
**Rationale:**
- Standard academic convention uses numbers for citations
- Affiliations use superscript numbers (¹, ²) in hero section
- Visual distinction (superscript vs. bracketed) and contextual separation (hero vs. abstract) prevent confusion
- Tested letters `[a]`, `[b]`, `[c]` but numbers felt more standard and cleaner

**Implementation:**
- Added explanatory comment in HTML documenting the distinction between affiliation superscripts and citation brackets

---

### Interaction & Navigation

#### Scroll-to-Top Functionality
**Decision:** Make nav name and footer name clickable with smooth scroll to top
**Implementation:**
- Nav: `.titlebar-name` with `#scroll-to-top` ID
- Footer: `.footer-name` with `#footer-scroll-to-top` ID
- Both use `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Footer name hover: `--cream` → `--text` (matches nav behavior)

**Rationale:** Symmetry creates consistent mental model; footer provides return-to-top from bottom of page

---

#### Footer Social Links
**Decision:** Add actual URLs to LinkedIn and GitHub links in footer
**Implementation:**
- LinkedIn: Added profile URL
- GitHub: Added profile URL
- Links were previously placeholders, now functional

---

### Visual Refinements

#### Spacing Adjustments
- Abstract "Read more" button: `margin-top: 16px` → `8px` (tighter connection to content)
- Card back outcome label: `margin-top: auto` → `margin-top: 20px` (fixed spacing above outcome)
- Cytoscape graph height: `520px` → `650px` (improved visibility)

#### Multi-Theme Card Gradients
**Decision:** Implement gradient overlays for cards with multiple themes
**Implementation:**
- `getThemeClass()` now handles theme arrays
- CSS gradients for all 2-theme and 3-theme combinations:
  - `.card-cm` — Cyan to Magenta
  - `.card-my` — Magenta to Yellow
  - `.card-cy` — Cyan to Yellow
  - `.card-cmy` — Cyan to Magenta to Yellow
- `.card-tint` z-index: 0 → 1 (overlay appears above images)

---

### Code Quality & Documentation

**Comments Added:**
- Semicolon rationale for keywords
- Keyword styling options documented for future reference
- "Open case study" functionality commented out with notes
- Intentional 10px font-size note for card recipe sections

**Version Updates:**
- Hero masthead: v9.8.0 → v9.9.0
- Mobile nav footer: v9.8.0 → v9.9.0
- Footer version: v9.8.0 → v9.9.0

---

## Version History

### v9.8.0 — JSON Content Migration
- Migrated all project data from hardcoded HTML to JSON system
- Featured projects filtering and sorting
- Dynamic card generation
- Cytoscape graph data transformation

### v9.7.1 → v9.8.0
*Previous session work — see git history*

---

## Design Principles

### Typography Hierarchy
- **Monospace (IBM Plex Mono):** UI elements, metadata, code-like content
- **Serif (DM Serif Display):** Headings, emphasis, project titles
- **Italic:** Conceptual/theoretical terms, emphasis within serif

### Color System (CMY Ink)
- **Cyan:** Interconnectivity (structural links, affiliations)
- **Magenta:** Interaction (buttons, links, touchable elements)
- **Yellow:** Perception (highlights, key concepts)

### Shape Language
- **Sharp rectangles:** Interactive elements (buttons, nav links)
- **Pills (rounded):** Passive labels (skill chips, tags)
- **No underline default:** Cleaner, research paper aesthetic

### Mobile-First Considerations
- Vertical space is critical — progressive disclosure preferred
- Typography must remain readable at small sizes
- Touch targets: minimum 44px for interactive elements
- Avoid horizontal scrolling (responsive width constraints)

---

## Future Considerations

### Keyword Styling Alternatives (Archived)
If current italic + semicolon approach needs revision:
- **Option 1:** Alternating italics (creates rhythm, may de-emphasize some terms)
- **Option 3:** Color alternation between `--text-dim` and `--text` (higher contrast)

### Media Carousel Enhancements
- Support for video autoplay settings
- Lightbox zoom for high-res images
- Caption text display below media
- Link handling for external resources

### Abstract Expansion
- Consider animation for smooth height transition
- Possible icon change (∨ → ∧) on "Read less" state
- Explore auto-collapse on scroll past section

---

## Technical Stack

**Build:** Vite
**Package Manager:** Yarn
**Graph Visualization:** Cytoscape.js (fcose layout)
**Fonts:** IBM Plex Mono, DM Serif Display
**Data Format:** JSON (projects, skills)

---

*This log documents design decisions with context and rationale. For implementation details, see git commit history.*
