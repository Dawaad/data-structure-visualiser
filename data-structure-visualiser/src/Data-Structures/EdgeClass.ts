import { Vertex } from "./VertexClass";


export class Edge<T>{
    vertex1: Vertex<T>
    vertex2: Vertex<T>
    weight: number
    directed:boolean

    constructor(vertex1: Vertex<T>, vertex2: Vertex<T>, weight: number, directed:boolean){
            this.vertex1 = vertex1;
            this.vertex2 = vertex2
            this.weight = weight
            this.directed = directed
    }
}