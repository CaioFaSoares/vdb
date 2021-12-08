import json
import re
from unidecode import unidecode
from importParseCard import importParseCard

with open("vtescrypt.json", "r") as crypt_file:
    crypt = json.load(crypt_file)

with open("vteslib.json", "r") as library_file:
    library = json.load(library_file)


def deckImport(deckText):
    linesArray = deckText.splitlines()
    deck = {
        'name': 'New Imported Deck',
        'author': '',
        'description': '',
        'cards': {}
    }
    cardbase = {}

    for card in crypt:
        adv = True if card['Adv'] and card['Adv'][0] else False
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()

        if name not in cardbase:
            cardbase[name] = {'base': card['Id'], card['Group']: card['Id']}
        elif adv:
            cardbase[name]['adv'] = card['Id']
        else:
            cardbase[name][card['Group']] = card['Id']

    for card in library:
        name = re.sub(r'\W', '', unidecode(card['Name'])).lower()
        cardbase[name] = {'base': str(card['Id'])}

    for i in linesArray:
        print(i)

        if nameMatch := re.match(r'^Deck Name: (.+)', i):
            deck['name'] = nameMatch.group(1)
            continue
        if nameMatch := re.match(r'^Author: (.+)', i):
            deck['author'] = nameMatch.group(1)
            continue
        if nameMatch := re.match(r'^Description: (.+)', i):
            deck['description'] = nameMatch.group(1)
            continue

        id, quantity = importParseCard(i, cardbase)
        if id and quantity:
            deck['cards'][id] = quantity

    return (deck['name'], deck['author'], deck['description'], deck['cards'])
