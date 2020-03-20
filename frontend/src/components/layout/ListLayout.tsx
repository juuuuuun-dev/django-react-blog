import React from 'react';

export interface ListLayoutProps {
  children: React.ReactNode;
}

const ListLayout = ({ children }: ListLayoutProps) => {
  return (
    <>
      wrap
      {{ children }}
    </>
  );
};

export default ListLayout;
