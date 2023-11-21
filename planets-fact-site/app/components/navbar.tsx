"use client";

import React, { Fragment, PropsWithChildren, useState } from "react";
import { PlanetNames, getAllPlanetsColor } from "@/app/lib/planets";
import { Popover, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { antonio } from "../lib/fonts";
import { useParams } from "next/navigation";
import { usePopper } from "react-popper";

type Option = PropsWithChildren & {
  href: string;
  color: string;
  isActive?: boolean;
};

/**
 * For item on tablet and desktop
 */
const LinkItem = ({ href, isActive, color, children }: Option) => {
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
      {children}
      {isActive && (
        <span
          className="w-2/3 h-2 rounded absolute bottom-0"
          style={{
            background: color,
          }}
        />
      )}
    </Link>
  );
};

/**
 * For the menu on mobile
 */
const MenuItem = ({ href, color, children }: Option) => {
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
          <span>{children}</span>
        </span>
        <span>
          <ChevronRightIcon className="w-4 h-8 fill-white/40" />
        </span>
      </Link>
    </div>
  );
};

const MobileMenu = ({
  planetsColor,
  planetName,
}: {
  planetName: PlanetNames;
  planetsColor: Record<PlanetNames, string>;
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className={clsx([
              open ? "bg-white/20" : "hover:bg-white/20",
              "group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75",
            ])}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" stroke="white" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="absolute z-10 mt-5 px-6 py-11 w-screen bg-[#070724]"
            >
              <div className="relative divide-y divide-solid divide-white/10">
                {Object.entries(planetsColor).map(([name, color]) => (
                  <MenuItem
                    key={name}
                    isActive={planetName === name}
                    href={name}
                    color={color}
                  >
                    {name}
                  </MenuItem>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Navbar = () => {
  const params = useParams();
  const planetName = params.planet as PlanetNames;
  const planetsColor = getAllPlanetsColor();

  const siteName = (
    <Link href="#">
      <span className={clsx(["uppercase text-[28px]", antonio.className])}>
        The planets
      </span>
    </Link>
  );

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
        <div className="hidden md:flex md:text-white/75 lg:gap-x-2">
          {Object.entries(planetsColor).map(([name, color]) => (
            <LinkItem
              key={name}
              isActive={planetName === name}
              href={name}
              color={color}
            >
              {name}
            </LinkItem>
          ))}
        </div>
        <div className="md:hidden">
          <MobileMenu planetsColor={planetsColor} planetName={planetName} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
