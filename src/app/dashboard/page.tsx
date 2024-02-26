"use client";

import { useUserStore } from "@/state";
import { Text } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { use, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const code = params.get("code");
  const sessionToken = useUserStore((state: any) => state.sessionToken);
  const setSessionToken = useUserStore((state: any) => state.setSessionToken);
  const setRequestedTime = useUserStore(
    (state: any) => state.setSessionTokenRequestedTime
  );
  const userProfile = useUserStore((state: any) => state.userProfile);
  const setUserProfile = useUserStore((state: any) => state.setUserProfile);

  useEffect(() => {
    async function getSessionToken(code: string) {
      const sessionToken = await fetch(
        "https://api.line.me/oauth2/v2.1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/dashboard",
            client_id: process.env.NEXT_PUBLIC_LINE_LOGIN_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_LINE_LOGIN_SECRET!,
          }),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setSessionToken(sessionToken.access_token);
      setRequestedTime(new Date());
    }

    if (code && !sessionToken) {
      getSessionToken(code as string);
    }
    router.replace(pathname.split("?")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    async function getUserProfile(sessionToken: string) {
      const userProfile = await fetch("https://api.line.me/v2/profile", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setUserProfile(userProfile);
    }

    if (sessionToken && !userProfile) {
      getUserProfile(sessionToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  return <Text>Dashboard</Text>;
}
