


export type MetaHeadProps = {
  appTitle?: string | undefined;
  pageTitle?: string | undefined;
  meta?: MetaType;
  jsonLd?: [] | undefined;
}

export type MetaType = {
  name?: string;
  property?: string;
  content: string;
}[];


export type CreateMetaArg = {
  title: string | undefined;
  url: string | undefined;
  description?: string;
  image?: string;
  type?: string;
  updated_at?: string;
  created_at?: string;
}


