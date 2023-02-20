export class Graph<T> {
  vertices: Map<T, T[]>;

  constructor() {
    this.vertices = new Map<T, T[]>();
  }

  addVertex(vertex: T): void {
    this.vertices.set(vertex, []);
  }

  addEdge(vertex1: T, vertex2: T): void {
    this.vertices.get(vertex1)?.push(vertex2);
    this.vertices.get(vertex2)?.push(vertex1);
  }

  removeVertex(vertex: T): void {
    this.vertices.forEach((neighbors) => {
      const index = neighbors.indexOf(vertex);
      if (index !== -1) {
        neighbors.splice(index, 1);
      }
    });
    this.vertices.delete(vertex);
  }

  removeEdge(vertex1: T, vertex2: T): void {
    const index1 = this.vertices.get(vertex1)?.indexOf(vertex2);
    const index2 = this.vertices.get(vertex2)?.indexOf(vertex1);
    if (index1 !== undefined && index1 !== -1) {
      this.vertices.get(vertex1)?.splice(index1, 1);
    }
    if (index2 !== undefined && index2 !== -1) {
      this.vertices.get(vertex2)?.splice(index2, 1);
    }
  }

  getNeighbors(vertex: T): T[] | undefined {
    return this.vertices.get(vertex);
  }

  getVertices(): IterableIterator<T> {
    return this.vertices.keys();
  }
}
