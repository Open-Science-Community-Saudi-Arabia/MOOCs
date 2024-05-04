export interface SignUpRequestPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
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
  account_id: string;
  email_verified: boolean;
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
  enrolled_users: string[];
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    preferred_language: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;
  enableEditing: boolean;
  preview_image: string;
  status: string;
  course_sections: CourseSections[];
}

export interface CourseSections {
  _id: string;
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  resources: Resources[];
}
export interface Resources {
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  type: string;
  overall: number;
  quiz: Quiz[];
  link?: string;
  file?: string;
  _id: string;
  highest_score?:number
}
export interface Quiz {
  _id: string;
  title: string;
  title_tr: string;
  options: [{ name: string }];
  options_tr: [{ name: string }];
  question_tr: string;
  question: string;
  correctanswer: string;
  correctanswer_tr: string;
  best_percentage_passed: number;
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
  link: string;
  duration: string;
  type: string;
  title: string;
  title_tr: string;
  order: number;
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