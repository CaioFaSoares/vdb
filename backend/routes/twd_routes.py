from flask import jsonify, request, abort
from flask_login import current_user
import json
from random import random
from search_decks import search_decks
from search_decks_components import match_inventory
from hall_of_fame import get_hof_players
from api import app
from models import Deck


with open("twd_locations.json", "r") as twd_locations_file:
    twd_locations = json.load(twd_locations_file)

with open("twd_players.json", "r") as twd_players_file:
    twd_players = json.load(twd_players_file)

with open("twd_decks.json", "r") as twd_decks_file:
    twd_decks = json.load(twd_decks_file)
    for deck in twd_decks.values():
        deck["crypt"] = {}
        deck["library"] = {}
        for id, q in deck["cards"].items():
            id = int(id)
            if id > 200000:
                deck["crypt"][id] = q
            else:
                deck["library"][id] = q


def sanitize_twd(d):
    deck = {
        "deckid": d["deckid"],
        "name": d["name"],
        "author": d["author"],
        "event": d["event"],
        "players": d["players"],
        "location": d["location"],
        "creation_date": d["creation_date"],
        "cards": d["cards"],
    }

    return deck


@app.route("/api/twd/cities", methods=["GET"])
def get_cities():
    return jsonify(twd_locations['cities'])

@app.route("/api/twd/countries", methods=["GET"])
def get_countries():
    return jsonify(twd_locations['countries'])


@app.route("/api/twd/authors", methods=["GET"])
def get_twd_authors():
    return jsonify(twd_players)


@app.route("/api/twd/hall_of_fame", methods=["GET"])
def get_twd_hof_players():
    return jsonify(get_hof_players(twd_decks.values()))


@app.route("/api/twd/new/<int:quantity>", methods=["GET"])
def get_new_twd_route(quantity):
    decks = []
    for i in range(quantity):
        deck = list(twd_decks.values())[i]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route("/api/twd/random/<int:quantity>", methods=["GET"])
def get_random_twd_route(quantity):
    all_decks = list(twd_decks.values())
    decks = []
    max_id = len(all_decks) - 1
    counter = 0
    while counter < quantity:
        counter += 1
        deck = all_decks[round(random() * max_id)]
        decks.append(sanitize_twd(deck))

    return jsonify(decks)


@app.route("/api/search/twd", methods=["POST"])
def search_twd_route():
    query_priority = [
        "author",
        "location",
        "event",
        "date",
        "players",
        "libraryTotal",
        "crypt",
        "library",
        "clan",
        "sect",
        "traits",
        "capacity",
        "disciplines",
        "cardtypes",
        "similar",
    ]
    queries = [
        {"option": q, "value": request.json[q]}
        for q in query_priority
        if q in request.json
    ]

    result = search_decks(queries, twd_decks.values())

    if "matchInventory" in request.json:
        if result:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, result
            )
        else:
            result = match_inventory(
                request.json["matchInventory"],
                current_user.inventory,
                twd_decks.values(),
            )

    if not result:
        abort(400)
    return jsonify([sanitize_twd(d) for d in result])
