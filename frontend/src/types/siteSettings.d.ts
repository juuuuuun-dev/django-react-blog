
export type SiteSettingDetail = {
  name: string,
  description: string,
  main_image: string | undefined,
  logo: string | undefined,
}

export type SiteSettingConfig = {
  logo_size: ImageSize,
  main_image_size: ImageSize,
}

export type SiteSettingsFormProps = {
  data: SiteSettingDetail | undefined,
  config: SiteSettingConfig | undefined,
  onSubmit: (values: any) => Promise<void>;
}
export type ImageSize = {
  width: number,
  height: number,
}