# FIX
* Quick card to show on single result
* TWD location/winner form reset
* First Printed / Only In - change from set to precon-check for Reprints (HttB, KoT)
* Set search - change from set to precon-check for Reprints (HttB, KoT, Anthology)
* Save scrolling position
* Add card by initials - miss some searches (i.e. 'shordes' -> shambling hordes)
* Fix reflex as undefined.svg in card text modal
* Import revisions from Amaranth
* Update cards to 2021-03-24

# FIX MOBILE
* Optimize for tablet
* Floating close mobile card view

# FEATURES
* Create revocable link to Inventory
* Inventory data in TWD browser
* Mark pdf-sets in inventory-mode
* Show missing cards for inventory
* Popover on precons in modal preview set section
* Help sections to About/Pages
* Search criteries store/get from URL

# MAYBE LATER FEATURES
* Script to generate json from cvs from text disciplines
* Night theme
* Documentation on updates / update script
* Go to next card in modal preview (react-swipeable-views?)
* Export inventory to CSV
* Deck export to JOL

# IMPROVE TECHNOLOGY - FRONTEND
* Screenshots to Bootstrap/Carousel
* Clear CSS
* Analytics: posthog
* Tests: cypress / puppeteer
* Sync: websockets

# IMPROVE TECHNOLOGY - BACKEND
* Use Celery + Redis / RabbitMQ
* Flask-Restful
* Check frontend input (quantity/cardid/etc) on backend
* Update API endpoints
* Add error codes to return
* Amaranth import - fetch and id convert on backend
