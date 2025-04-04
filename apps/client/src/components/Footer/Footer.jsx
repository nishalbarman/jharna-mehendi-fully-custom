import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { PiFacebookLogoBold } from "react-icons/pi";

import tree_leaf from "../../../public/bg.png";
import green_leaf_falling from "../../../public/green_leaf_falling.gif";

function Footer() {
  const webData = {};

  return (
    <div className="bg-primary relative">
      {/* Tree leaf image with pointer-events: none; */}
      <div className="h-full w-full absolute top-0 left-0 pointer-events-none">
        <Image
          className="select-none drag-none"
          src={tree_leaf}
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Green leaf falling image */}
      <div className="h-full absolute top-0 left-[45%] opacity-[0.1]">
        <Image
          className="select-none drag-none"
          src={green_leaf_falling}
          alt=""
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>

      <div className="flex flex-wrap justify-between gap-5 w-[100%] bg-black p-10 pl-[5%] pr-[5%] lg:pl-[10%] lg:pr-[10%] bg-primary">
        {/* Exclusive */}
        <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Exclusive
          </p>
          <div className="flex flex-col gap-4">
            {/* <p className=" font-andika text-white font-semibold mb-[10px]">
              Subscribe
            </p> */}
            <p className=" font-andika text-white text-sm">
              Get 10% of your first order
            </p>
            <div className="flex items-center pr-[15px] justify-between gap-1 w-full h-[45px] border-white border rounded-lg">
              <input
                placeholder="Enter your email"
                className="outline-none border-none pl-[15px] rounded-lg bg-[black] h-full w-fill placeholder:text-[#D9D9D9] text-white bg-primary"
              />
              <Image
                src="/assets/right-triangle.svg"
                width={20}
                height={20}
                alt="right arrow"
              />
            </div>
          </div>
        </div>

        {/* Supports */}
        <div className="lg:w-1/5 max-md:text-center max-md:border-t-1 max-md:border-t-[#e1e1e1] max-md:py-8 w-full flex flex-col items-center justify-start">
          <div>
            <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
              Support
            </p>
            {/* socials */}
            <div className="mb-5 max-md:text-center text-white">
              <div className="flex max-md:justify-center items-center gap-2 invert-[100%]">
                <a
                  className="h-10 w-10 bg-red-300 flex items-center justify-center rounded-full"
                  href={webData.WhatsAppLink}
                  target="_blank">
                  <FaWhatsapp color={"#FFFFFF"} size={22} />
                </a>
                <a
                  className="h-10 w-10 bg-red-300 flex items-center justify-center rounded-full"
                  href={`${webData.FacebookLink}`}
                  target="_blank">
                  <PiFacebookLogoBold color={"white"} size={23} />
                  {/* facebook */}
                </a>

                <a
                  className="h-10 w-10 bg-red-300 flex items-center justify-center rounded-full"
                  href={`${webData.InstagramLink}`}
                  target="_blank">
                  <FaInstagram color={"white"} size={22} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-md:text-center">
              <p className="text-white ">{webData.Address}</p>
              <p className="text-white">
                Vill./P.O. :- Bongsar Chariali/Sualkuchi, District :- Kamrup,
                Assam, 781***
              </p>

              <p className="text-white">
                <a href={`mailto:${webData.BrandEmail}`}>
                  {webData.BrandEmail}
                </a>
                <a href={`mailto:${webData.BrandEmail}`}>
                  thisisanemail@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* My accounts */}
        <div className="lg:w-1/6 w-full flex flex-col items-center justify-start">
          <div>
            <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
              Account
            </p>
            <div className="font-andika flex flex-col gap-[16px]">
              <p className="font-andika font-andika text-white">
                <Link href="/my-account">My Account</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href="/auth/login">Login / Register</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href="/cart">Cart</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href="/wishlist">Wishlist</Link>
              </p>
            </div>
          </div>
        </div>

        {/* quick links */}
        <div className="lg:w-1/5 w-full flex flex-col items-center justify-start">
          <div>
            <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
              Quick Link
            </p>
            <div className="font-andika flex flex-col gap-[16px]">
              <p className=" font-andika font-andika text-white">
                <Link href={"/dynamic/refund-policy"}>Refund Policy</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href={"/dynamic/privacy-policy"}>Privacy Policy</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href={"/dynamic/terms-and-conditions"}>Terms Of Use</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href={"/dynamic/faq"}>Faq</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href={"/dynamic/about"}>About Me</Link>
              </p>
              <p className=" font-andika font-andika text-white">
                <Link href={"/contact"}>Contact</Link>
              </p>
            </div>
          </div>
        </div>

        {/* credits links */}
        {/* <div>
          <p className=" font-andika text-white text-xl font-bold mt-[24px] mb-[24px]">
            Credits
          </p>
          <div className="font-andika flex flex-col gap-[16px]">
            <a
              className="font-andika font-andika text-white"
              target="_blank"
              href="https://www.flaticon.com/free-icons/tick"
              title="tick icons">
              Vectors Market - Flaticon
            </a>
            <p className="font-andika font-andika text-white">
              <a
                href="https://iconscout.com/icons/check"
                className="underline"
                target="_blank">
                check
              </a>{" "}
              by{" "}
              <a
                target="_blank"
                href="https://iconscout.com/contributors/google-inc"
                className="underline">
                Google Inc.
              </a>{" "}
              on{" "}
              <a
                target="_blank"
                href="https://iconscout.com"
                className="underline">
                IconScout
              </a>
            </p>
            <p className="font-andika font-andika text-white">
              <a
                href="https://iconscout.com/icons/cart"
                className="underline"
                target="_blank">
                Cart
              </a>{" "}
              by{" "}
              <a
                href="https://iconscout.com/contributors/google-inc"
                className="underline"
                target="_blank">
                Google Inc.
              </a>
            </p>
          </div>
        </div> */}
      </div>

      <div className="bg-[rgba(223,223,223,0.1)] mt-[3.5rem]  h-[1px] w-fill"></div>

      <div className="bg-white flex justify-center items-center">
        <div className="container px-5 py-7 mx-auto flex items-center sm:flex-row flex-col bg-white">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            {/* <span className="ml-3 text-xl">{webData.BrandName}</span> */}
            <span className="ml-3 text-xl font-marker ">{"JharnaMehendi"}</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 font-andika ">
            © {new Date().getFullYear()}{" "}
            {/* <Link href={`/`}>{webData.websiteUrl}</Link> */}
            <Link href={`/`}>NishaChar.in</Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <span className="text-black font-marker ">
              🧑‍💻 Made By{" "}
              <a
                title="Nishal Barman"
                href="https://nisha-char.web.app/"
                target="_blank"
                className="underline font-marker ">
                Nishachar
              </a>{" "}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
