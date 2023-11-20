"use client";

import { getAllPlanetsColor } from "@/app/lib/planets";
import { Dialog, Popover } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { antonio } from "../lib/fonts";

type Option = {
  name: string;
  path: string;
  color: string;
};

const DesktopOption = ({ name, path }: Option) => {
  return (
    <Link
      href={path}
      className={clsx([
        "px-4 py-1",
        "flex justify-center items-center",
        "rounded",
        "text-sm font-semibold uppercase leading-6 hover:bg-[#38384F]",
      ])}
    >
      {name}
    </Link>
  );
};

const MobileOption = ({ name, path, color }: Option) => {
  return (
    <Link
      href={path}
      className={clsx([
        "-mx-3 block rounded-lg px-3 py-2 text-[15px] uppercase font-bold leading-[25px] hover:bg-[#38384F]",
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
        {name}
      </span>
      <span>
        <ChevronRightIcon className="w-4 h-8" stroke="white" />
      </span>
    </Link>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const planetsColor = getAllPlanetsColor();

  // TODO: Show border for mobile open
  return (
    <header className="bg-[#070724] border-b-[1px] border-b-white/20">
      <nav
        className={clsx([
          "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
        ])}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#">
            <span
              className={clsx(["uppercase text-[28px]", antonio.className])}
            >
              The planets
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" stroke="white" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-2">
          {Object.entries(planetsColor).map(([name, color]) => (
            <DesktopOption key={name} name={name} path="#" color={color} />
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#070724] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="uppercase">The Planets</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {Object.entries(planetsColor).map(([name, color]) => (
                  <MobileOption key={name} name={name} path="#" color={color} />
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
