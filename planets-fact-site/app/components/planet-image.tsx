import React from "react";
import Image from "next/image";
import { PlanetInfoTypes, PlanetNames, getPlanetImage } from "@lib/planets";

type Props = {
  planet: PlanetNames;
  type: PlanetInfoTypes;
};

const PlanetImage = ({ planet, type }: Props) => {
  const shouldShowGeology = type === PlanetInfoTypes.SURFACE_GEOLOGY;
  const imageType =
    type === PlanetInfoTypes.INTERNAL_STRUCTURE
      ? PlanetInfoTypes.INTERNAL_STRUCTURE
      : PlanetInfoTypes.OVERVIEW;

  return (
    <div className="relative">
      <Image
        src={getPlanetImage(planet, imageType) ?? ""}
        alt={`${planet} image`}
        className="w-[30vw] h-auto max-w-[290px]"
      />
      {shouldShowGeology && (
        <Image
          src={getPlanetImage(planet, PlanetInfoTypes.SURFACE_GEOLOGY) ?? ""}
          alt={`${planet} image`}
          className="w-1/2 h-auto absolute translate-x-1/2 -translate-y-[45%]"
        />
      )}
    </div>
  );
};

export default PlanetImage;
