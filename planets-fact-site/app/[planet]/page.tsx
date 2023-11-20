import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { PlanetInfoPage } from "@components";
import { PlanetNames } from "../lib/planets";

type Props = {
  params: { planet: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const planet = params.planet as PlanetNames;

  const capitalizedPlanet = planet.charAt(0).toUpperCase() + planet.slice(1);

  // TODO: Add open graph image
  return {
    title: "The Planets Fact - " + capitalizedPlanet,
  };
}

export default function Home() {
  return <PlanetInfoPage />;
}
