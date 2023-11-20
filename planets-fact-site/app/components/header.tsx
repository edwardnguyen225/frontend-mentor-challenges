import React, { useState } from "react";
import { getAllPlanetsColor } from "@/app/lib/planets";
import { Dialog, Popover } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
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
    <div>
      <Link
        href={path}
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
          "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8",
          "border-b border-b-white/20",
        ])}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">{siteName}</div>
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#070724] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div
            className={clsx([
              "p-6",
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
                <MobileOption key={name} name={name} path="#" color={color} />
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
