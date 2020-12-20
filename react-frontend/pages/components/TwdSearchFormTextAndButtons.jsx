import React from 'react';
import { FormControl, InputGroup, Spinner, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function TwdSearchFormTextAndButtons(props) {
  return (
    <InputGroup className="mb-2">
      <FormControl
        placeholder="Deck Name / Player / Location"
        type="text"
        name="text"
        value={props.value}
        onChange={props.onChange}
      />
      <InputGroup.Append>
        {!props.spinner ? (
          <Button variant="outline-secondary" type="submit">
            <Check2 />
          </Button>
        ) : (
          <Button variant="outline-secondary">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <Spinner />
          </Button>
        )}
        <Button variant="outline-secondary" onClick={props.handleClearButton}>
          <X />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default TwdSearchFormTextAndButtons;
