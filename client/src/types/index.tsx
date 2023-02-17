export interface SignUpRequestPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface LoginInRequestPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  first_name: string;
  last_name: string;
  account_type: string;
  email_address?: string;
  phone_number?: string;
  account_id: string;
  email_verified: boolean;
  date_of_birth?: Date | null;
  organization_name?: string;
  country?: string;
  profile_photo_url?: string;
}
export interface ForgetPasswordReqPayload {
  email: string;
}
export interface ResetPasswordReqPayload {
  password_reset_code: string;
  new_password: string;
}

export interface AppContextState {
  isLoggedIn: boolean;
  // profile: Profile | null
}
export interface AuthActionsContextState {
  logout: () => void;
}
