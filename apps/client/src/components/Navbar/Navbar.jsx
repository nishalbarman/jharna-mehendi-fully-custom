import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import NavbarPartNonLogged from "./NavbarPartNonLogged";

async function Navbar({ title }) {
  const links = [
    {
      title: "Home",
      description: "Home screen, explore products",
      path: "/",
    },
    {
      title: "Contact",
      description: "Contact us page",
      path: "/",
    },
    {
      title: "About",
      description: "About Us page",
      path: "/",
    },
    {
      title: "Sign Up",
      description: "SignUp page",
      path: "/",
    },
  ];

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token from Navbar function", token);

  return (
    <div className="flex w-full border-[rgb(0,0,0,0.1)] border-b-[1px] justify-between h-[80px] max-md:h-[66px] lg:pl-[10%] lg:pr-[10%] pl-[3%] pr-[3%] bg-primary">
      <Link href={"/"} className="flex flex-center items-center w-fit">
        <img
          src="https://i.ibb.co/S7wS79F3/d24a3ddf1d51.png"
          className="w-14 mr-3 max-sm:h-10 max-sm:w-10"
        />
        <span className="max-sm:font-inconsolata font-marker text-2xl uppercase font-bold text-black max-md:hidden">
          <span
            className="max-sm:font-inconsolata font-marker text-2xl uppercase font-bold text-white"
            // href={"/"}
            >
            {title}
          </span>
        </span>
      </Link>
      {/* <div className="hidden min-[1168px]:flex flex-center gap-5 items-center">
        {links.map((item, index) => {
          return (
            <Link key={index} className="text-xl font-marker" href={item.path}>
              {item.title}
            </Link>
          );
        })}
      </div> */}
      <NavbarPartNonLogged />
    </div>
  );
}

export default Navbar;
