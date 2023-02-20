import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Graph } from './Data-Structures/Graph'

function App() {
  const [count, setCount] = useState(0)
  const graph = new Graph<string>()


  useEffect(() => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
  },[])
  useEffect(() => {
      console.log(graph.getVertices())
  },[graph])
  
  return (
    <div>
      <form action=''>
        <input />
        <button />
      </form>
      {graph.getVertices()}
    </div>
  )
}

export default App
