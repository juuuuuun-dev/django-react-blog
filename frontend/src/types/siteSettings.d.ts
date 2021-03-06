
export type SiteSettingDetail = {
  name: string,
  description: string,
  main_image: string | undefined,
  logo: string | undefined,
  logo_mini: string | undefined,
}

export type SiteSettingConfig = {
  logo_size: ImageSize,
  main_image_size: ImageSize,
}

export type SiteSettingsFormProps = {
  data: SiteSettingDetail | undefined,
  config: SiteSettingConfig | undefined,
  onSubmit: (values: any) => Promise<void>;
  isStaff?: Boolean,
}
export type ImageSize = {
  width: number,
  height: number,
}