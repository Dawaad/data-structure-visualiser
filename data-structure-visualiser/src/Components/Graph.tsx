import React, { useEffect, useState } from "react";
import { Graph } from "../Data-Structures/GraphClass";
import { Vertex } from "../Data-Structures/VertexClass";
import VertexVisualisation from "./Vertex";
function GraphVisualisation() {
  const [graph, setGraph] = useState(new Graph());
 

  
  const [vertexInput, setVertexInput] = useState<string>("");

  const handleVertexAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const vertex = new Vertex(vertexInput,(Math.floor(Math.random()*1000)),Math.floor(Math.random()*100))
    console.log(vertex)
    graph.addVertex(vertex)
   
    setVertexInput('')
  };


  function handleVertexMove(vertex:Vertex<string>, x: number, y: number) {
    vertex.changeX(x)
    vertex.changeY(y)
    
  }

  useEffect(() => {
    console.log(graph.getVertices()) 
  })
  

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
      </div>
      <div className="w-full h-[40rem] bg-zinc-600 bg-opacity-40 relative">
        {
          [...graph.adjacencyList.keys()].map((vertex) => {
            return  <VertexVisualisation vertex={vertex} key={vertex.value} onMove={handleVertexMove}/>
          })
        }
      </div>
    </div>
  );
}

export default GraphVisualisation;
