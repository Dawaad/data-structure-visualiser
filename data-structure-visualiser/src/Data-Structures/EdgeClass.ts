import { Vertex } from "./VertexClass";


export class Edge<T>{
    vertex1: Vertex<T>
    vertex2: Vertex<T>
    weight: number


    constructor(vertex1: Vertex<T>, vertex2: Vertex<T>, weight: number){
            this.vertex1 = vertex1;
            this.vertex2 = vertex2
            this.weight = weight
    }
}