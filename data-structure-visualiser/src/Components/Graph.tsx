import React, { useEffect, useState } from "react";
import { Graph } from "../Data-Structures/GraphClass";
import { Vertex } from "../Data-Structures/VertexClass";
import VertexVisualisation from "./Vertex";
function GraphVisualisation() {
  const [graph, setGraph] = useState(new Graph());
  const [vertices, setVertices] = useState<Map<string, { x: number, y: number }>>(new Map());
  const [addEdgeMode, setAddEdgeMode] = useState<boolean>(false);
  const [firstSelectedVertex, setFirstSelectedVertex] = useState<
    Vertex<string> | undefined
  >(undefined);
  const [secondSelectedVertex, setSecondSelectedVertex] = useState<
    Vertex<string> | undefined
  >(undefined);
  const [vertexInput, setVertexInput] = useState<string>("");

  const refreshSelected = () => {
    setFirstSelectedVertex(undefined);
    setSecondSelectedVertex(undefined);
  };

  const handleVertexAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const vertex = new Vertex(
      vertexInput,
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 100)
    );
    console.log(vertex);
    graph.addVertex(vertex);
    setVertices((vertices) => {
      const newVertices = new Map(vertices)
      newVertices.set(vertexInput, {x:vertex.x, y:vertex.y})
      return newVertices
    })
    setVertexInput("");
  };

  function handleVertexMove(vertex: Vertex<string>, x: number, y: number) {
    setVertices((vertices) => {
      const newVertices = new Map(vertices);
      newVertices.set(vertex.value, { x, y });
      return newVertices;
    });
  }

  const handleSelectEdgeEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedDiv = event.target as HTMLDivElement;
    const clickedDivId = clickedDiv.id;
    console.log(clickedDivId);
    if (
      [...graph.adjacencyList.keys()]
        .map((vertex) => {
          return vertex.value;
        })
        .includes(clickedDivId)
    ) {
      setFirstSelectedVertex(graph.getVertexById(clickedDivId));
    }
    if (firstSelectedVertex) {
      if (
        [...graph.adjacencyList.keys()]
          .map((vertex) => {
            return vertex.value;
          })
          .includes(clickedDivId)
      ) {
        graph.addEdge(
          firstSelectedVertex,
          graph.getVertexById(clickedDivId) as Vertex<string>
        );
        refreshSelected();
        setAddEdgeMode(false);
      }
    }
  };

  useEffect(() => {
    console.log(graph.getEdges());
  });

  return (
    <div className="w-full h-full">
      <div>
        <form onSubmit={handleVertexAdd}>
          <input
            className="w-[10rem] bg-white text-zinc-900"
            onChange={(e) => {
              setVertexInput(e.target.value);
            }}
            value={vertexInput}
          />
          <button type="submit">Submit</button>
        </form>
        {addEdgeMode ? (
          <button
            className="rounded-md border bg-zinc-200 text-zinc-900"
            onClick={() => {
              setAddEdgeMode(false);
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="rounded-md border bg-zinc-300 text-zinc-900"
            onClick={() => {
              refreshSelected();
              setAddEdgeMode(true);
            }}
          >
            Add Edge
          </button>
        )}
      </div>
      <div
        className="w-full h-[40rem] bg-zinc-600 bg-opacity-40 relative"
        onClick={addEdgeMode ? handleSelectEdgeEvent : undefined}
        id="graph-container"
      >
        {[...graph.adjacencyList.keys()].map((vertex) => {
          return (
            <VertexVisualisation
              vertex={vertex}
              key={vertex.value}
              onMove={handleVertexMove}
            />
          );
        })}
        <svg
          viewBox={`0 0 ${
            document.getElementById("graph-container")?.offsetWidth
          } ${document.getElementById("graph-container")?.offsetHeight}`}
        >
          {graph.getEdges().map((vertArr: [Vertex<string>, Vertex<string>]) => {
            const vert1 = vertArr[0];
            const vert2 = vertArr[1];
            return (
              <line
                x1={(vertices.get(vert1.value)?.x as number) + (document.getElementById(vert1.value)?.offsetWidth as number)/2}
                y1={(vertices.get(vert1.value)?.y as number) +(document.getElementById(vert1.value)?.offsetHeight as number)/2}
                x2={(vertices.get(vert2.value)?.x as number) + (document.getElementById(vert1.value)?.offsetWidth as number)/2}
                y2={(vertices.get(vert2.value)?.y as number) + (document.getElementById(vert1.value)?.offsetHeight as number)/2}
                strokeWidth = "10"
                stroke="white"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default GraphVisualisation;
