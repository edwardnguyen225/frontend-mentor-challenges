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
import Tabs from "./tabs";

const PlanetInfoPage = () => {
  const { planet } = useParams<{ planet: PlanetNames }>();
  const [activeTab, setActiveTab] = useState<PlanetInfoTypes>(
    PlanetInfoTypes.OVERVIEW
  );
  const planetInfo = getPlanetInfo(planet);

  if (!planetInfo) return;

  return (
    <>
      <Header />
      <main>
        <Tabs.Horizontal
          options={Object.values(PlanetInfoTypes)}
          activeOptions={activeTab}
          onOptionClick={(option) => setActiveTab(option as PlanetInfoTypes)}
          containerClassName="md:hidden"
        />
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
              <Tabs.Vertical
                options={Object.values(PlanetInfoTypes)}
                activeOptions={activeTab}
                onOptionClick={(option) =>
                  setActiveTab(option as PlanetInfoTypes)
                }
                containerClassName="hidden md:block flex-1 lg:mt-10"
              />
            </div>
          </div>
          <div
            className={clsx([
              "mt-7 w-full flex flex-col gap-2",
              "md:flex-row",
              "lg:mt-20",
            ])}
          >
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
};

export default PlanetInfoPage;
