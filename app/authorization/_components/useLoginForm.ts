import { signIn } from "next-auth/react";

import { FormState } from "./utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useLoginForm = (
  states: FormState,
  setStates: React.Dispatch<React.SetStateAction<FormState>>,
  router: AppRouterInstance,
) => {
  return async function login() {
    try {
      const response = await signIn("credentials", {
        email: states.email,
        password: states.password,
        redirect: false,
      });
      response?.error
        ? setStates((previous) => ({
            ...previous,
            error: "Invalid Credentials",
          }))
        : router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
};
