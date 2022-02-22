from flask import jsonify, request, abort, Response
from flask_login import current_user, login_required
from datetime import date, datetime
import json
import uuid
from random import random

from search_decks import search_decks
from search_decks_components import (
    get_deck_for_frontend,
    get_missing_fields,
    match_inventory,
)
from api import app, db, login
from models import User, Deck


@login.unauthorized_handler
def unauthorized_handler():
    return Response(json.dumps({"Not logged in": True}), 401)


@app.route("/api/pda/authors", methods=["GET"])
def getPdaAuthors():
    authors = []
    for d in Deck.query.filter(Deck.public_parent != None).all():
        if d.author_public_name not in authors:
            authors.append(d.author_public_name)

    return jsonify([{"label": a, "value": a} for a in authors])


@app.route("/api/search/pda", methods=["POST"])
def searchPdaRoute():
    pda_decks = []
    for d in (
        Deck.query.filter(Deck.public_parent != None).order_by(Deck.creation_date).all()
    ):
        deck = {
            "deckid": d.deckid,
            "capacity": d.capacity,
            "cardtypes_ratio": d.cardtypes_ratio,
            "clan": d.clan,
            "crypt": {},
            "crypt_total": d.crypt_total,
            "creation_date": d.creation_date,
            "disciplines": d.disciplines,
            "library": {},
            "library_total": d.library_total,
            "author": d.author_public_name,
            "traits": d.traits,
            "owner": d.author,
        }

        for id, q in d.cards.items():
            if id > 200000:
                deck["crypt"][id] = q
            else:
                deck["library"][id] = q

        pda_decks.append(deck)

    query_priority = [
        "src",
        "owner",
        "author",
        "date",
        "libraryTotal",
        "crypt",
        "library",
        "clan",
        "traits",
        "capacity",
        "disciplines",
        "cardtypes",
    ]

    queries = [
        {"option": q, "value": request.json[q]}
        for q in query_priority
        if q in request.json
    ]
    result = search_decks(queries, pda_decks)

    if "matchInventory" in request.json:
        if result != 400:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, result
            )
        else:
            result = match_inventory(
                request.json["matchInventory"], current_user.inventory, pda_decks
            )

    if result != 400:
        return jsonify([get_deck_for_frontend(d["deckid"]) for d in result])
    else:
        abort(400)


@app.route("/api/pda/<string:parent_id>", methods=["POST"])
@login_required
def newPublicDeck(parent_id):
    try:
        parent = Deck.query.get(parent_id)
        if parent.author != current_user:
            abort(401)
        if parent.public_child:
            return jsonify({"PDA already exist for": parent_id})

        child_id = uuid.uuid4().hex
        m = get_missing_fields(parent)

        child = Deck(
            deckid=child_id,
            public_parent=parent.deckid,
            name=parent.name,
            author=parent.author,
            author_public_name=parent.author_public_name,
            description=parent.description,
            cards=parent.cards,
            tags=parent.tags,
            creation_date=date.today().strftime("%Y-%m-%d"),
            crypt_total=m["crypt_total"],
            library_total=m["library_total"],
            capacity=m["capacity"],
            cardtypes_ratio=m["cardtypes_ratio"],
            clan=m["clan"],
            disciplines=m["disciplines"],
            traits=m["traits"],
        )

        parent.public_child = child_id

        db.session.add(child)
        db.session.commit()

        return jsonify(
            {
                "parent": parent.deckid,
                "child": child.deckid,
            }
        )

    except Exception:
        print("Error new PDA", current_user.username, parent_id)


@app.route("/api/pda/<string:child_id>", methods=["PUT"])
@login_required
def updatePublicDeck(child_id):
    try:
        child = Deck.query.get(child_id)
        if not child:
            print("bad deck request\n", child_id, current_user.username, request.json)
            return jsonify({"error": "no deck"})

        elif child.author != current_user:
            abort(401)

        parent = Deck.query.get(child.public_parent)
        m = get_missing_fields(parent)

        child.name = parent.name
        child.timestamp = datetime.utcnow()
        child.cards = parent.cards
        child.author_public_name = parent.author_public_name
        child.description = parent.description
        child.tags = parent.tags
        child.crypt_total = m["crypt_total"]
        child.library_total = m["library_total"]
        child.capacity = m["capacity"]
        child.cardtypes_ratio = m["cardtypes_ratio"]
        child.clan = m["clan"]
        child.disciplines = m["disciplines"]
        child.traits = m["traits"]

        db.session.commit()

        return jsonify(
            {
                "parent": parent.deckid,
                "child": child.deckid,
            }
        )

    except Exception:
        print("Error sync PDA", current_user.username, child_id)


@app.route("/api/pda/<string:child_id>", methods=["DELETE"])
@login_required
def deletePublicDeck(child_id):
    try:
        d = Deck.query.get(child_id)
        if d.author != current_user:
            abort(401)

        parent = Deck.query.get(d.public_parent)
        if parent:
            parent.public_child = None

        db.session.delete(d)
        db.session.commit()

        return jsonify(
            {
                "parent": parent.deckid,
                "child": child_id,
            }
        )

    except Exception:
        print("Error delete PDA", current_user.username, child_id)


@app.route("/api/pda/new/<int:quantity>", methods=["GET"])
def getNewPda(quantity):
    decks = []

    counter = 0
    for d in (
        Deck.query.filter(Deck.public_parent != None).order_by(Deck.creation_date).all()
    ):
        if counter == quantity:
            break

        counter += 1
        decks.append(get_deck_for_frontend(d.deckid))

    return jsonify(decks)


@app.route("/api/pda/random/<int:quantity>", methods=["GET"])
def getRandomPda(quantity):
    all_decks = Deck.query.filter(Deck.public_parent != None).all()
    max_id = len(all_decks) - 1
    decks = []
    decks_ids = []

    counter = 0
    while counter < quantity and len(decks_ids) <= max_id:
        id = round(random() * max_id)
        if id not in decks_ids:
            counter += 1
            decks_ids.append(id)
            decks.append(get_deck_for_frontend(all_decks[id].deckid))

    return jsonify(decks)


@app.route("/api/pda/favorites/<string:username>", methods=["GET"])
@login_required
def listFavorites(username):
    u = User.query.filter_by(username=username).first()
    print(u.username, u.favorites)

    return jsonify("kek")


@app.route("/api/pda/favorited/<string:deckid>", methods=["GET"])
def listFavorited(deckid):
    d = Deck.query.get(deckid)
    print(d.name, d.favorited)

    return jsonify("kek")


@app.route("/api/pda/favorite/<string:deckid>", methods=["POST"])
@login_required
def addFavorite(deckid):
    d = Deck.query.get(deckid)
    deck_favorited = d.favorited.copy()
    deck_favorited.append(current_user.id)
    d.favorited = deck_favorited

    user_favorites = current_user.favorites.copy()
    user_favorites.append(deckid)
    current_user.favorites = user_favorites

    db.session.commit()

    return jsonify({"favorited": deckid})


@app.route("/api/pda/favorite/<string:deckid>", methods=["DELETE"])
@login_required
def deleteFavorite(deckid):
    d = Deck.query.get(deckid)
    deck_favorited = d.favorited.copy()
    deck_favorited.remove(current_user.id)
    d.favorited = deck_favorited

    user_favorites = current_user.favorites.copy()
    user_favorites.remove(deckid)
    current_user.favorites = user_favorites

    db.session.commit()

    return jsonify({"unfavorited": deckid})
