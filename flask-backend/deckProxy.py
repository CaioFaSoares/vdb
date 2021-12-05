from fpdf import FPDF
from unidecode import unidecode
import re
import base64
import os.path
from searchCryptComponents import get_crypt_by_id
from searchLibraryComponents import get_library_by_id

cardtypes_sorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
]


def deckProxy(input):
    try:
        crypt = {}
        library = {}

        for k, v in input.items():
            k = int(k)
            card = {}

            if k > 200000:
                card = get_crypt_by_id(k)
                # name = card['Name']
                if card['Adv'] and card['Adv'][0]:
                    card['Name'] += 'adv'
                if card['New']:
                    card['Name'] += f"g{card['Group']}"

            elif k < 200000:
                card = get_library_by_id(k)
                # name = get_library_by_id(k)['Name']

            filename = unidecode(re.sub('[\\W]', '',
                                        card['Name'])).lower() + '.jpg'
            file = None
            if 'set' in v and os.path.exists(
                    f"./cards/set/{v['set']}/{filename}"):
                file = f"./cards/set/{v['set']}/{filename}"
            else:
                file = f"./cards/{filename}"

            if k > 200000 and v['q'] > 0:
                crypt[card['Name']] = {
                    'file': file,
                    'q': v['q'],
                }

            elif k < 200000 and v['q'] > 0:
                if card['Type'] not in library:
                    library[card['Type']] = {}

                library[card['Type']][card['Name']] = {
                    'file': file,
                    'q': v['q'],
                }

        cardlist = []

        for card in sorted(crypt.keys()):
            for i in range(crypt[card]['q']):
                cardlist.append(crypt[card]['file'])

        for cardtype in cardtypes_sorted:
            if cardtype in library:
                for card in sorted(library[cardtype].keys()):
                    for i in range(library[cardtype][card]['q']):
                        cardlist.append(library[cardtype][card]['file'])

        pdf = FPDF('P', 'mm', 'A4')

        w = 63
        h = 88
        gap = 0.2
        left_margin = 10
        top_margin = 10

        x_counter = 0
        y_counter = 0

        pdf.add_page()
        pdf.set_fill_color(40, 40, 40)

        page = 1

        for c in cardlist:
            pdf.rect((left_margin + x_counter * (w + gap)),
                     (top_margin + y_counter * (h + gap)), (w + gap),
                     (h + gap), 'F')

            pdf.image(c, (w + gap) * x_counter + left_margin,
                      (h + gap) * y_counter + top_margin, w, h)

            x_counter += 1

            if x_counter == 3:
                y_counter += 1
                x_counter = 0

            if y_counter == 3 and page * 9 < len(cardlist):
                page += 1
                pdf.add_page()
                pdf.set_fill_color(40, 40, 40)
                y_counter = 0

        output = pdf.output(dest='S').encode('latin-1')
        return base64.b64encode(output)

    except Exception:
        pass
