import React, { useEffect, useState } from "react";
import { Edge } from "../Data-Structures/EdgeClass";
import { Graph } from "../Data-Structures/GraphClass";
import { Vertex } from "../Data-Structures/VertexClass";
import EdgeVisualisation from "./Edge";
import VertexVisualisation from "./Vertex";
function GraphVisualisation() {
  const [graph, setGraph] = useState(new Graph());
  const [vertexCount, setVertexCount] = useState<number>(1);
  const [edgeCount, setEdgeCount] = useState<number>(0);
  const [vertices, setVertices] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const [message, setMessage] = useState<string>(
    "Press the 'Add Vertex' button to start adding vertices to the graph "
  );
  const [addEdgeMode, setAddEdgeMode] = useState<boolean>(false);
  const [addVertexMode, setAddVertexMode] = useState<boolean>(false);
  const [removeObjectMode, setRemoveObjectMode] = useState<boolean>(false);
  const [edgeVertexSelect, setEdgeVertexSelect] = useState<
    Vertex<string> | undefined
  >(undefined);

  const refreshSelected = () => {
    setEdgeVertexSelect(undefined);
  };

  const refreshSetActions = () => {
    setAddEdgeMode(false);
    setAddVertexMode(false);
    setRemoveObjectMode(false);
    setMessage("");
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
      (document.getElementById(clickedDivId) as HTMLElement).classList.add(
        "bg-yellow-300"
      );
      setEdgeVertexSelect(graph.getVertexById(clickedDivId));
      setMessage("Select the second vertex");
    }
    if (edgeVertexSelect) {
      if (
        [...graph.adjacencyList.keys()]
          .map((vertex) => {
            return vertex.value;
          })
          .includes(clickedDivId)
      ) {
        graph.addEdge(
          edgeVertexSelect,
          graph.getVertexById(clickedDivId) as Vertex<string>,
          0,
          false
        );
        setEdgeCount(graph.getEdges().length);
        (
          document.getElementById(edgeVertexSelect.value) as HTMLElement
        ).classList.remove("bg-yellow-300");
        (document.getElementById(clickedDivId) as HTMLElement).classList.remove(
          "bg-yellow-300"
        );
        refreshSelected();
        setMessage("Select the first vertex");
      }
    }
  };

  const handleClearAll = () => {
    graph.clearAll();
    setVertexCount(1);
    setVertices(new Map());
    refreshSetActions();
  };

  const handleAddVerticeEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.clientX);
    console.log(event.clientY);
    const newVertex = new Vertex(
      vertexCount.toString(),
      event.clientX - 100,
      event.clientY - 175
    );
    graph.addVertex(newVertex);
    setVertices((vertices) => {
      const newVertices = new Map(vertices);
      newVertices.set(newVertex.value, { x: newVertex.x, y: newVertex.y });
      return newVertices;
    });
    setVertexCount((prev) => {
      return prev + 1;
    });
  };

  const handleEdgeRemovalEvent = (
    edge: Edge<string>
  ) => {
    if(edge.directed){

      graph.removeEdge(edge.vertex1, edge.vertex2);
    }
    else{
      graph.removeEdge(edge.vertex1,edge.vertex2)
      graph.removeEdge(edge.vertex2,edge.vertex1)
    }
    
    setEdgeCount(graph.getEdges().length);
  };

  const handleVertexRemovalEvent = (vertex: Vertex<string>) => {
    graph.removeVertex(vertex);
    setVertices((vertices) => {
      const newVertices = new Map(vertices);
      newVertices.delete(vertex.value);
      return newVertices;
    });
  };

  useEffect(() => {
    console.log(graph.getEdges());
    console.log(graph.getAdjacencyList());
  });

  return (
    <div className="w-screen h-full">
      <div className="flex justify-center pt-2">
        <div className=" w-[110rem] flex items-center">
          {addVertexMode ? (
            <button
              className="button bg-red-300"
              onClick={() => {
                setAddVertexMode(false);
                setMessage("");
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                refreshSetActions();
                setAddVertexMode(true);
                setMessage("Click on the workspace to create a new Vertex");
              }}
              className="button"
            >
              Add Vertex
            </button>
          )}
          {addEdgeMode ? (
            <button
              className="button bg-red-300"
              onClick={() => {
                setAddEdgeMode(false);
                setMessage("");
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                refreshSetActions();
                refreshSelected();
                setAddEdgeMode(true);
                setMessage("Select the first vertex");
              }}
            >
              Add Edge
            </button>
          )}
          {removeObjectMode ? (
            <button
              className="button bg-red-300"
              onClick={() => {
                setRemoveObjectMode(false);
                setMessage("");
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                refreshSetActions();
                setRemoveObjectMode(true);
                setMessage("Select the objects to be deleted");
              }}
              className="button"
            >
              Remove Object
            </button>
          )}
          <div>
            <button className="button relative">Run an Algorithm</button>
            <div className="absolute left-0  md:left-auto z-10 m-4 md:my-4 md:mx-0  md:-translate-x-20">
              <ul className="w-[20rem] bg-zinc-600 text-center"></ul>
            </div>
          </div>

          <button className="button" onClick={handleClearAll}>
            Clear
          </button>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="h-[4rem] w-[110rem] bg-zinc-200 bg-opacity-[0.55] rounded-lg border-2 border-zinc-900 m-2  text-zinc-900 font-bold flex items-center justify-center">
          {message}
        </div>
      </div>
      <section className="flex justify-center">
        <div
          className="w-[110rem] h-[40rem] bg-zinc-600 bg-opacity-40 relative mx-5 my-3 rounded-lg border-2 border-zinc-900"
          onClick={
            addEdgeMode
              ? handleSelectEdgeEvent
              : addVertexMode
              ? handleAddVerticeEvent
              : undefined
          }
          id="graph-container"
        >
          {[...graph.adjacencyList.keys()].map((vertex) => {
            return (
              <VertexVisualisation
                vertex={vertex}
                key={vertex.value}
                onMove={handleVertexMove}
                edgeSelection={addEdgeMode}
                objectRemovalEvent={removeObjectMode}
                vertexRemovalCallback={handleVertexRemovalEvent}
              />
            );
          })}
          <svg width={"100%"} height={"100%"}>
            {graph.getEdges().map((edge: Edge<string>, index: number) => {
              return (
                <EdgeVisualisation
                  edge={edge}
                  index={index}
                  vertices={vertices}
                  objectRemovalEvent={removeObjectMode}
                  edgeRemovalCallback={handleEdgeRemovalEvent}
                />
              );
            })}
          </svg>
        </div>
      </section>
    </div>
  );
}

export default GraphVisualisation;
