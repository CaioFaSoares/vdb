import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import OverlayTooltip from './OverlayTooltip.jsx';
import ModalTooltip from './ModalTooltip.jsx';
import DoorOpenFill from '../../assets/images/icons/door-open-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = () => {
    setPasswordError(false);

    if (state.username && state.password) {
      setEmptyUsername(false);
      setEmptyPassword(false);

      const url = `${process.env.API_URL}login`;
      const input = {
        username: state.username,
        password: state.password,
        remember: 'True',
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
        .then((data) => {
          props.setUsername(state.username);
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
          console.log(error);
        });
    }
    !state.username ? setEmptyUsername(true) : setEmptyUsername(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    loginUser();
  };

  const tooltipText = (
    <>
      We do not have automatic password restoration yet.
      <br />
      Please <a href="mailto:smeea@riseup.net">send me an email</a> with your account username and I will generate temporary password for you.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center">
        <DoorOpenFill />
        <span className="ml-2">Login</span>
      </h6>
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Username"
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            autoFocus={true}
          />
          <FormControl
            placeholder="Password"
            type={hidePassword ? 'password' : 'text'}
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <InputGroup.Append>
            <Button
              tabIndex="-1"
              variant="outline-secondary"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeFill /> : <EyeSlashFill />}
            </Button>
            <Button variant="outline-secondary" type="submit">
              <Check2 />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {emptyUsername && <span className="login-error">Enter username</span>}
        {passwordError && <span className="login-error">Wrong password</span>}
        {emptyPassword && <span className="login-error">Enter password</span>}
      </Form>
      {!props.isMobile ? (
        <OverlayTooltip text={tooltipText}>
          <span className="small">
            <a href="#"><i>Forgot password?</i></a>
          </span>
        </OverlayTooltip>
      ) : (
        <span
          onClick={() => setShowModal(true)}
          className="small"
        >
          <a href="#"><i>Forgot password?</i></a>
        </span>
      )}
      {showModal && (
        <ModalTooltip
          text={tooltipText}
          title="Forgot password"
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountLogin;
