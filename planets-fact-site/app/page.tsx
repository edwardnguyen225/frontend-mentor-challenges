"use client";

import React, { useState } from "react";
import Header from "./header";
import clsx from "clsx";
import Image from "next/image";

import PlanetMecury from "./../public/assets/planet-mercury.svg";
import LinkIcon from "./../public/assets/external-link-square-with-an-arrow-in-right-diagonal.svg";
import Link from "next/link";
import { antonio } from "./fonts";

enum PlanetInfoType {
  Overview = "Overview",
  Structure = "Structure",
  Surface = "Surface",
}

const Tab = ({
  label,
  isActive,
  href,
  onClick,
}: {
  label: string;
  isActive: boolean;
  href: string;
  onClick: () => void;
}) => {
  return (
    <li className="me-2">
      <a
        href={href}
        className={clsx([
          "flex-grow",
          "uppercase text-[9px] font-bold tracking-widest",
          "inline-block p-4 border-b-2 rounded-t-lg",
          isActive && "text-white",
          isActive ? "border-b-4 border-[#419EBB]" : "border-transparent",
          "hover:text-white hover:bg-[#38384F]",
        ])}
        aria-current={isActive ? "page" : false}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
};

const CardInformation = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div
      className={clsx([
        "px-6 py-3 w-full",
        "flex items-center justify-between",
        "border border-[#38384F]",
        "uppercase",
      ])}
    >
      <span className="text-white/50 text-[8px] font-bold leading-none tracking-wide">
        {label}
      </span>
      <span className={clsx(["text-xl", antonio.variable])}>{value}</span>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<PlanetInfoType>(
    PlanetInfoType.Overview,
  );

  return (
    <>
      <Header />
      <main>
        <div className="text-sm font-medium text-center text-white/50 border-b border-white/50">
          <ul className="flex justify-between">
            {(Object.keys(PlanetInfoType) as Array<PlanetInfoType>).map(
              (infoType) => (
                <Tab
                  key={infoType}
                  label={infoType}
                  isActive={activeTab === infoType}
                  href="#"
                  onClick={() => setActiveTab(infoType)}
                />
              ),
            )}
          </ul>
        </div>
        <div className={clsx(["p-6", "flex flex-col items-center"])}>
          <Image
            src={PlanetMecury}
            alt="Planet Mecury"
            className="w-[30vw] h-auto max-w-[290px]"
          />
          <div className="flex flex-col items-center">
            <h2>Mecury</h2>
            <p className="mt-4 w-80 text-center text-white text-[11px] leading-[22px]">
              Mercury is the smallest planet in the Solar System and the closest
              to the Sun. Its orbit around the Sun takes 87.97 Earth days, the
              shortest of all the Sun&apos;s planets. Mercury is one of four
              terrestrial planets in the Solar System, and is a rocky body like
              Earth.
            </p>

            <div className="mt-8 flex gap-1 items-center text-white/50">
              <span>Source</span>
              <span>:</span>
              <Link
                href="https://en.wikipedia.org/wiki/Mercury_(planet)"
                className="font-bold flex gap-1 hover:underline"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Wikipedia
                <Image
                  src={LinkIcon}
                  alt="Wikipedia Link Icon"
                  className="w-3 h-3"
                />
              </Link>
            </div>
          </div>
          <div className="mt-7 w-full flex flex-col gap-2">
            <CardInformation label="rotation time" value="58.6 days" />
            <CardInformation label="revolution time" value="87.97 days" />
            <CardInformation label="radius" value="2,439.7 km" />
            <CardInformation label="average temp." value="430°c" />
          </div>
        </div>
      </main>
    </>
  );
}
