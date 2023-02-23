import React from "react";
import { Vertex } from "../Data-Structures/VertexClass";

function EdgeVisualisation({
  vert1,
  vert2,
  index,
  vertices,
  objectRemovalEvent,
  edgeRemovalCallback,
}: {
  vert1: Vertex<string>;
  vert2: Vertex<string>;
  index: number;
  vertices: Map<string, { x: number; y: number }>;
  objectRemovalEvent: boolean;
  edgeRemovalCallback: (
    vertex1: Vertex<string>,
    vertex2: Vertex<string>
  ) => void;
}) {
  const vertHeight =
    (document.getElementById(vert1.value)?.offsetHeight as number) / 2;
  const vertWidth =
    (document.getElementById(vert1.value)?.offsetWidth as number) / 2;
  return (
    <>
      {vert1 !== vert2 ? (
        <line
          onClick={() => {
            objectRemovalEvent ? edgeRemovalCallback(vert1, vert2) : undefined;
          }}
          key={`edge${index}`}
          x1={
            (vertices.get(vert1.value)?.x as number) +
            (document.getElementById(vert1.value)?.offsetWidth as number) / 2
          }
          y1={
            (vertices.get(vert1.value)?.y as number) +
            (document.getElementById(vert1.value)?.offsetHeight as number) / 2
          }
          x2={
            (vertices.get(vert2.value)?.x as number) +
            (document.getElementById(vert1.value)?.offsetWidth as number) / 2
          }
          y2={
            (vertices.get(vert2.value)?.y as number) +
            (document.getElementById(vert1.value)?.offsetHeight as number) / 2
          }
          className={`stroke-[10] stroke-white ${
            objectRemovalEvent ? "hover:stroke-red-300" : ""
          }`}
        />
      ) : (
        <circle
          cx={(vertices.get(vert1.value)?.x as number) - vertWidth / 2}
          cy={vertices.get(vert1.value)?.y as number}
          onClick={() => {
            objectRemovalEvent ? edgeRemovalCallback(vert1, vert2) : undefined;
          }}
          r={vertHeight * 2}
          className={`stroke-[10] stroke-white fill-transparent ${
            objectRemovalEvent ? "hover:stroke-red-300" : ""
          }`}
        />
      )}
    </>
  );
}

export default EdgeVisualisation;
