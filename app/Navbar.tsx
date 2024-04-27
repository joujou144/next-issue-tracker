"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PiBugDroidFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();

  const { data: session, status } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className=" border-b mb-5 p-5">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
            <Link href="/">
              <PiBugDroidFill size={25} />
            </Link>
            <ul className="flex items-center gap-6 ">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={classnames({
                      "text-stone-900": href === currentPath,
                      "text-stone-500": href !== currentPath,
                      "hover:text-stone-700 transition-colors": true,
                    })}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
