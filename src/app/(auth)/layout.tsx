import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
