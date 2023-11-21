import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { INITIAL_STATE } from "./utils";
import { variant } from "./Input";
import { useLoginForm } from "./useLoginForm";
import { useRegistrationForm } from "./useRegistrationForm";

export const useAuthForm = () => {
  const [states, setStates] = useState(INITIAL_STATE);
  const router = useRouter();
  const login = useLoginForm(states, setStates, router);
  const register = useRegistrationForm(states, setStates, login);

  function formSwap() {
    setStates((previous) => ({
      ...previous,
      login: !previous.login,
      error: "",
    }));
  }
  function changeInput(event: ChangeEvent<HTMLInputElement>, type: variant) {
    setStates((previous) => ({ ...previous, [type]: event.target.value }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    states.login ? login() : register();
  }

  const handles = {
    formSwap,
    changeInput,
    submit,
  };

  return { handles, states };
};
