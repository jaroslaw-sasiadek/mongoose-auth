"use client";

import { Input } from "./Input";
import { useAuthForm } from "./useAuthForm";

export function Form() {
  const { handles, states } = useAuthForm();

  return (
    <label className="rounded-sm border-t-4 border-green-500 p-5 shadow-lg">
      <h1 className="mb-4 text-xl font-bold">
        {states.login ? "Login" : "Register"}
      </h1>
      <form onSubmit={handles.submit} className="flex flex-col gap-3">
        <Input config={["name", handles.changeInput]} hidden={states.login} />
        <Input config={["email", handles.changeInput]} />
        <Input config={["password", handles.changeInput]} />
        <button
          type="submit"
          className="cursor-pointer rounded-sm bg-green-600 px-6 py-2 font-bold text-white transition hover:bg-green-500"
        >
          {states.login ? "Login" : "Register"}
        </button>
        {states.error && (
          <div className="rounded-sm bg-red-500 px-3 py-1 text-sm text-white">
            {states.error}
          </div>
        )}
      </form>
      <p className="mt-3 text-sm">
        {states.login ? "Don't have an account yet? " : "Already a user? "}
        <button type="button" className="underline" onClick={handles.formSwap}>
          {states.login ? "Register" : "Login"}
        </button>
      </p>
    </label>
  );
}
