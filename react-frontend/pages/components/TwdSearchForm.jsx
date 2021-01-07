import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import TwdSearchFormButtons from './TwdSearchFormButtons.jsx';
import TwdSearchFormPlayer from './TwdSearchFormPlayer.jsx';
import TwdSearchFormPlayers from './TwdSearchFormPlayers.jsx';
import TwdSearchFormLocation from './TwdSearchFormLocation.jsx';
import TwdSearchFormEvent from './TwdSearchFormEvent.jsx';
import TwdSearchFormDate from './TwdSearchFormDate.jsx';
import TwdSearchFormClan from './TwdSearchFormClan.jsx';
import TwdSearchFormCardtypes from './TwdSearchFormCardtypes.jsx';
import TwdSearchFormCapacity from './TwdSearchFormCapacity.jsx';
import TwdSearchFormTraitStar from './TwdSearchFormTraitStar.jsx';
import TwdSearchFormTraitMonoclan from './TwdSearchFormTraitMonoclan.jsx';
import TwdSearchFormDisciplines from './TwdSearchFormDisciplines.jsx';
import TwdSearchFormCrypt from './TwdSearchFormCrypt.jsx';
import TwdSearchFormLibrary from './TwdSearchFormLibrary.jsx';

function TwdSearchForm(props) {
  const [spinnerState, setSpinnerState] = useState(false);

  const defaults = {
    player: '',
    location: '',
    playersFrom: 'any',
    playersTo: 'any',
    dateFrom: 'any',
    dateTo: 'any',
    disciplines: {},
    clan: 'any',
    capacity: 'any',
    cardtypes: {
      master: 'any',
      action: 'any',
      'political action': 'any',
      ally: 'any',
      equipment: 'any',
      retainer: 'any',
      'action modifier': 'any',
      reaction: 'any',
      combat: 'any',
      event: 'any',
    },
    traits: {
      star: false,
      monoclan: false,
    },
    crypt: {},
    library: {},
  };

  const [eventText, setEventText] = useState('');
  const handleEventTextChange = (event) => setEventText(event.target.value);

  const handleSelectChange = (event) => {
    const { name, value } = event;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCardtypeChange = (event) => {
    const { name, value } = event;
    const newState = props.formState.cardtypes;
    newState[name] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      cardtypes: newState,
    }));
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const newState = props.formState[name];
    const i = value ? value : id
    newState[i] = !newState[i];
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    setEventText('');
    props.setFormState(defaults);
    props.setResults(undefined);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();

    const url = `${process.env.API_URL}search/twd`;

    const state = props.formState;
    state['event'] = eventText;

    const input = JSON.parse(JSON.stringify(props.formState));

    const multiSelectForms = ['crypt', 'library', 'disciplines', 'traits', 'cardtypes'];

    multiSelectForms.map((i) => {
      Object.keys(input[i]).forEach(
        (k) => (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k]
      );
    });

    Object.keys(input).forEach(
      (k) =>
        (input[k] == 'any' ||
          !input[k] ||
          Object.keys(input[k]).length === 0) &&
        delete input[k]
    );

    if (Object.keys(input).length === 0) {
      console.log('submit with empty forms');
    } else {
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      setSpinnerState(true);

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          props.setCardBase({});
          return data;
        })
        .then((data) => {
          props.setShowSearch(false);
          props.setResults(data[0]);
          props.setCardBase(data[1]);
          setSpinnerState(false);
        })
        .catch((error) => {
          props.setResults(null);
          setSpinnerState(false);
          console.log(error);
        });
    }
  };

  const getNewTwd = (q) => {
    setSpinnerState(true);

    const url = `${process.env.API_URL}twd/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        props.setCardBase({});
        return data;
      })
      .then((data) => {
        props.setShowSearch(false);
        props.setResults(data[0]);
        props.setCardBase(data[1]);
        setSpinnerState(false);
      })
      .catch((error) => {
        props.setResults(null);
        setSpinnerState(false);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <TwdSearchFormButtons
        handleClearButton={handleClearButton}
        spinner={spinnerState}
        getNewTwd={getNewTwd}
      />
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <label className="h6 mb-0">Year:</label>
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">from</label>
        </Col>
        <Col xs={8} className="d-inline px-0">
          <TwdSearchFormDate
            dateFrom={props.formState.dateFrom}
            dateTo={props.formState.dateTo}
            onChange={handleSelectChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <label className="h6 mb-0">Players:</label>
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">min</label>
        </Col>
        <Col xs={8} className="d-inline px-0">
          <TwdSearchFormPlayers
            playersFrom={props.formState.playersFrom}
            playersTo={props.formState.playersTo}
            onChange={handleSelectChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={4} className="d-flex px-0">
          <label className="h6 mb-0">Crypt Cards:</label>
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormCrypt
            state={props.formState.crypt}
            setState={props.setFormState}
            spinner={spinnerState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            cryptCards={props.cryptCards}
            setCryptCards={props.setCryptCards}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={4} className="d-flex px-0">
          <label className="h6 mb-0">Library Cards:</label>
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormLibrary
            state={props.formState.library}
            setState={props.setFormState}
            spinner={spinnerState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            libraryCards={props.libraryCards}
            setLibraryCards={props.setLibraryCards}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Clan:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormClan
            value={props.formState.clan}
            onChange={handleSelectChange}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitMonoclan
            value={props.formState.traits}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Capacity:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormCapacity
            value={props.formState.capacity}
            onChange={handleSelectChange}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitStar
            value={props.formState.traits}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <TwdSearchFormDisciplines
        disciplines={props.formState.disciplines}
        onChange={handleMultiChange}
      />
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline pr-0 pl-1">
          <TwdSearchFormCardtypes
            value={props.formState.cardtypes}
            onChange={handleCardtypeChange}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Event:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormEvent
            value={eventText}
            onChange={handleEventTextChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Location:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormLocation
            value={props.formState.location}
            setValue={props.setFormState}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Winner:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormPlayer
            value={props.formState.player}
            setValue={props.setFormState}
          />
        </Col>
      </Row>
    </form>
  );
}

export default TwdSearchForm;
