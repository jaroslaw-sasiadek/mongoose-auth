import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Form } from "./_components";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Authorization() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <Form />;
}
