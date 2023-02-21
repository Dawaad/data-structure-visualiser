import { Vertex } from "./VertexClass";

export class Graph<T> {
  //Initialisation

  adjacencyList: Map<Vertex<T>, Array<Vertex<T>>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  //Graph Manipulation

  addVertex(newVertex: Vertex<T>) {
      
    if(this.getAllVertexValues().includes(newVertex.value)){
      return
    }  
    
    this.adjacencyList.set(newVertex, []);
      
  }

  getAllVertexValues(){
    return [...this.adjacencyList.keys()].map(vertex => {
      return vertex.value
    })
  }

  removeVertex(vertex: Vertex<T>) {
    this.adjacencyList.delete(vertex);

    // Remove any edges that contain the vertex
    for (const adjacentVertex of this.adjacencyList.keys()) {
      this.adjacencyList.set(
        adjacentVertex,
        this.adjacencyList.get(adjacentVertex)?.filter((v) => v !== vertex) ??
          []
      );
    }
  }

  addEdge(vertex1: Vertex<T>, vertex2: Vertex<T>) {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }

  removeEdge(vertex1: Vertex<T>, vertex2: Vertex<T>) {
    this.adjacencyList.set(
      vertex1,
      this.adjacencyList.get(vertex1)?.filter((v) => v !== vertex2) ?? []
    );
    this.adjacencyList.set(
      vertex2,
      this.adjacencyList.get(vertex2)?.filter((v) => v !== vertex1) ?? []
    );
  }

  // Getting Graph Data

  getVertices() {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges() {
    const edges: Array<[Vertex<T>, Vertex<T>]> = [];

    for (const [vertex, adjacentVertices] of this.adjacencyList) {
      for (const adjacentVertex of adjacentVertices) {
        edges.push([vertex, adjacentVertex]);
      }
    }

    return edges;
  }

  getAdjacencyList() {
    return this.adjacencyList;
  }

  // Graph Functions

  bfs(startVertex: Vertex<T>, visit: (vertex: Vertex<T>) => void) {
    const visited = new Set<Vertex<T>>();
    const queue = [startVertex];
    visited.add(startVertex);

    while (queue.length > 0) {
      const current = queue.shift()!;
      visit(current);

      for (const adjacent of this.adjacencyList.get(current) ?? []) {
        if (!visited.has(adjacent)) {
          visited.add(adjacent);
          queue.push(adjacent);
        }
      }
    }
  }

  dfs(startVertex: Vertex<T>, visit: (vertex: Vertex<T>) => void) {
    const visited = new Set<Vertex<T>>();
    const stack = [startVertex];

    while (stack.length > 0) {
      const current = stack.pop()!;
      visit(current);

      visited.add(current);

      for (const adjacent of this.adjacencyList.get(current) ?? []) {
        if (!visited.has(adjacent)) {
          stack.push(adjacent);
        }
      }
    }
  }
}
