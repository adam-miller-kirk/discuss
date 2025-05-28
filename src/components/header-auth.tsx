"use client";

import {
  Button,
  Avatar,
  NavbarItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import React from "react";
import { signIn, signOut } from "@/actions";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <form action={signOut}>
                <Button type="submit" color="secondary" variant="bordered">
                  Sign Out
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <NavbarItem>
        <form action={signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In / Up
          </Button>
        </form>
      </NavbarItem>
    );
  }

  return authContent;
}
