import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PenFill } from 'react-bootstrap-icons';

function AccountChangeName(props) {
  const [state, setState] = useState({
    publicName: props.publicName,
  });

  const [emptyPublicName, setEmptyPublicName] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeName = () => {
    if (state.publicName) {
      setEmptyPublicName(false);

      const url = process.env.API_URL + 'account';
      const input = {
        publicName: state.publicName,
      };

      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw Error(`Error: ${response.status}`);
          }
        })
        .then(() => props.setPublicName(state.publicName))
        .catch((error) => {
          console.log(error);
        });
    };

    !state.publicName ? setEmptyPublicName(true) : setEmptyPublicName(false);
  };

  return (
    <>
      <h6>
        <PenFill />
        Change public name
      </h6>
      <div className="d-flex">
        <div>
          <input
            placeholder="Public name"
            type="text"
            name="publicName"
            value={state.publicName}
            onChange={handleChange}
          />
          {emptyPublicName && (
            <>
              <br />
              <span className="login-error">Enter name</span>
            </>
          )}
        </div>
        <Button variant="outline-secondary" onClick={changeName}>
          Change
        </Button>
      </div>
    </>
  );
}

export default AccountChangeName;
