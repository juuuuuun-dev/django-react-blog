


export type MetaHeadProps = {
  pageTitle?: string | undefined;
  description?: string | undefined;
  meta?: MetaType;
}

export type MetaType = {
  name?: string;
  property?: string;
  content: string;
}[];


export type CreateMetaArg = {
  title: string;
  url: string;
  description?: string;
  image?: string;
  type?: string;
  updated_at?: string;
  created_at?: string;
}


