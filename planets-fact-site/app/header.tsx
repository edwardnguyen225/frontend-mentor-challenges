"use client";

import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useState } from "react";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Planets = {
  mecury: {
    color: "#DEF4FC",
  },
  venus: {
    color: "#F7CC7F",
  },
  earth: {
    color: "#545BFE",
  },
  mars: {
    color: "#FF6A45",
  },
  jupiter: {
    color: "#ECAD7A",
  },
  saturn: {
    color: "#FCCB6B",
  },
  uranus: {
    color: "#65F0D5",
  },
  neptune: {
    color: "#497EFA",
  },
};

type Option = {
  name: string;
  path: string;
  color: string;
};

const DesktopOption = ({ name, path, color }: Option) => {
  return (
    <Link
      href={path}
      className={clsx(["text-sm font-semibold uppercase leading-6"])}
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
        "-mx-3 block rounded-lg px-3 py-2 text-[15px] uppercase font-bold leading-[25px] hover:bg-[#419EBB]",
        "flex gap-[25px] items-center",
      ])}
    >
      <span
        className={`block w-5 h-5 rounded-xl`}
        style={{
          background: color,
        }}
      />
      {name}
    </Link>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#070724]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="uppercase">The planets</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {Object.entries(Planets).map(([name, data]) => (
            <DesktopOption key={name} name={name} path="#" color={data.color} />
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
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {Object.entries(Planets).map(([name, data]) => (
                  <MobileOption
                    key={name}
                    name={name}
                    path="#"
                    color={data.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
