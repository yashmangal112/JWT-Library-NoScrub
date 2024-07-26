import React from 'react';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <main className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
