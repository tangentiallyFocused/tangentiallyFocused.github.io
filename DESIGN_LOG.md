# Portfolio Design Log

A chronological record of design decisions, implementation changes, and version history for the portfolio site.

---

## v9.20.1 — Featured Card Layout Fix
**Date:** 2026-05-17
**Branch:** portfolio-v2.0

### Changes
- Fixed card 3 bottom padding in landscape single-column layout (tablet ≤1024px)
- Added 24px bottom padding to card 3's `.flashcard-back` and `.flashcard-ghost` to account for negative margin on `.card-media-link` button
- Prevents content cutoff at bottom of card in landscape mode

**Technical:** Negative margin trick on media button (-8px) was extending content beyond ghost element's calculated height. Increased ghost padding from 16px to 24px to compensate.

---

## v9.20.0 — Bottom Sheet Improvements
**Date:** 2026-05-17
**Branch:** portfolio-v2.0

### Major Changes

#### Draggable Bottom Sheet Implementation
- Implemented drag-to-expand/collapse functionality for mobile network graph bottom sheet
- 85% width centered handle for better affordance
- Auto-sizes to content height (no fixed collapsed/expanded states)
- Drag down to close gesture
- Fixed flexbox layout for proper content scrolling

#### Bottom Sheet Content Additions
- Added affiliation field below title
- Added all missing content: skills, tools, method/concept bullets, outcome, tags, view media button
- Proper spacing between sections (12-16px margins)
- Font size adjustments: title 21px, description 13px

#### Technical Fixes
- Changed from `display: block` to `display: flex` with `flex-direction: column`
- `.cy-sheet-content` with `flex: 1`, `overflow-y: auto`, `min-height: 0` for proper scrolling
- View media button event listener fixed (data attributes + proper event handling)
- Prevented drag from interfering with button clicks
- Added `max-width: 15ch` to view media button on mobile

---

## v9.15.3 — Media Carousel Updates
**Date:** 2026-05-17
**Branch:** portfolio-v2.0

### Changes
- Adjusted media carousel images and descriptions
- Updated image display and alt text handling

---

## v9.15.2 — Competitive Analysis Media Update
**Date:** 2026-05-17
**Branch:** portfolio-v2.0

### Changes
- Updated images for Worthix Competitive Analysis Dashboard project

---

## v9.15.1 — Featured Project Update
**Date:** 2026-05-17
**Branch:** portfolio-v2.0

### Changes
- Changed featured-1 project from original selection to Town H@ll

---

## v9.15.0 — Photo Addition & Media Carousel Improvements
**Date:** 2026-05-05
**Branch:** portfolio-v2.0

### Major Changes

#### Profile Photo Addition to About Section
**Decision:** Add profile photo overlapping recipe card in top-right corner
**Rationale:**
- Adds warmth and human connection (addresses "AI-generated site" concerns)
- Complements "grew up between languages and cultures" narrative
- Positions photo with recipe card to maintain visual hierarchy

**Implementation:**
- Circular crop (160px desktop, 120px mobile)
- Positioned absolutely in top-right, overlapping recipe card
- Photo grouped with recipe card in `<aside>` to maintain relationship on mobile
- 3px border with shadow for depth

**Photo choice:** Natural, unfiltered outdoor photo (LaraTruckee.png) - reinforces authenticity theme

---

#### Media Carousel Smooth Transitions
**Problem:** Modal images flashed and jumped when switching between photos
**Solution:**
- Fixed container height (60vh) prevents layout shifts
- Implemented crossfade transition (0.3s opacity)
- Images positioned absolutely within wrapper to overlay during transition
- Width adapts to aspect ratio while height remains constant

**Technical changes:**
- Created `.media-wrapper` container with `position: relative`
- Images fade out while new image fades in simultaneously
- Removed jarring instant swaps

---

#### About Section Layout Refinements
**Mobile/Tablet Stacking:**
- Changed breakpoint from 680px to 1024px (now catches landscape mobile & portrait tablet)
- Proper stacking order: text → credentials → recipe + photo
- Photo and recipe card stay together as one unit on all screen sizes

**Responsive improvements:**
- Added `min-width: 380px` to recipe card (prevents cramping during resize, removed on mobile)
- Tightened spacing in credentials section on mobile (580px and below)
- Reduced margins between credential names, departments, and descriptions

**Disciplines alignment:**
- Used `margin-top: auto` to align disciplines section with recipe card bottom on desktop
- Maintains dynamic spacing as content changes

---

#### Content Updates
**Abstract text refinement:**
- Changed "Every framework you add" → "Every framework you uncover" (more active, discovery-oriented)

---

## v9.14.0 — About Section Redesign
**Date:** 2026-05-04
**Branch:** portfolio-v2.0

### Major Changes

#### About Section Restructure
**Changes:**
- Redesigned about section layout
- Commented out accessible list feature (needs fixes)
- Identified spacing issues requiring further refinement

**Status:** Intermediate version before photo addition and layout polish in v9.15.0

---

## v9.12.0 — Hero Positioning & Content Strategy
**Date:** 2026-04-29
**Branch:** portfolio-v2.0

### Major Changes

#### Strategic Positioning Refinements
**Decision:** Restructure hero section to minimize "recent grad" signals while maintaining credibility
**Rationale:**
- 1 year post-graduation in difficult job market requires careful positioning
- Lead with capabilities and approach, not educational timeline
- Avoid prejudice against junior designers by controlling information disclosure order

**Changes Made:**
1. **Removed "Working Document" label** - Could read as "unfinished" or apologetic
2. **Updated keywords** - Changed from 7 to 4, more strategic
3. **Reframed education as "Interdisciplinary"** - Methodology (present tense) not credentials (past tense)
4. **Removed institutional names from hero** - Wellesley mentioned in About section instead
5. **Commented out timeline metadata** - "Received" date was incorrect and highlighted recent grad status
6. **Removed company affiliation from abstract** - Worthix not well-known, doesn't add credibility

---

#### Keyword Refinement
**Previous keywords (7):**
- linguistic relativity
- human connectome
- product design
- physical making
- color cognition
- systems design
- culture & meaning

**New keywords (4):**
- product design
- culture & meaning
- tangible design
- systems design

**Decision rationale:**
- **Removed academic terms** (linguistic relativity, sapir-whorf, human connectome) - Too specialized, no context in hero
- **Removed specific examples** (color cognition, early childhood) - Too narrow, don't represent breadth
- **Changed "physical making" to "tangible design"** - Professional UX/HCI term vs. maker movement connotation
- **Kept "product design"** - Professional anchor, critical for recruiter scanning
- **Kept strategic pillars** - Map directly to C³ title (Cognition, Culture, Craft)

**Keyword order logic:**
1. Professional identity (what)
2. Thematic approach (how)
3. Physical practice (tangible)
4. Structural practice (systems)

---

#### Education Reframing Strategy
**Previous structure:**
```
Lara Baldez Duque Ribeiro ¹˒²
¹ Cognitive & Linguistic Sciences · ² Media Arts & Sciences · Wellesley College
```

**New structure:**
```
Lara Baldez Duque Ribeiro

INTERDISCIPLINARY                              STATUS
Cog Sci · Media Arts                          • Open to collaboration
```

**Why this works:**
- "Interdisciplinary" = **how you work** (methodology, present tense)
- Not "Education" = **what you studied** (credentials, timeline)
- Departments explain approach without institutional "recent grad" weight
- Grouped with Status in meta row = supporting info, not primary identity
- Name stands alone = cleaner hero hierarchy

**Strategic benefit:** Slows down "junior" read while maintaining credibility from interdisciplinary background

---

#### Abstract Metadata Cleanup
**Removed:**
- **Affiliation: Worthix** - Unknown company doesn't add credibility, could detract
- **Year: 2026** - Maintenance burden, makes portfolio feel stale if not updated annually

**Kept:**
- Author
- Role: Product Designer
- Domain: Product Design / HCI

**Rationale:** Generic positive signals that don't tie to timeline or unknown entities

---

#### Hero Metadata Simplification
**Commented out:**
- **"Received: September 2019"** - Date was incorrect (should be July 2023), highlights recent grad
- **"Current Revision: April 2026"** - Could read as "unfinished," version number already shows iteration

**Kept:**
- **"Interdisciplinary"** - Reframed education
- **"Status: Open to collaboration"** - Actionable info recruiters want

**Future consideration:** "Received" could be repurposed as "Entered industry: 2025" once experience accumulates

---

#### Mobile Optimizations
**Decision:** Single-column layout for hero meta row on mobile
**Implementation:**
- Changed from 2-column grid to 1-column for cleaner presentation
- Added `white-space: nowrap` to "Media Arts & Sciences" to prevent mid-phrase wrapping
- Full-width layout prevents cramped appearance

---

### Design Principles Applied

**Strategic Information Disclosure:**
- Lead with what you can do, not when you graduated
- Control the order in which recruiters discover "junior" signals
- Same information, different framing (methodology vs. timeline)

**Professional Positioning:**
- "Tangible design" (industry term) vs. "physical making" (hobbyist connotation)
- "Interdisciplinary" (sophisticated approach) vs. "Education" (student identity)
- Keywords map to professional competencies, not academic subjects

**Credibility Without Vulnerability:**
- Interdisciplinary background visible but not leading
- Prestigious education in About section (context) not hero (primary identity)
- Work and approach speak first, education supports

---

### Future Considerations

**Hero Evolution:**
- If "Interdisciplinary" feels too academic, consider "Disciplines" (simpler)
- Monitor if removing institutional names impacts credibility perception
- Track whether "tangible design" resonates with target employers

**Timeline Metadata:**
- Revisit "Entered industry" once 3+ years experience
- Consider adding prominent projects completed or companies worked with

**Company Affiliation:**
- Could add if future role is at recognizable company
- Otherwise keep in project descriptions only

---

## v9.11.1 — Navigation Keyboard Shortcut
**Date:** 2026-04-29
**Branch:** portfolio-v2.0

### Feature Addition

#### Global Navigation Shortcut
**Decision:** Implement `Shift + /` keyboard shortcut to focus navigation menu
**Rationale:**
- Keyboard users lack quick way to reach navigation from mid-page
- Alternative to skip links, more power-user friendly
- Complements existing keyboard accessibility features

**Implementation:**
- Press `Shift + /` from anywhere → focuses first nav link ("Abstract")
- Works cross-platform (Mac/Windows/Linux)
- Doesn't scroll, only moves focus
- Disabled while typing in input/textarea fields
- Added to graph help tooltip: "• Shift + / to focus navigation menu"

**Pattern precedent:** GitHub, Slack, and other web apps use `/` or `?` for navigation shortcuts

**Files Modified:**
- `src/interactions.js` — `initNavShortcut()` function
- `src/content.html` — Updated graph help tooltip

---

## v9.11.0 — Keyboard Accessibility & Screen Reader Support
**Date:** 2026-04-29
**Branch:** portfolio-v2.0

### Major Features

#### Keyboard Navigation System
**Decision:** Implement full keyboard accessibility for cytoscape network graph
**Rationale:**
- Canvas-based graphs (cytoscape) are inherently inaccessible to keyboard/screen reader users
- Needed compliant, usable interface for keyboard-only navigation
- Visual network connections provide no value to screen reader users (can't see spatial relationships)
- Hybrid approach: different interfaces for different user needs

**Implementation - Sighted Keyboard Users:**
- Arrow keys navigate through all project nodes alphabetically
- Enter key locks/unlocks focused node
- Tab key follows normal DOM flow (allows reaching sidebar)
- Yellow border indicates keyboard focus (distinct from cyan hover, magenta interactive)
- Navigation blocked when node is locked (prevents visual/sidebar mismatch)
- Document-level listener only active when graph is active

**Arrow Key Behavior:**
- Right/Down → next project alphabetically
- Left/Up → previous project alphabetically
- Wraps around at beginning/end
- Disabled when node is locked

**Keyboard Focus State:**
- `keyboardFocusedNode` tracked separately from `lockedNode` and hover state
- 4px yellow border (`--yellow`: `#e0c040` dark, `#8c6400` light)
- Updates sidebar as focus changes
- Cleared when node is unlocked via Enter

**Files Modified:**
- `src/cytoscape-graph.js` — Keyboard navigation logic, `setKeyboardFocus()` function
- `src/content.html` — Updated graph ARIA label with keyboard instructions

---

#### Screen Reader Accessible Project List
**Decision:** Provide semantic HTML alternative to visual graph for screen reader users
**Rationale:**
- Screen readers cannot parse spatial relationships in canvas-based visualizations
- Visual connections meaningless to users who can't see them
- Need structured, semantic alternative that provides same project access

**Implementation:**
- `<nav>` with all projects as semantic `<ul>` list
- Projects sorted alphabetically (same order as keyboard navigation)
- Clicking project names updates sidebar
- `.sr-only` CSS hides visually but remains accessible to assistive tech
- Dev toggle button for testing (shows list with yellow border)

**Alphabetical Sorting:**
- Ignores leading punctuation (e.g., `'Snow White' Variants` sorted as "Snow White")
- Uses `localeCompare()` for proper alphabetical ordering
- Consistent across both keyboard navigation and accessible list
- Regex: `/^[^a-zA-Z0-9]+/` strips leading non-alphanumeric characters

**Files Modified:**
- `src/cytoscape-graph.js` — `populateAccessibleList()`, alphabetical sorting
- `src/content.html` — `#cy-accessible-nav` structure, dev toggle button
- `src/style.css` — `.sr-only` utility class (already existed)

---

#### Hybrid Accessibility Pattern
**Decision:** Different interfaces for different user needs (not one-size-fits-all)
**Rationale:**
- Sighted keyboard users benefit from visual graph with keyboard controls
- Screen reader users need semantic HTML structure (visual connections irrelevant)
- Both interfaces provide equal access to all projects
- Acknowledges that "accessible" doesn't mean "identical experience"

**Design Philosophy:**
- Equal access ≠ identical interface
- Play to each modality's strengths (visual spatial vs. semantic linear)
- Don't force screen reader users to navigate an invisible graph
- Don't remove visual richness for sighted keyboard users

---

### Interaction Refinements

#### Navigation Flow
**Tab Behavior:**
- Tab follows normal DOM flow (graph → sidebar → other elements)
- Does NOT cycle through graph nodes (arrow keys handle that)
- Allows keyboard users to reach sidebar "View media" links after locking node

**Arrow Key Scope:**
- Only active when graph is active (`graphActive === true`)
- Disabled when typing in input/textarea elements
- Prevented when node is locked (must unlock first)
- Document-level listener (not element-specific focus required)

**State Management:**
- `keyboardFocusedNode` — current arrow key focus
- `lockedNode` — current locked selection
- `graphActive` — graph interaction enabled
- All three tracked independently

---

### Accessibility Standards Applied

**WCAG 2.1 Compliance:**
- **2.1.1 Keyboard (Level A):** All functionality available via keyboard
- **2.1.3 Keyboard (No Exception) (Level AAA):** No keyboard traps
- **4.1.2 Name, Role, Value (Level A):** Proper ARIA labels and roles
- **4.1.3 Status Messages (Level AA):** Sidebar updates when focus changes

**ARIA Implementation:**
- `role="application"` on graph container (custom keyboard controls)
- `aria-label` describes keyboard interaction pattern
- `aria-label="All projects"` on accessible nav
- Semantic HTML (`<nav>`, `<ul>`, `<li>`) for structure

**Keyboard Patterns:**
- Arrow keys for navigation (standard for spatial interfaces)
- Enter for selection (standard activation key)
- Tab for DOM traversal (standard focus management)
- ESC for progressive closure (existing hierarchy maintained)

---

### Testing & Development Tools

#### Dev Toggle Button
**Decision:** Add visible toggle for accessible list testing
**Implementation:**
- `[Dev] Show Accessible List` button below fig caption
- Toggles `.sr-only` class and applies yellow border styling
- Allows developers to view screen-reader-only content without assistive tech
- Button text updates: "Show" ↔ "Hide"

**Rationale:**
- Screen-reader-only content hard to test without accessibility tools
- Developers need quick way to verify content/structure
- Visual confirmation that list exists and is populated correctly

---

### Design Principles Applied

**Inclusive Design:**
- Multiple pathways to same content (visual graph + semantic list)
- Keyboard navigation doesn't require seeing visual connections
- Screen reader users get structured, semantic alternative

**Progressive Enhancement:**
- Graph works with mouse (baseline)
- Keyboard navigation layered on top
- Screen reader alternative provided
- Each modality gets optimized experience

**Consistency:**
- Alphabetical order across all interfaces
- Same projects accessible via all methods
- Predictable navigation patterns (arrow keys = sequential)

---

### Future Considerations

**Keyboard Navigation Enhancements:**
- Jump to first project starting with letter (e.g., press "S" → jumps to first "S" project)
- Search/filter interface for quick project access
- Announce current position (e.g., "Project 5 of 16")

**Screen Reader Improvements:**
- Add live region announcements when sidebar updates
- Include theme/skill metadata in accessible list
- Provide "skip to projects" landmark

**Testing:**
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only user testing
- Mobile screen reader testing (TalkBack, VoiceOver iOS)

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
