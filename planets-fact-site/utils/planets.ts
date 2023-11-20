import PlanetsData from "./data.json";

export enum PlanetNames {
  MERCURY = "Mercury",
  VENUS = "Venus",
  EARTH = "Earth",
  MARS = "Mars",
  JUPITER = "Jupiter",
  SATURN = "Saturn",
  URANUS = "Uranus",
  NEPTUNE = "Neptune",
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
    planet: string;
    internal: string;
    geology: string;
  };
  color?: string;
};

const planets = new Map<PlanetNames, PlanetInfo>();
PlanetsData.forEach((data) => {
  const name = data.name as unknown as PlanetNames;
  const color = PlanetsColorMap[name];
  planets.set(name, {
    ...data,
    name,
    color,
    [PlanetInfoTypes.OVERVIEW]: data.overview,
    [PlanetInfoTypes.INTERNAL_STRUCTURE]: data.structure,
    [PlanetInfoTypes.SURFACE_GEOLOGY]: data.geology,
  });
});

export const getPlanetInfo = (name: PlanetNames) => planets.get(name);

export const getAllPlanetsColor = () => PlanetsColorMap;
