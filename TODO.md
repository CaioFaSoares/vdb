# FIX
* TWD location/winner form reset
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Scroll modal for deck through library + crypt
* Error in twd sanitizeTwd with del (deck['description'])
* Proxy to have gray background only between cards

# FIX MOBILE
* Card modal popovers in text/rulings like /Card Name/ or {Card Name} to open on mobile

# FEATURES
* Update cardbase script
* Create revocable link to Inventory
* Show missing cards for inventory
* Inventory add from precon
* Inventory add from decks with select form (mark decks already in)
* Search for similar TWD decks
* Localized proxies
* Narrow search by clicks (i.e. twd author)

# MOBILE FEATURES
* If no results but url on mobile to run search
* Offline PWA support

# MAYBE LATER FEATURES
* Documentation on updates / update script

# IMPROVE TECHNOLOGY - FRONTEND
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Check frontend input (quantity/cardid) on backend
* Update API endpoints
* Add error codes to return
* Unify tests for current_user
