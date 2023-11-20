import React from "react";
import Image from "next/image";
import { PlanetInfoTypes, PlanetNames, getPlanetImage } from "@lib/planets";

type Props = {
  planet: PlanetNames;
  type: PlanetInfoTypes;
};

const PlanetGeology = ({ planet }: Omit<Props, "type">) => (
  <div className="relative">
    <Image
      src={getPlanetImage(planet, PlanetInfoTypes.OVERVIEW) ?? ""}
      alt={`${planet} image`}
      className="w-[30vw] h-auto max-w-[290px]"
    />
    <Image
      src={getPlanetImage(planet, PlanetInfoTypes.SURFACE_GEOLOGY) ?? ""}
      alt={`${planet} image`}
      className="w-[163px] h-[199px] absolute left-[22.5%] -bottom-1/4"
    />
  </div>
);

const PlanetImage = ({ planet, type }: Props) =>
  type === PlanetInfoTypes.SURFACE_GEOLOGY ? (
    <PlanetGeology planet={planet} />
  ) : (
    <Image
      src={getPlanetImage(planet, type) ?? ""}
      alt="Planet Mercury"
      className="w-[30vw] h-auto max-w-[290px]"
    />
  );

export default PlanetImage;
