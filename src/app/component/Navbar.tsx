"use client";
import Image from "next/image";
import LOGO from "../../LOGO.png";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={LOGO}
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full transition-transform duration-300 group-hover:scale-110"
            priority
          />
          
        </Link>


        <div className="flex items-center gap-6 text-gray-300 text-xl">
        
          <a
            href="https://www.linkedin.com/in/ajay-joseph-077444313/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-125 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ajayjoseph-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 hover:scale-125 transition duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
}
