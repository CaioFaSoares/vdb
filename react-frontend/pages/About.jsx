import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function About(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col md={12} lg={6} className="px-0">
          <div className="px-1 about-version">
            <h5>VERSION</h5>
            <p>
              Card text based on{' '}
              <a href="http://www.vekn.net/card-lists">
                vekn.net official list
              </a>
              : 2020-06-23
              <br />
              Card images by Syndelson's{' '}
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood">
                FELD
              </a>
              : 2019-11-11 v2.72
            </p>
          </div>

          <div className="px-1">
            <h5>WHAT IS IT</h5>
            <p>
              VDB is online card search and deck building tool for Vampire the
              Eternal Struggle (VTES).
              <br />
              It's a successor of{' '}
              <a href="https://vtes-db.smeea.casa/about">VTES-DB</a>.
            </p>
            <h5>FEATURES</h5>
            <ul>
              <li>Combined deck building & search interface</li>
              <li>Clean, but informative look</li>
              <li>Mobile-friendly</li>
              <li>
                Import/export to popular formats to easy migration and backup
              </li>
              <li>Once familiar with, you will love it!</li>
              <li>Open source</li>
              <li>Ad-free & non-commercial</li>
            </ul>
            <h5>SCREENSHOTS</h5>
            <h5>RELATED PROJECTS</h5>
            <p>
              <a href="https://amaranth.vtes.co.nz/">
                <b>Amaranth</b>
              </a>
              <br />
              Online card search and deck-building tool. I use *many* ideas from
              Amaranth.
            </p>
            <p>
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood">
                <b>FELD</b>
              </a>
              <br />
              Deck-building application for Windows.
              <br />
            </p>

            <p>
              <a href="https://codex-of-the-damned.org/">
                <b>Codex of the Damned</b>
              </a>
              <br />
              Strategy portal.
            </p>

            <p>
              <span className="link-like">
                <b>Secret Library</b>
              </span>
              <br />
              Now resting in peace, but probably inspired most of existing
              projects including this one.
            </p>

            <p>
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                <b>There are more!</b>
              </a>
              <br />
              Check{' '}
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                vekn forum
              </a>{' '}
              for more tools!
              <br />
            </p>

            <h5>FOR DEVELOPERS</h5>
            <p>
              Development happens in{' '}
              <a href="https://github.com/smeea/vdb">this Github repository.</a>
              <br />
              Source code of the site is available under free{' '}
              <a href="https://en.wikipedia.org/wiki/MIT_License">
                MIT license.
              </a>
              <br />
              Card images & icons are copyrighted by Authors / Publishers.
            </p>

            <h5>PRIVACY</h5>
            <p>
              We respect privacy and promise not to use/share your data (email,
              decks, etc).
              <br />
              This service is ad-free and there are no trackers of your
              activity.
            </p>

            <h5>DONATIONS</h5>
            <p>Bitcoin (BTC): 3ALLfiv3AWcm7WzgWm9gHmLAAUMRcegBtP</p>

            <h5>CONTACTS</h5>
            <p>
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78553-vtes-db-announcement">
                Discussion thread on vekn.net forum.
              </a>
              <br />
              Please send proposals, bug reports and other feedback via{' '}
              <a href="https://github.com/smeea/vdb">Github</a> or{' '}
              <a href="mailto:smeea@riseup.net">email.</a>
              <br />
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
