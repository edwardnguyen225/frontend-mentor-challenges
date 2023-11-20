"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import LinkIcon from "@/public/images/external-link-square-with-an-arrow-in-right-diagonal.svg";
import { CardInformation, Header } from "@components";
import { PlanetInfoTypes, getPlanetInfo, PlanetNames } from "@lib/planets";
import { useParams } from "next/navigation";
import PlanetImage from "./planet-image";

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <li className="me-2">
      <div
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
      </div>
    </li>
  );
};

export default function PlanetInfoPage() {
  const params = useParams();
  const planet = params.planet as PlanetNames;
  const [activeTab, setActiveTab] = useState<PlanetInfoTypes>(
    PlanetInfoTypes.OVERVIEW
  );
  const planetInfo = getPlanetInfo(planet);

  if (!planetInfo) return;

  const tabsControllerForMobile = (
    <div className="text-sm font-medium text-center text-white/50 border-b border-white/50 md:hidden">
      <ul className="flex justify-between">
        {(Object.values(PlanetInfoTypes) as PlanetInfoTypes[]).map(
          (infoType) => (
            <Tab
              key={infoType}
              label={infoType}
              isActive={activeTab === infoType}
              onClick={() => setActiveTab(infoType)}
            />
          )
        )}
      </ul>
    </div>
  );

  const additionalInfo = (
    <div
      className={clsx([
        "mt-7 w-full flex flex-col gap-2",
        "md:flex-row",
        "lg:mt-20",
      ])}
    >
      <CardInformation label="rotation time" value={planetInfo.rotation} />
      <CardInformation label="revolution time" value={planetInfo.revolution} />
      <CardInformation label="radius" value={planetInfo.radius} />
      <CardInformation label="average temp." value={planetInfo.temperature} />
    </div>
  );

  return (
    <>
      <Header />
      <main>
        {tabsControllerForMobile}
        <div
          className={clsx([
            "p-6",
            "md:px-10 md:py-9",
            "flex flex-col items-center",
          ])}
        >
          <div className="w-full lg:flex">
            <div className="w-full min-w-[327px] h-auto min-h-[327px] flex flex-1 justify-center items-center">
              <PlanetImage planet={planet} type={activeTab} />
            </div>
            <div className="w-full lg:w-[350px] min-h-[260px] flex flex-0 lg:flex-col">
              <div className="flex flex-col flex-1 items-center md:items-start">
                <h2>{planetInfo.name}</h2>
                <p className="mt-4 w-80 text-center md:text-left text-white text-[11px] leading-[22px] min-h-[132px]">
                  {planetInfo[activeTab].content}
                </p>
                <div className="mt-8 flex gap-1 items-center text-xs text-white/50 leading-6">
                  <span>Source</span>
                  <span>:</span>
                  <Link
                    href={planetInfo[activeTab].source}
                    className="font-bold flex gap-1 items-center hover:underline"
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
              <div className="hidden md:block flex-1 lg:mt-10">
                <ul className="w-full h-full flex flex-col justify-center items-end gap-4">
                  {(Object.values(PlanetInfoTypes) as PlanetInfoTypes[]).map(
                    (infoType, index) => (
                      <div
                        key={infoType}
                        className={clsx([
                          "min-w-[280px] h-12 lg:w-full",
                          "px-5 py-2",
                          "flex items-center gap-6",
                          "text-xs font-bold uppercase leading-[25px] tracking-[2.57px]",
                          "border hover:bg-[#D8D8D8]/20 hover:border-[#D8D8D8]/20",
                          infoType === activeTab
                            ? "bg-[#419EBB] border-[#419EBB]"
                            : "border-white/20",
                        ])}
                        onClick={() => setActiveTab(infoType)}
                      >
                        <span className="opacity-50">0{index + 1}</span>
                        {infoType}
                      </div>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          {additionalInfo}
        </div>
      </main>
    </>
  );
}
