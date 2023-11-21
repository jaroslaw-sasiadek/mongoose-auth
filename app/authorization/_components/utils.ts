export interface FormState {
  login: boolean;
  name: string;
  email: string;
  password: string;
  error: string;
}

export const INITIAL_STATE: FormState = {
  login: true,
  name: "",
  email: "",
  password: "",
  error: "",
};
