
export type PasswordResetConfirm = {
  uid: string | undefined;
  token: string | undefined;
  values: {
    new_password: string;
    new_password2: string;
  };
}