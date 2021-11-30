import React, { useState, useRef, useContext } from 'react';
import { Form, FormControl, InputGroup, Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { ErrorOverlay } from 'components';
import AppContext from 'context/AppContext';

function AccountDeleteConfirmation(props) {
  const { username, setUsername, isMobile } = useContext(AppContext);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refPassword = useRef(null);

  const handleChange = (event) => setPassword(event.target.value);

  const deleteAccount = () => {
    setPasswordError(false);

    if (password) {
      setEmptyPassword(false);

      const url = `${process.env.API_URL}account/remove`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response.json();
        })
        .then((data) => {
          props.setShow(false);
          setUsername(undefined);
        })
        .catch((error) => {
          setPasswordError(true);
          setPassword('');
        });
    } else {
      setEmptyPassword(!password);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deleteAccount();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        animation={false}
        centered={isMobile}
      >
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <h5>
            DELETE ACCOUNT
            <span className="px-1 ps-2">
              {'"'}
              {username}
              {'"'}?
            </span>
          </h5>
          <Button
            variant="outline-secondary"
            onClick={() => props.setShow(false)}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="pt-2">
            <h6>THIS CANNOT BE UNDONE!</h6>
          </div>
          This will also delete all your decks and they will not be available
          via URL anymore.
        </Modal.Body>
        <Modal.Footer>
          <Form className="my-2" onSubmit={handleSubmitButton}>
            <InputGroup>
              <FormControl
                placeholder="Enter password"
                type={hidePassword ? 'password' : 'text'}
                name="password"
                value={password}
                onChange={handleChange}
                autoFocus={true}
                ref={refPassword}
              />
              <Button
                tabIndex="-1"
                variant="primary"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? <EyeFill /> : <EyeSlashFill />}
              </Button>
              <Button variant="danger" type="submit">
                Delete
              </Button>
              <Button variant="primary" onClick={() => props.setShow(false)}>
                Cancel
              </Button>
            </InputGroup>
            <ErrorOverlay
              show={emptyPassword}
              target={refPassword.current}
              placement="bottom"
              modal={true}
            >
              ENTER PASSWORD
            </ErrorOverlay>
            <ErrorOverlay
              show={passwordError}
              target={refPassword.current}
              placement="bottom"
              modal={true}
            >
              WRONG PASSWORD
            </ErrorOverlay>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountDeleteConfirmation;
