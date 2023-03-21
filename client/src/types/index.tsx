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
export interface Courses {
  _id: string;
  author: string;
  title: string;
  description: string;
  enrolled_users: [];
  isAvailable: boolean;
  preview_image: string;
  course_sections: CourseSections[];
}
export interface CourseSections {
  _id: string;
  title: string;
  exercises: Exercise[];
  videos: Video[];
  textmaterials: TextMaterial[];
}
export interface Exercise {
  _id: string;
  title: string;
  questions: Questions[];
  order:number
  isCompleted:boolean,
}
export interface Questions {
  _id: string;
  correct_option: string;
  options: string[];
  question: string;
}

export interface TextMaterial {
  _id: string;
  description: string;
  file_url: string;
  type: string;
  title: string;
}

export interface Video {
  _id: string;
  description: string;
  video_url: string;
  duration: string;
  type: string;
  title: string;
  order:number
}

export interface AppContextState {
  isLoggedIn: boolean;
}
export interface AuthActionsContextState {
  logout: () => void;
}
