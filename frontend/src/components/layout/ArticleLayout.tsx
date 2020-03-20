import React from 'react';

export interface ArticleLayoutProps {
  children: React.ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps) => {
  return (
    <>
      Article
      {{ children }}
    </>
  );
};

export default ArticleLayout;
