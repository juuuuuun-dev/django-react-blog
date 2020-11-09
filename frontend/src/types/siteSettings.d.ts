
export type SiteSettingDetail = {
  name: string,
  description: string,
  main_image: string | undefined,
  logo: string | undefined,
}

export type SiteSettingsFormProps = {
  data: SiteSettingDetail | undefined,
  onSubmit: (values: any) => Promise<void>;
}