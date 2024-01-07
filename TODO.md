# FIX
- Modal opening new window instead of closing when click outside on mobile (touch)
- Mobile support for Tournament Analyze
- Convert card-ids from playtest to release

# FEATURES
- Show Deck legality deck based on new releases

# TECH IMPROVEMENTS
- Migration from isWide, etc to container queries (need tailwild support max-)
- Explicit image width/height
- Refactor Deck Buttons (split in button ui and function incl. deckstore functions)
- Back button behavior
- Update to Vite 5 (when hmr circular import issue is resolved)
- Update to Headlessui 2 (review new components)
- Unify gaps between panes (const with 'gap-3 sm:gap-4 md:gap-6 xl:gap-8')
