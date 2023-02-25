import React, { useEffect, useState } from "react";
import { Edge } from "../Data-Structures/EdgeClass";
import { Graph } from "../Data-Structures/GraphClass";
import { Vertex } from "../Data-Structures/VertexClass";
import EdgeVisualisation from "./Edge";
import VertexVisualisation from "./Vertex";

type graphEvent =
  | "addEdgeEvent"
  | "addVertexEvent"
  | "none"
  | "runBFSEvent"
  | "runDFSEvent"
  | "runDijkstrasEvent"
  | "runPrimsEvent";

type algorithmMap = {
  [key:string]: () => void
}  

function GraphVisualisation() {
  const [graph, setGraph] = useState(new Graph());
  const [vertexCount, setVertexCount] = useState<number>(1);
  const [edgeCount, setEdgeCount] = useState<number>(0);
  const [graphAnimationRunning, setGraphAnimationRunning] =
    useState<boolean>(false);
  const [vertices, setVertices] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const [message, setMessage] = useState<string>(
    "Press the 'Add Vertex' button to start adding vertices to the graph "
  );

  const [currentEvent, setCurrentEvent] = useState<graphEvent>("none");

  const [addEdgeMode, setAddEdgeMode] = useState<boolean>(false);
  const [addVertexMode, setAddVertexMode] = useState<boolean>(false);
  const [removeObjectMode, setRemoveObjectMode] = useState<boolean>(false);
  // const [algorithmMode, setAlgorithmMode] = useState<algorithms | null>(null)
  const [runBFS, setRunBFS] = useState<boolean>(false);
  const [edgeVertexSelect, setEdgeVertexSelect] = useState<
    Vertex<string> | undefined
  >(undefined);

  

  const algorithms:algorithmMap = {
    'Breadth First Search': () => {
      refreshSetActions();
      setCurrentEvent("runBFSEvent");
      setMessage("Select starting vertex");
    },
    'Depth First Search': () => {
      refreshSetActions();
      setCurrentEvent("runDFSEvent");
      setMessage("Select starting vertex");
    },
    "Dijkstras":() => {
      refreshSetActions()
      setCurrentEvent('runDijkstrasEvent')
      setMessage('Select starting vertex')
    },
    'Minimum Spanning Tree':() => {
      refreshSetActions()
      setCurrentEvent('runPrimsEvent')
    }
  };

  const clickBehaviors = {
    addEdgeEvent: (event: React.MouseEvent<HTMLDivElement>) => {
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
            false,
            `edge-${edgeVertexSelect.value}-${clickedDivId}`
          );
          setEdgeCount(graph.getEdges().length);
          (
            document.getElementById(edgeVertexSelect.value) as HTMLElement
          ).classList.remove("bg-yellow-300");
          (
            document.getElementById(clickedDivId) as HTMLElement
          ).classList.remove("bg-yellow-300");
          refreshSelected();
          setMessage("Select the first vertex");
        }
      }
    },
    addVertexEvent: (event: React.MouseEvent<HTMLDivElement>) => {
      const parentdiv = document.getElementById(
        "graph-container"
      ) as HTMLElement;
      const newVertex = new Vertex(
        vertexCount.toString(),
        event.clientX - parentdiv.offsetLeft * 1.1,
        event.clientY - parentdiv.offsetTop * 1.1
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
    },
    // add more click behaviors here
    runBFSEvent: (event: React.MouseEvent<HTMLDivElement>) => {
      
      const clickDiv = event.target as HTMLDivElement;
      const clickedDivId = clickDiv.id;
      const visitedVertices: Vertex<string>[] = [];
      const visitedEdges: Edge<string>[] = [];
      if (
        [...graph.adjacencyList.keys()]
          .map((vertex) => {
            return vertex.value;
          })
          .includes(clickedDivId)
      ) {
        visitedVertices.push(
          graph.getVertexById(clickedDivId) as Vertex<string>
        );
        setMessage(`Breadth First Search Path: ${clickedDivId}`);
        graph.bfs(
          graph.getVertexById(clickedDivId) as Vertex<string>,
          (vertex, edge) => {
            visitedVertices.push(vertex);
            if (edge) {
              visitedEdges.push(edge);
            }
            setMessage((prev) => {
              return prev.concat(` -> ${vertex.value} `);
            });
          }
        );
        applyStylingToVisited(visitedEdges, visitedVertices);
      }
    },

    runDFSEvent: (event: React.MouseEvent<HTMLDivElement>) => {},

    runPrimsEvent: (event: React.MouseEvent<HTMLDivElement>) => {},
    runDijkstrasEvent: (event: React.MouseEvent<HTMLDivElement>) => {},
    none: undefined,
  };

  const refreshSelected = () => {
    setEdgeVertexSelect(undefined);
  };

  const refreshSetActions = () => {
    setCurrentEvent("none");
    setRemoveObjectMode(false);
    clearAllStyling();

    setMessage("");
  };

  function handleVertexMove(vertex: Vertex<string>, x: number, y: number) {
    setVertices((vertices) => {
      const newVertices = new Map(vertices);
      newVertices.set(vertex.value, { x, y });
      return newVertices;
    });
  }

  const clearAllStyling = () => {
    const visitedVertexDiv = document.querySelectorAll(".bg-blue-400");
    visitedVertexDiv.forEach((vertex) => {
      vertex.classList.add("bg-green-400");
      vertex.classList.remove("bg-blue-400");
    });

    const edgeSelectedVertex = document.querySelectorAll(".bg-yellow-300");
    edgeSelectedVertex.forEach((vertex) => {
      vertex.classList.add("bg-green-400");
      vertex.classList.remove("bg-yellow-300");
    });
    const visitedEdgeDiv = document.querySelectorAll(".stroke-orange-300");
    visitedEdgeDiv.forEach((edge) => {
      edge.classList.add("stroke-white");
      edge.classList.remove("stroke-orange-300");
    });
  };

  const applyStylingToVisited = (
    visitedEdges: Edge<string>[],
    visitedVertices: Vertex<string>[]
  ) => {
    console.log(visitedVertices);
    console.log(visitedEdges);
    type VertexOrEdge = Vertex<string> | Edge<string>;
    const combinedArrays: VertexOrEdge[] = [];
    const maxLength = Math.max(visitedEdges.length, visitedVertices.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < visitedVertices.length) {
        combinedArrays.push(visitedVertices[i]);
      }
      if (i < visitedEdges.length) {
        combinedArrays.push(visitedEdges[i]);
      }
    }

    setGraphAnimationRunning(true);

    combinedArrays.forEach((item: VertexOrEdge, index: number) => {
      setTimeout(() => {
        console.log(currentEvent);
        if (currentEvent === "runBFSEvent" || currentEvent === "runDFSEvent") {
          if (item instanceof Vertex) {
            document.getElementById(item.value)?.classList.add("bg-blue-400");
            document
              .getElementById(item.value)
              ?.classList.remove("bg-green-400");
          } else {
            if (!item.directed) {
              document
                .getElementById(
                  `edge-${item.vertex1.value}-${item.vertex2.value}`
                )
                ?.classList.remove("stroke-white");
              document
                .getElementById(
                  `edge-${item.vertex1.value}-${item.vertex2.value}`
                )
                ?.classList.add("stroke-orange-300");
              document
                .getElementById(
                  `edge-${item.vertex2.value}-${item.vertex1.value}`
                )
                ?.classList.remove("stroke-white");
              document
                .getElementById(
                  `edge-${item.vertex2.value}-${item.vertex1.value}`
                )
                ?.classList.add("stroke-orange-300");
            }
          }
        }
      }, 350 * index);

      setTimeout(() => {
        clearAllStyling();
        setGraphAnimationRunning(false);
      }, 350 * combinedArrays.length + 1000);
    });
  };

  const handleClearAll = () => {
    graph.clearAll();
    setVertexCount(1);
    setVertices(new Map());
    refreshSetActions();
  };

  const handleEdgeRemovalEvent = (edge: Edge<string>) => {
    if (edge.directed) {
      graph.removeEdge(edge.vertex1, edge.vertex2);
    } else {
      graph.removeEdge(edge.vertex1, edge.vertex2);
      graph.removeEdge(edge.vertex2, edge.vertex1);
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

  return (
    <div className="w-screen h-full">
      <div className="flex justify-center pt-2">
        <div className=" w-[110rem] flex items-center">
          {currentEvent === "addVertexEvent" ? (
            <button
              className="button bg-red-300"
              onClick={() => {
                // setAddVertexMode(false);
                setCurrentEvent("none");
                setMessage("");
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => {
                if (!graphAnimationRunning) {
                  refreshSetActions();
                  // setAddVertexMode(true);
                  setCurrentEvent("addVertexEvent");
                  setMessage("Click on the workspace to create a new Vertex");
                }
              }}
              className="button"
            >
              Add Vertex
            </button>
          )}
          {currentEvent === "addEdgeEvent" ? (
            <button
              className="button bg-red-300"
              onClick={() => {
                setCurrentEvent("none");
                setMessage("");
              }}
            >
              Cancel
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                if (!graphAnimationRunning) {
                  refreshSetActions();
                  refreshSelected();
                  setCurrentEvent("addEdgeEvent");
                  setMessage("Select the first vertex");
                }
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
                if (!graphAnimationRunning) {
                  refreshSetActions();
                  setRemoveObjectMode(true);
                  setMessage("Select the objects to be deleted");
                }
              }}
              className="button"
            >
              Remove Object
            </button>
          )}
          <div>
            <button onClick={() => {}} className="button relative">
              Run an Algorithm
            </button>
            <div className="absolute left-0  md:left-auto z-10 m-4 md:my-4 md:mx-0  md:-translate-x-[2rem] ">
              <ul className="w-[15rem] bg-zinc-600 text-center cursor-pointer font-bold space-y-3 p-4 rounded-md">
               {Object.keys(algorithms).map((algorithm:string)=> {
                
                return <li onClick={() => {
                  algorithms[algorithm]()
                }}>{algorithm}</li>
               })}
              </ul>
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
          onClick={clickBehaviors[currentEvent]}
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
                  key={`edge${index}`}
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
