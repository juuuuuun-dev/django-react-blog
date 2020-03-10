import React from 'react';

export interface ContentleLayoutProps {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentleLayoutProps) => {
  return (
    <>
      wrap
      {{ children }}
    </>
  );
};

export default ContentLayout;
