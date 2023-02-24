import { Vertex } from "./VertexClass";
import { Edge } from "./EdgeClass";
import { PriorityQueue } from "./PriorityQueue";
export class Graph<T> {
  //Initialisation

  adjacencyList: Map<Vertex<T>, Array<Edge<T>>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  //Graph Manipulation

  addVertex(newVertex: Vertex<T>) {
    if (this.getAllVertexValues().includes(newVertex.value)) {
      return;
    }

    this.adjacencyList.set(newVertex, []);
  }

  getAllVertexValues() {
    return [...this.adjacencyList.keys()].map((vertex) => {
      return vertex.value;
    });
  }

  getVertexById(id: string): Vertex<string> | undefined {
    for (const vertex of this.getVertices()) {
      if (vertex.value == id) {
        return vertex;
      }
    }
    return;
  }

  clearAll() {
    this.adjacencyList = new Map();
  }

  removeVertex(vertex: Vertex<T>) {
    this.adjacencyList.delete(vertex);

    // Remove any edges that contain the vertex
    for (const adjacentVertex of this.adjacencyList.keys()) {
      this.adjacencyList.set(
        adjacentVertex,
        this.adjacencyList.get(adjacentVertex)?.filter((edge) => {
          return edge.vertex1 !== vertex && edge.vertex2 !== vertex;
        }) ?? []
      );
    }
  }

  addEdge(
    vertex1: Vertex<T>,
    vertex2: Vertex<T>,
    weight: number,
    directed: boolean,
    id: string
  ) {
    if (vertex1 === vertex2) {
      if (
        this.adjacencyList.get(vertex1)?.find((edge) => {
          return edge.vertex1 === vertex1 && edge.vertex2 === vertex2;
        })
      ) {
        return;
      }
      const selfLoopEdge = new Edge(vertex1, vertex2, weight, directed, id);
      this.adjacencyList.get(vertex1)?.push(selfLoopEdge);
      return;
    }
    const edge1 = new Edge(vertex1, vertex2, weight, directed, id);
    const edge2 = new Edge(vertex2, vertex1, weight, directed, id);
    this.adjacencyList.get(vertex1)?.push(edge1);
    this.adjacencyList.get(vertex2)?.push(edge2);
  }
  removeEdge(vertex1: Vertex<T>, vertex2: Vertex<T>) {
    const edgeToRemove = this.adjacencyList.get(vertex1)?.find((edge) => {
      return edge.vertex1 === vertex1 && edge.vertex2 === vertex2;
    });
    this.adjacencyList.set(
      vertex1,
      this.adjacencyList
        .get(vertex1)
        ?.filter((edge) => edge !== edgeToRemove) ?? []
    );
    this.adjacencyList.set(
      vertex2,
      this.adjacencyList
        .get(vertex2)
        ?.filter((edge) => edge !== edgeToRemove) ?? []
    );
  }

  // Getting Graph Data

  getVertices() {
    return Array.from(this.adjacencyList.keys());
  }

  getEdges() {
    const edges: Array<Edge<T>> = [];

    for (const adjacentEdges of this.adjacencyList.values()) {
      for (const edge of adjacentEdges) {
        if (!edges.includes(edge)) {
          edges.push(edge);
        }
      }
    }

    return edges;
  }

  getEdge(vertex1: Vertex<T>, vertex2: Vertex<T>): Edge<T>[] | null {
    const edges = this.getEdges().filter((edge) => {
      return (
        (edge.vertex1 === vertex1 && edge.vertex2 === vertex2) ||
        (edge.vertex1 === vertex2 && edge.vertex2 === vertex1)
      );
    });
    return edges.length > 0 ? edges : null;
  }

  getAdjacencyList() {
    return this.adjacencyList;
  }

  // Graph Algorithns

  bfs(
    startVertex: Vertex<T>,
    visit: (vertex: Vertex<T>, prevEdge?: Edge<T>) => void
  ) {
    const visited = new Set<Vertex<T>>();
    const queue: Array<Edge<T>> = [];
    const startEdges: Array<Edge<T>> = this.getEdges().filter(
      (edge) => edge.vertex1 === startVertex || edge.vertex2 === startVertex
    );
    startEdges.forEach((edge) => queue.push(edge));

    while (queue.length > 0) {
      const currentEdge = queue.shift()!;
      const current =
        currentEdge.vertex1 === startVertex
          ? currentEdge.vertex2
          : currentEdge.vertex1;

      if (!visited.has(current)) {
        visited.add(current);
        visit(current, currentEdge);

        const adjacentEdges: Array<Edge<T>> = this.getEdges().filter(
          (edge) =>
            (edge.vertex1 === current || edge.vertex2 === current) &&
            edge !== currentEdge
        );
        adjacentEdges.forEach((edge) => {
          const adjacentVertex =
            edge.vertex1 === current ? edge.vertex2 : edge.vertex1;
          queue.push(edge);
        });
      }
    }
  }

  dfs(startVertex: Vertex<T>, visit: (vertex: Vertex<T>) => void) {
    const visited = new Set<Vertex<T>>();
    const stack: Array<Edge<T>> = [];
    const startEdges: Array<Edge<T>> = this.getEdges().filter(
      (edge) => edge.vertex1 === startVertex || edge.vertex2 === startVertex
    );
    startEdges.forEach((edge) => stack.push(edge));

    while (stack.length > 0) {
      const currentEdge = stack.pop()!;
      const current =
        currentEdge.vertex1 === startVertex
          ? currentEdge.vertex2
          : currentEdge.vertex1;

      if (!visited.has(current)) {
        visited.add(current);
        visit(current);

        const adjacentEdges: Array<Edge<T>> = this.getEdges().filter(
          (edge) =>
            (edge.vertex1 === current || edge.vertex2 === current) &&
            edge !== currentEdge
        );
        adjacentEdges.forEach((edge) => {
          const adjacentVertex =
            edge.vertex1 === current ? edge.vertex2 : edge.vertex1;

          stack.push(edge);
        });
      }
    }
  }

  compareEdges(a: Edge<T>, b: Edge<T>) {
    return a.weight - b.weight;
  }
}
