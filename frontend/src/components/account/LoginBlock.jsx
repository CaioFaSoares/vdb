import React from 'react';
import { AccountLogin, AccountRegister } from '@/components';

const LoginBlock = ({ children }) => {
  return (
    <div className="account-container mx-auto grid h-[80vh] place-items-center max-sm:p-3">
      <div className="w-full space-y-16">
        <div className="w-full space-y-6">
          <div className="flex justify-center text-center text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
            {children}
          </div>
          <AccountLogin />
        </div>
        <div className="w-full">
          <AccountRegister />
        </div>
      </div>
    </div>
  );
};

export default LoginBlock;
