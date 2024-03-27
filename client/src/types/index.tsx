export interface SignUpRequestPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role:string
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
export interface Courses {
  _id: string;
  author: string;
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  enrolled_users: [];
  isAvailable: boolean;
  preview_image: string;
  course_sections: CourseSections[];
}
export interface CourseSections {
  _id: string;
  title: string;
  overall:number;
  exercises: Exercise[];
  videos: Video[];
  textmaterials: TextMaterial[];

}
export interface Exercise {
  _id: string;
  title: string;
  title_tr: string;
  questions: Questions[];
  order:number
  best_percentage_passed:number
}
export interface Questions {
  _id: string;
  correct_option: string;
  options: string[];
  options_tr: string[];
  question: string;
  question_tr: string;
}

export interface TextMaterial {
  _id: string;
  description: string;
  file_url: string;
  type: string;
  title: string;
  title_tr: string;
}

export interface Video {
  _id: string;
  description: string;
  video_url: string;
  duration: string;
  type: string;
  title: string;
  title_tr: string;
  order:number
}

export interface AppContextState {
  isLoggedIn: boolean;
}
export interface AuthActionsContextState {
  logout: () => void;
}

export type Locale = string;
export type LocaleContextType = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};