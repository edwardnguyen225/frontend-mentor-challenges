"use client";

import React, { useState } from "react";
import Header from "./header";
import clsx from "clsx";

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
      </main>
    </>
  );
}
