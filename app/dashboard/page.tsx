"use client";

import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-2 rounded-sm border-t-4 border-amber-400 p-5 shadow-lg">
      <h1 className="mb-2 text-xl font-bold">Dashboard</h1>
      <div>
        Name: <span className="font-bold">{session?.user?.name}</span>
      </div>
      <div>
        Email: <span className="font-bold">{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="mt-3 bg-amber-500 px-6 py-2 font-bold text-white"
      >
        Log Out
      </button>
    </div>
  );
}
