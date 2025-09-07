import React from 'react'
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  actionLabel: string;
  actionHref: string;
};

export default function Header({ actionLabel, actionHref }: HeaderProps) {
	 return (
    <header className="flex bg-white h-20 w-full max-w-full items-center justify-between p-12 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={120}
          height={40}
          priority
        />
      </Link>

      <Link
        href={actionHref}
        className="text-[#199BD7] no-underline visited:text-[#199BD7]
                   hover:text-[#0F6DA0] hover:underline underline-offset-2 decoration-2
                   transition-colors focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[#199BD7]/40 rounded-sm"
      >
        {actionLabel}
      </Link>
    </header>
  );
}