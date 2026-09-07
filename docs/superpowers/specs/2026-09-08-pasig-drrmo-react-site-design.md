# Pasig City DRRMO React Site Design

## Objective

Convert the supplied Figma Make export into a polished, responsive single-page React website for Pasig City DRRMO. The implementation will use the supplied photographs and icons, preserve the visual character of the design, replace placeholder emergency and evacuation information with the user's content, and include a frontend chatbot that can later connect to a RAG service.

## Scope

The first version is a frontend-only Vite and React application. It includes:

- A responsive header and single-page navigation.
- A photographic hero with calls to action.
- A public alert/status strip using clearly identified static demo data.
- Hazard education cards.
- A four-step family preparedness section.
- Evacuation centers grouped by barangay or area, without a capacity field.
- Verified display of the emergency hotline information supplied by the user.
- A footer and floating chatbot launcher.
- A functional chatbot interface backed by local demonstration responses.
- A clean integration boundary for a future RAG HTTP endpoint.

The first version does not include a production RAG backend, live PAGASA or river-level integrations, an administrative content editor, authentication, or multiple routes.

## Technical Approach

Use Vite, React, and maintainable plain CSS. This keeps the application lightweight and makes exact visual tuning straightforward. The page will be divided into focused React components:

- `Header`: branding, desktop navigation, and mobile menu.
- `Hero`: hero imagery, introductory copy, and primary actions.
- `AlertBar`: current-status presentation, explicitly treated as demo content until a live source exists.
- `HazardsSection`: hazard cards rendered from structured data.
- `PreparednessSection`: four preparation steps rendered from structured data.
- `EvacuationSection`: centers grouped by barangay or area.
- `HotlinesSection`: emergency contacts with clickable telephone links.
- `ChatWidget`: launcher, dialog, message history, suggestions, typing state, error state, and retry behavior.
- `Footer`: compact agency identity and address line.

Content such as hazards, evacuation centers, and hotlines will be held in dedicated data modules. Components will focus on presentation and interaction rather than embedding large content lists directly in markup.

## Visual System

The implementation will closely follow the supplied Figma export:

- Archivo for prominent headings and strong labels.
- Inter for body text and controls.
- JetBrains Mono for uppercase metadata and status labels.
- Navy, civic blue, pale blue, white, and light gray as the core palette.
- A dark layered gradient over the supplied flood photograph in the hero.
- Rounded cards, restrained borders, compact shadows, and pill-shaped actions.
- Supplied SVG artwork for hazard and interface icons where applicable.
- The supplied volunteer image in an appropriate preparedness or community-support treatment.

Spacing, typography, and widths will remain faithful to the desktop reference while using fluid sizing and breakpoints rather than the fixed pixel layout emitted by Figma.

## Responsive and Accessible Behavior

Desktop navigation will collapse into a mobile menu on narrower screens. Navigation and calls to action will scroll smoothly to their matching sections. Evacuation-center content will use grouped cards or stacked rows on small screens so it remains legible without horizontal scrolling.

Interactive elements will use semantic buttons and links, visible focus states, suitable accessible names, and comfortable touch targets. The chatbot will behave as a labelled dialog, support keyboard dismissal, and manage focus appropriately. Images will include useful alternative text, and decorative imagery will be hidden from assistive technology where appropriate.

## Chatbot Integration Boundary

The initial chatbot will use a local demo adapter with a small set of disaster-preparedness responses and suggested questions. UI components will call a stable messaging interface rather than referencing demo data directly.

The future RAG adapter will accept a user message and conversation history and return a normalized assistant response. Its endpoint and configuration will be isolated from the UI. Network, server, or malformed-response failures will produce a friendly inline error with a retry action while keeping conversation history intact.

## Content Decisions

Evacuation centers will be organized by barangay or area; the capacity column in the Figma export will be removed because capacities were not supplied. The site will use the user's emergency hotline list:

- Pasig City DRRMO Emergency Hotline: 8643-0000
- Philippine National Police: 8477-7953
- Bureau of Fire Protection – Pasig: 0932 779 8621
- Pasig City Children's Hospital: 8643-2222
- Pasig City General Hospital: 8642-7379 and 8642-7381

The evacuation list will preserve the provided place names and group them under their stated areas, including Ugong, Maybunga, and Sta. Lucia. Unlabelled initial entries will be presented as city evacuation centers until more specific grouping information is supplied.

## Verification

Verification will include:

- A successful production build.
- Desktop, tablet, and mobile layout checks.
- Header navigation, mobile menu, and smooth-scroll behavior.
- Primary hero actions and telephone links.
- Chat open, close, send, suggestion, typing, error, retry, and keyboard behavior.
- Semantic structure, focus visibility, image alternatives, and reduced-motion handling.
- Confirmation that all supplied centers and emergency numbers appear correctly.

## Completion Criteria

The work is complete when the repository contains a runnable React application that visually matches the supplied design, uses the supplied assets, presents the updated evacuation and hotline content, works responsively, provides a usable demo chatbot, and can be connected to a future RAG endpoint without restructuring the page or chat UI.
