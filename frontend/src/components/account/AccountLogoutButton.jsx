import React from 'react';
import DoorClosedFill from 'assets/images/icons/door-closed-fill.svg';
import { useApp } from 'context';
import { userServices } from 'services';
import { ButtonIconed } from 'components';

const AccountLogoutButton = (props) => {
  const { initializeUnauthenticatedUser } = useApp();

  const logoutUser = () => {
    initializeUnauthenticatedUser();
    userServices.logout();
  };

  return (
    <ButtonIconed
      variant="primary"
      onClick={logoutUser}
      title="Logout"
      icon={<DoorClosedFill />}
      text="Logout"
    />
  );
};

export default AccountLogoutButton;
