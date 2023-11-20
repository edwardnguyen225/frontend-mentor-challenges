"use client";

import React, { useState } from "react";
import { getAllPlanetsColor } from "@/app/lib/planets";
import { Dialog, Popover } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { antonio } from "../lib/fonts";
import { useParams } from "next/navigation";

type Option = {
  name: string;
  href: string;
  color: string;
  isActive?: boolean;
};

const DesktopOption = ({ name, href, isActive, color }: Option) => {
  return (
    <Link
      href={href}
      className={clsx([
        "px-4 py-1",
        "flex justify-center items-center relative",
        "rounded",
        "text-[11px] font-semibold uppercase leading-[25px] tracking-[1px] hover:bg-[#38384F]",
        "hover:text-white",
        isActive && "text-white",
      ])}
    >
      {name}
      {isActive && (
        <span
          className="w-2 h-2 rounded absolute bottom-0"
          style={{
            background: color,
          }}
        />
      )}
    </Link>
  );
};

const MobileOption = ({ name, href, color }: Option) => {
  return (
    <div>
      <Link
        href={href}
        className={clsx([
          "px-3 py-4",
          "block rounded-lg text-[15px] uppercase font-bold leading-[25px] hover:bg-[#38384F]",
          "flex justify-between items-center",
        ])}
      >
        <span className="flex items-center gap-[25px]">
          <span
            className={`block w-5 h-5 rounded-xl`}
            style={{
              background: color,
            }}
          />
          <span>{name}</span>
        </span>
        <span>
          <ChevronRightIcon className="w-4 h-8 fill-white/40" />
        </span>
      </Link>
    </div>
  );
};

export default function Header() {
  const { planet: planetName } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const planetsColor = getAllPlanetsColor();

  const siteName = (
    <Link href="#">
      <span className={clsx(["uppercase text-[28px]", antonio.className])}>
        The planets
      </span>
    </Link>
  );

  // TODO: Show border for mobile open
  return (
    <header>
      <nav
        className={clsx([
          "mx-auto flex max-w-7xl items-center justify-between",
          "border-b border-b-white/20",
          "px-6 py-4",
          "md:pt-8 md:pb-5 md:flex md:flex-wrap md:gap-9 md:justify-center",
          "lg:px-8 lg:pt-5 lg:justify-between",
        ])}
        aria-label="Global"
      >
        <div className="flex md:flex-2 md:flex-shrink-0">{siteName}</div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" stroke="white" />
          </button>
        </div>
        <Popover.Group className="hidden md:flex md:text-white/75 lg:gap-x-2">
          {Object.entries(planetsColor).map(([name, color]) => (
            <DesktopOption
              key={name}
              isActive={planetName === name}
              name={name}
              href={name}
              color={color}
            />
          ))}
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#070724] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div
            className={clsx([
              "px-6 py-4",
              "flex items-center justify-between",
              "border-b border-b-white/20",
            ])}
          >
            {siteName}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-11 mx-6 flow-root">
            <div className="divide-y divide-solid divide-white/10">
              {Object.entries(planetsColor).map(([name, color]) => (
                <MobileOption
                  key={name}
                  name={name}
                  href={name}
                  color={color}
                />
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
