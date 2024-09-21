import Signin from "@/components/auth/Signin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function login() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session.status);

    if (session.status == "authenticated") {
      router.push("/");
    }
  }, [session.status]);

  return (
    <div>
      <Signin />
    </div>
  );
}

export default login;
