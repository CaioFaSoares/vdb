import json
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id

with open("twda.json", "r") as twda_input, open("twdDecks.json", "w") as twdaDecks_file, open("twdDecksById.json", "w") as twdaDecksById_file:
    twda = json.load(twda_input)
    decks = []
    decks_by_id = {}
    total = len(twda)

    for idx, i in enumerate(twda):
        # if idx == 5:
        #     break
        print(f"Generating decks: {idx + 1} of {total}")

        deck = {
            'deckid': i['id'],
            'name': i['name'] if 'name' in i else 'Unknown',
            'event': i['event'],
            'date': i['date'],
            'location': i['place'],
            'score': i['score'] if 'score' in i else 'Unknown',
            'format': i['tournament_format'] if 'tournament_format' in i else 'Unknown',
            'players': i['players_count'] if 'players_count' in i else 'Unknown',
            'player': i['player'] if 'player' in i else 'Unknown',
            'crypt': {},
            'cryptTotal': i['crypt']['count'],
            'clan': '',
            'description': i['comments'] if 'comments' in i else '',
            'library': {},
            'libraryTotal': i['library']['count'],
            'link': i['event_link'] if 'event_link' in i else'',
            'disciplines': [],
            'cardtypes_ratio': {},
            'timestamp': i['date'],
        }

        totalCapacity = 0

        clans = {}

        cryptDisciplines = set()

        for card in i['crypt']['cards']:
            # Skip Anarch Convert
            if card['id'] != 200076:
                totalCapacity += card['count'] * get_crypt_by_id(card['id'])['Capacity']
                if (clan := get_crypt_by_id(card['id'])['Clan']) in clans:
                    clans[clan] += card['count']
                else:
                    clans[clan] = card['count']

            deck['crypt'][card['id']] = {
                'q': card['count']
            }

            for discipline in get_crypt_by_id(card['id'])['Disciplines'].keys():
                cryptDisciplines.add(discipline)

        for clan, q in clans.items():
            if q / deck['cryptTotal'] > 0.5:
                deck['clan'] = clan

        deck['capacity'] = totalCapacity / deck['cryptTotal']

        for type in i['library']['cards']:
            deck['cardtypes_ratio'][type['type'].lower()] = type['count'] / deck['libraryTotal']

            for card in type['cards']:

                deck['library'][card['id']] = {
                    'q': card['count']
                }

                card_discipline_entry = get_library_by_id(card['id'])['Discipline']
                if '&' in card_discipline_entry:
                    for discipline in card_discipline_entry.split(' & '):
                        if discipline not in deck['disciplines']:
                            deck['disciplines'].append(discipline)

                elif '/' in card_discipline_entry:
                    for discipline in card_discipline_entry.split('/'):
                        if discipline not in deck['disciplines']:
                            deck['disciplines'].append(discipline)

                elif card_discipline_entry and card_discipline_entry not in deck['disciplines'] and card_discipline_entry in cryptDisciplines:
                    deck['disciplines'].append(card_discipline_entry)

        decks.append(deck)
        decks_by_id[i['id']] = deck

    # json.dump(decks, twdaDecks_file, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(decks, twdaDecks_file, indent=4, separators=(',', ':'))
    json.dump(decks_by_id, twdaDecksById_file, indent=4, separators=(',', ':'))


with open("twda.json", "r") as twda_input, open("twdLocations.json", "w") as twdaLocations_file, open("twdPlayers.json", "w") as twdaPlayers_file:

    twda = json.load(twda_input)
    locations = set(())
    players = set(())
    total = len(twda)

    for idx, i in enumerate(twda):
        # if idx == 0:
        #     break
        # print(f"Generating players & locations: {idx + 1} of {total}")

        place = i['place'].split(', ')
        locations.add(place.pop())
        locations.add(i['place'])

        players.add(i['player'])


    locations = sorted(locations)
    locationsOptions = []
    for i in locations:
        locationsOptions.append({'label': i, 'value': i})

    players = sorted(players)
    playersOptions = []
    for i in players:
        playersOptions.append({'label': i, 'value': i})

    # json.dump(decks, twda_output, separators=(',', ':'))
    # Use this instead, for output with indentation (e.g. for debug)
    json.dump(playersOptions, twdaPlayers_file, indent=4, separators=(',', ':'))
    json.dump(locationsOptions, twdaLocations_file, indent=4, separators=(',', ':'))
