# FIX
- Public deck - refresh after sync button
- Add Kuyen image

# FEATURES
- Export all in xlsx and csv
- Add to compare notification/title
- Documentation discoverability (links to pages?)

# MAYBE LATER FEATURES
- Comments for PDA
- Sorting by new/favorites/comments in PDA/TWD
- Script to update images from static.krcg.org

# IMPROVE TECHNOLOGY - FRONTEND
- Move search to frontend
- Move export to frontend
- Move import to frontend
- Transit from useContext to Recoil
- Reduce re-renders
- Refactor setDecks calls (import/create/clone) into addImportedDeckToState
- Check fields matching between server answers and setState for addImportedDeckToState
- Remove 'owner' from frontend (change to is_yours)

# IMPROVE TECHNOLOGY - BACKEND

# REFACTORING TODO - Andrey
- split inventory.jsx into (destktop, mobile, login)
- remove Item UI from table into respective Item component.
- move subComponents to subfolders and remove from main export.
- check InventoryLibrary to refactor
