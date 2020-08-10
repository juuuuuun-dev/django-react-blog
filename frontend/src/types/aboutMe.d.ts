export type AboutMeDetail = {
  page_title: string;
  description: string | null;
}

export type AboutMeFormProps = {
  data: AboutMeDetailDetail | undefined,
  onSubmit: (values: any) => Promise<void>;
}
