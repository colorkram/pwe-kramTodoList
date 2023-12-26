"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getData, setData } from "./api/localstorage";
import { randomString } from "./helper/random";
import Modal from "./componants/Modal";

const Page = () => {
  const [list, setList] = React.useState<any[]>([]);
  const [listArr, setListArr] = React.useState<any[]>([]); //สำหรับ show
  const [check, setCheck] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const local = getData();

  useEffect(() => {
    const local = getData();
    if (local !== null) {
      try {
        const parsedList = JSON.parse(local);
        setListArr(parsedList);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [check]);

  useEffect(() => {
    if (list.length > 0) {
      setLocal();
      setCheck(prev => !prev);
    }
  }, [list]);

  const setLocal = () => {
    setData(JSON.stringify(list));
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  const submit = (e: any) => {
    e.preventDefault();
    setList([...listArr, { id: randomString(5), name: message, status: true }]);
  };

  // console.log("listArr", listArr);
  const handleDelete = (itemId: number) => {
    const updatedList = listArr.filter(item => item.id !== itemId);
    setListArr(updatedList);
    setList(updatedList); // If you also want to update the list state
    setLocal(); // Save the updated list to local storage
  };

  return (
    <>
      <div
        //   ref={parentRef}
        className="fixed w-full h-full top-0 left-0 z-[5000] bg-[rgba(24,39,75,0.12)] backdrop-blur-[8px] flex items-center justify-center shadow-[rgba(0,0,0,0.16)] duration-100 animate-fadeinfast"
      >
        <div>
          <div>
            {listArr &&
              listArr.map(item => (
                <div className="flex w-full" key={item.id}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 m-1 bg-red-500 text-white rounded"
                  >
                    x
                  </button>
                  <div
                    key={item.id}
                    className="bg-gray-200 p-2 m-1 rounded-md flex items-center w-[300px]  text-black"
                  >
                    <p className="font-bold">{item.name}</p>
                  </div>
                </div>
              ))}

        
          </div>
        </div>
        <form onSubmit={submit} className="fixed bottom-0 bg-white p-4 w-full flex items-center">
  <input
    className="text-black border border-gray-300 p-2 mr-2 flex-1"
    type="text"
    value={message}
    onChange={handleChange}
    placeholder="Enter your message..."
  />

  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Submit
  </button>
</form>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false) } xBotton={true}>
<div className="m-5"></div>
</Modal>
        
      </div>
    </>
  );
};
export default Page;
