from flask import jsonify, request, abort
from flask_login import current_user
import json
from random import random

from searchTwd import searchTwd
from searchTwdComponents import sanitize_twd, match_inventory
from api import app


with open("twdLocations.json", "r") as twd_locations_file:
    twd_locations = json.load(twd_locations_file)

with open("twdPlayers.json", "r") as twd_players_file:
    twd_players = json.load(twd_players_file)

with open("twdDecks.json", "r") as twd_file:
    twd_decks = json.load(twd_file)
    for deck in twd_decks:
        deck['crypt'] = {}
        deck['library'] = {}
        for id, q in deck['cards'].items():
            id = int(id)
            if id > 200000:
                deck['crypt'][id] = q
            else:
                deck['library'][id] = q


@app.route('/api/twd/locations', methods=['GET'])
def getLocations():
    return jsonify(twd_locations)


@app.route('/api/twd/authors', methods=['GET'])
def getTwdAuthors():
    return jsonify(twd_players)


@app.route('/api/twd/new/<int:quantity>', methods=['GET'])
def getNewTwd(quantity):
    decks = []
    for i in range(quantity):
        deck = twd_decks[i]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route('/api/twd/random/<int:quantity>', methods=['GET'])
def getRandomTwd(quantity):
    decks = []
    max_id = len(twd_decks) - 1
    counter = 0
    while counter < quantity:
        counter += 1
        deck = twd_decks[round(random() * max_id)]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route('/api/search/twd', methods=['POST'])
def searchTwdRoute():
    result = searchTwd(request, twd_decks)

    if 'matchInventory' in request.json:
        if result != 400:
            result = match_inventory(request.json['matchInventory'],
                                    current_user.inventory, result)
        else:
            result = match_inventory(request.json['matchInventory'],
                                     current_user.inventory, twd_decks)

    if result != 400:
        return jsonify(result)
    else:
        abort(400)
