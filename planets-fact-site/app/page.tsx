"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import PlanetMercury from "@/public/assets/planet-mercury.svg";
import LinkIcon from "@/public/assets/external-link-square-with-an-arrow-in-right-diagonal.svg";
import { CardInformation, Header } from "@components";
import { PlanetInfoTypes, getPlanetInfo, PlanetNames } from "@lib/planets";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<PlanetInfoTypes>(
    PlanetInfoTypes.OVERVIEW
  );
  const planetInfo = getPlanetInfo(PlanetNames.MERCURY);

  if (!planetInfo) return;

  return (
    <>
      <Header />
      <main>
        <div className="text-sm font-medium text-center text-white/50 border-b border-white/50">
          <ul className="flex justify-between">
            {(Object.values(PlanetInfoTypes) as PlanetInfoTypes[]).map(
              (infoType) => (
                <Tab
                  key={infoType}
                  label={infoType}
                  isActive={activeTab === infoType}
                  href="#"
                  onClick={() => setActiveTab(infoType)}
                />
              )
            )}
          </ul>
        </div>
        <div className={clsx(["p-6", "flex flex-col items-center"])}>
          <div className="w-full min-w-[327px] h-full min-h-[327px] flex justify-center items-center">
            <Image
              src={PlanetMercury}
              alt="Planet Mercury"
              className="w-[30vw] h-auto max-w-[290px]"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2>{planetInfo.name}</h2>
            <p className="mt-4 w-80 text-center text-white text-[11px] leading-[22px]">
              {planetInfo[activeTab].content}
            </p>

            <div className="mt-8 flex gap-1 items-center text-white/50">
              <span>Source</span>
              <span>:</span>
              <Link
                href={planetInfo[activeTab].source}
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
            <CardInformation
              label="rotation time"
              value={planetInfo.rotation}
            />
            <CardInformation
              label="revolution time"
              value={planetInfo.revolution}
            />
            <CardInformation label="radius" value={planetInfo.radius} />
            <CardInformation
              label="average temp."
              value={planetInfo.temperature}
            />
          </div>
        </div>
      </main>
    </>
  );
}
