import React, { useEffect, useState } from "react";

interface addEdgeProps {
  callback: (weight: number, direction: boolean) => void;
}

function AddEdge({ callback }: addEdgeProps) {
  const [weight, setWeight] = useState<number>(0);


  useEffect(() => {
    console.log(weight)
  })
  return (
    <div className="w-screen h-screen bg-black bg-opacity-70 absolute top-0 left-0 flex items-center justify-center text-zinc-900 font-bold">
      <div className="w-[20rem] md:w-[30rem] h-[12.5rem] bg-zinc-300 rounded-xl grid grid-rows-4 shadow-md">
        <div className="row-span-1 flex justify-center text-2xl p-2">
          <h1>Add Edge</h1>
        </div>
        <div className="flex row-span-2 items-baseline justify-center m-4">
          <span>Weight: </span>
          <input className="bg-zinc-100 h-10 rounded-lg border-2 border-zinc-900 mx-4 p-3"  type={"number"} onChange={(e) => {
            setWeight(Number(e.target.value))
          }}/>
        </div>
        <div className="flex justify-end items-center bg-blue-500 bg-opacity-75 rounded-b-xl">
          <div className="mx-4 my-2 space-x-2 text-lg ">
            <button
              onClick={() => {
                callback(weight, false);
              }}
              className="rounded-md bg-zinc-300 py-1 px-2 hover:bg-opacity-80"
            >
              Undirected
            </button>
            <button
              onClick={() => {
                callback(weight, true);
              }}
              className="rounded-md bg-zinc-300 py-1 px-2 hover:bg-opacity-80"
            >
              Directed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEdge;
