import Link from "next/link";
import React from "react";

import { FaGithub } from "react-icons/fa";

const FooterLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Terms",
    href: "/terms",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
];

const Footer = () => {
  return (
    <footer className="flex h-16 items-center justify-between font-rubik text-sm md:sticky">
      <p className="">© THOCC</p>
      <div className="group flex items-center space-x-5">
        {FooterLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <a className="text-gray-300 transition-colors hover:!text-blue-400 group-hover:text-gray-500">
              {link.name}
            </a>
          </Link>
        ))}
        <Link href={"https://github.com/dougrocha/keyboardtracker"}>
          <a>
            <FaGithub className="h-6 w-6 transition-colors hover:fill-blue-500" />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
