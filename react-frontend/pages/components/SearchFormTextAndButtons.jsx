import React from 'react';
import { FormControl, InputGroup, Spinner, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function SearchFormTextAndButtons(props) {
  return (
    <InputGroup className="mb-2">
      <FormControl
        placeholder="Card Name / Text"
        type="text"
        name="text"
        value={props.value}
        onChange={props.onChange}
        autoFocus={true}
      />
      <InputGroup.Append>
        {!props.spinner ? (
          <Button variant="outline-secondary" type="submit">
            <Check2 size={20} />
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
          <X size={20} />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchFormTextAndButtons;
