export type ProfileDetail = {
  public_name: string;
  message: string;
  avator: string;
  url: string;
}

export type ProfileFormProps = {
  data: ProfileDetail | undefined,
  onSubmit: (values: any) => Promise<void>;
}