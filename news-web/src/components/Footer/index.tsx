import React from 'react'

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	 return (
    <footer className="mt-12 w-full bg-white border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-8 md:flex md:items-center md:justify-between">
        {/* Logo + Copyright */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={100}
            height={32}
          />
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Athos Alexandre — Todos os direitos reservados
          </p>
        </div>

        {/* Social icons */}
        <div className="mt-4 flex justify-center gap-6 md:mt-0">
          <Link
            href="#"
            className="text-gray-500 transition hover:text-[#199BD7]"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0 5.7 0 4.7.2 3.9.5c-.9.3-1.6.7-2.3 1.4C.8 2.6.4 3.3.1 4.2.2 5 0 6 .1 7.3 0 8.7 0 9.1 0 12s0 3.3.1 4.7c.1 1.3.3 2.3.6 3.1.3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.8.5 3.1.6 1.4.1 1.8.1 4.7.1s3.3 0 4.7-.1c1.3-.1 2.3-.3 3.1-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.8.6-3.1.1-1.4.1-1.8.1-4.7s0-3.3-.1-4.7c-.1-1.3-.3-2.3-.6-3.1-.3-.9-.7-1.6-1.4-2.3-.7-.7-1.4-1.1-2.3-1.4-.8-.3-1.8-.5-3.1-.6C15.3 0 14.9 0 12 0z" />
              <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8m0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
              <circle cx="18.4" cy="5.6" r="1.4" />
            </svg>
          </Link>

          <Link
            href="#"
            className="text-gray-500 transition hover:text-[#199BD7]"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.61 2 3.61 4.65v5.53z" />
            </svg>
          </Link>

          <Link
            href="#"
            className="text-gray-500 transition hover:text-[#199BD7]"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M22.676 0H1.326C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.326 24h11.495v-9.294H9.692V11.41h3.129V8.691c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.296h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.676 0" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
