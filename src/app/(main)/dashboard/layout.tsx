import React from 'react';
import { Toaster } from 'sonner';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <h1 className="gradient-title text-3xl md:text-6xl">Dashboard</h1>
      </div>
      {children}
      <Toaster richColors />
    </div>
  );
};

export default DashboardLayout;
