import PlanetsData from "./data.json";

import mercuryPlanet from "@/public/images/planet-mercury.svg";
import mercuryInternal from "@/public/images/planet-mercury-internal.svg";
import mercuryGeology from "@/public/images/geology-mercury.png";

import venusPlanet from "@/public/images/planet-venus.svg";
import venusInternal from "@/public/images/planet-venus-internal.svg";
import venusGeology from "@/public/images/geology-venus.png";

import earthPlanet from "@/public/images/planet-earth.svg";
import earthInternal from "@/public/images/planet-earth-internal.svg";
import earthGeology from "@/public/images/geology-earth.png";

import marsPlanet from "@/public/images/planet-mars.svg";
import marsInternal from "@/public/images/planet-mars-internal.svg";
import marsGeology from "@/public/images/geology-mars.png";

import jupiterPlanet from "@/public/images/planet-jupiter.svg";
import jupiterInternal from "@/public/images/planet-jupiter-internal.svg";
import jupiterGeology from "@/public/images/geology-jupiter.png";

import saturnPlanet from "@/public/images/planet-saturn.svg";
import saturnInternal from "@/public/images/planet-saturn-internal.svg";
import saturnGeology from "@/public/images/geology-saturn.png";

import uranusPlanet from "@/public/images/planet-uranus.svg";
import uranusInternal from "@/public/images/planet-uranus-internal.svg";
import uranusGeology from "@/public/images/geology-uranus.png";

import neptunePlanet from "@/public/images/planet-neptune.svg";
import neptuneInternal from "@/public/images/planet-neptune-internal.svg";
import neptuneGeology from "@/public/images/geology-neptune.png";
import { StaticImageData } from "next/image";

export enum PlanetNames {
  MERCURY = "mercury",
  VENUS = "venus",
  EARTH = "earth",
  MARS = "mars",
  JUPITER = "jupiter",
  SATURN = "saturn",
  URANUS = "uranus",
  NEPTUNE = "neptune",
}

const PlanetsColorMap: Record<PlanetNames, string> = {
  [PlanetNames.MERCURY]: "#DEF4FC",
  [PlanetNames.VENUS]: "#F7CC7F",
  [PlanetNames.EARTH]: "#545BFE",
  [PlanetNames.MARS]: "#FF6A45",
  [PlanetNames.JUPITER]: "#ECAD7A",
  [PlanetNames.SATURN]: "#FCCB6B",
  [PlanetNames.URANUS]: "#65F0D5",
  [PlanetNames.NEPTUNE]: "#497EFA",
};

export type PlanetImageType = "planet" | "internal" | "geology";

const PlanetsImageMap: Record<
  PlanetNames,
  {
    planet: StaticImageData;
    internal: StaticImageData;
    geology: StaticImageData;
  }
> = {
  [PlanetNames.MERCURY]: {
    planet: mercuryPlanet,
    internal: mercuryInternal,
    geology: mercuryGeology,
  },
  [PlanetNames.VENUS]: {
    planet: venusPlanet,
    internal: venusInternal,
    geology: venusGeology,
  },
  [PlanetNames.EARTH]: {
    planet: earthPlanet,
    internal: earthInternal,
    geology: earthGeology,
  },
  [PlanetNames.MARS]: {
    planet: marsPlanet,
    internal: marsInternal,
    geology: marsGeology,
  },
  [PlanetNames.JUPITER]: {
    planet: jupiterPlanet,
    internal: jupiterInternal,
    geology: jupiterGeology,
  },
  [PlanetNames.SATURN]: {
    planet: saturnPlanet,
    internal: saturnInternal,
    geology: saturnGeology,
  },
  [PlanetNames.URANUS]: {
    planet: uranusPlanet,
    internal: uranusInternal,
    geology: uranusGeology,
  },
  [PlanetNames.NEPTUNE]: {
    planet: neptunePlanet,
    internal: neptuneInternal,
    geology: neptuneGeology,
  },
};

export enum PlanetInfoTypes {
  OVERVIEW = "overview",
  INTERNAL_STRUCTURE = "structure",
  SURFACE_GEOLOGY = "surface",
}

type PlanetInfoTypeData = {
  content: string;
  source: string;
};

type PlanetInfo = {
  name: PlanetNames;
  [PlanetInfoTypes.OVERVIEW]: PlanetInfoTypeData;
  [PlanetInfoTypes.INTERNAL_STRUCTURE]: PlanetInfoTypeData;
  [PlanetInfoTypes.SURFACE_GEOLOGY]: PlanetInfoTypeData;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: StaticImageData;
    internal: StaticImageData;
    geology: StaticImageData;
  };
  color?: string;
};

const planets = new Map<PlanetNames, PlanetInfo>();
PlanetsData.forEach((data) => {
  const name = data.name.toLowerCase() as unknown as PlanetNames;
  const color = PlanetsColorMap[name];
  planets.set(name, {
    ...data,
    name,
    color,
    [PlanetInfoTypes.OVERVIEW]: data.overview,
    [PlanetInfoTypes.INTERNAL_STRUCTURE]: data.structure,
    [PlanetInfoTypes.SURFACE_GEOLOGY]: data.geology,
    images: PlanetsImageMap[name],
  });
});

export const getPlanetInfo = (name: PlanetNames) => planets.get(name);

export const getAllPlanetsColor = () => PlanetsColorMap;

const convertStringToNumber = (str: string) => {
  const number = Number(str.replace(/[^0-9]/g, ""));
  return number;
};

const biggestPlanetRadius = Math.max(
  ...Array.from(planets.values()).map((planet) =>
    convertStringToNumber(planet.radius)
  )
);

export const compareRadiusWithBiggestPlanet = (planetName: PlanetNames) => {
  const planetRadius = convertStringToNumber(
    planets.get(planetName)?.radius || "0"
  );
  return planetRadius / biggestPlanetRadius;
};

const MapPlanetInfoTypesToImageName = {
  [PlanetInfoTypes.OVERVIEW]: "planet",
  [PlanetInfoTypes.SURFACE_GEOLOGY]: "geology",
  [PlanetInfoTypes.INTERNAL_STRUCTURE]: "internal",
};

export const getPlanetImage = (name: PlanetNames, type: PlanetInfoTypes) => {
  const key = MapPlanetInfoTypesToImageName[type] as PlanetImageType;
  return planets.get(name)?.images[key];
};
