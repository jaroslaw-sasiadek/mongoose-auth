import { FormState } from "./utils";
import { Dispatch, SetStateAction } from "react";

export const useRegistrationForm = (
  states: FormState,
  setStates: Dispatch<SetStateAction<FormState>>,
  login: () => Promise<void>,
) => {
  return async function register() {
    if (!states.name || !states.email || !states.password) {
      return setStates((previous) => ({
        ...previous,
        error: "All fields are necessary.",
      }));
    }
    try {
      const responseUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: states.email }),
      });

      const { user } = await responseUserExists.json();

      if (user) {
        return setStates((previous) => ({
          ...previous,
          error: "User already exists.",
        }));
      }

      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: states.name,
          email: states.email,
          password: states.password,
        }),
      });

      if (response.ok) login();
      else throw new Error(`${response.status}: ${response.statusText}`);
    } catch (error) {
      console.log(error);
    }
  };
};
