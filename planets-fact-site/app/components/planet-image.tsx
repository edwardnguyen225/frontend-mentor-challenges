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
        className="scale-50 md:scale-75 lg:scale-100"
      />
      {shouldShowGeology && (
        <Image
          src={getPlanetImage(planet, PlanetInfoTypes.SURFACE_GEOLOGY) ?? ""}
          alt={`${planet} image`}
          className="scale-50 md:scale-75 lg:scale-100 absolute left-1/2 top-[60%] translate-x-[-50%] md:translate-y-12 w-40"
        />
      )}
    </div>
  );
};

export default PlanetImage;
