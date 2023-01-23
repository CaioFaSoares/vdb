import React, { useState } from 'react';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { Input, Button } from 'components';

const AccountPasswordForm = ({ value, setValue, success, isOld, isNew }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <Input
        className={`w-full ${isOld ? '' : 'rounded-r-none'}`}
        placeholder={isNew ? 'New Password' : 'Password'}
        type={hidePassword ? 'password' : 'text'}
        autoComplete={isNew ? 'new-password' : 'password'}
        name={isNew ? 'new-password' : 'password'}
        value={value}
        required={true}
        onChange={(e) => setValue(e.target.value)}
      />
      {!isOld && (
        <>
          <Button
            className="rounded-none"
            tabIndex="-1"
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button
            className="rounded-l-none "
            variant={success ? 'success' : 'primary'}
            type="submit"
          >
            <Check2 />
          </Button>
        </>
      )}
    </>
  );
};

export default AccountPasswordForm;
