"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getData, setData } from "./api/localstorage";
import { randomString } from "./helper/random";
import Modal from "./componants/Modal";

const Page = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
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
    if (message !== "") {
      setList([
        { id: randomString(5), name: message, status: true },
        ...listArr,
      ]);
      setMessage("");
    }
  };

  // console.log("listArr", listArr);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const handleDelete = (itemId: string) => {
    const updatedList = listArr.filter(item => item.id !== itemId);
    console.log("itemIndex", updatedList);
    setListArr(updatedList);
    setList(updatedList); // If you also want to update the list state
    setDeleteId("");
    setLocal(); // Save the updated list to local storage
  };

  const handleChangeStatus = (itemId: any, status: boolean) => {
    const itemIndex = listArr.findIndex(item => item.id === itemId);
  
    if (itemIndex !== -1) {
      const updatedListArr = [...listArr];
  
      // Toggle the status property using the NOT operator
      updatedListArr[itemIndex].status = !status;
  
      console.log("final", updatedListArr);
      setData(JSON.stringify(updatedListArr));
      setCheck(prev => !prev);
    }
  };
  

  return (
    <>
      <div
        //   ref={parentRef}
        className="fixed w-full h-full top-0 left-0 z-[9] bg-[rgba(124,149,206,0.12)] backdrop-blur-[8px] flex items-center justify-center shadow-[rgba(0,0,0,0.16)] duration-100 animate-fadeinfast"
      >
        <h1 className="text-white fixed top-0">kram Todo List</h1>
        {isActive ?      <button className="text-white fixed top-[60px] bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md shadow-md" onClick={()=>{setIsActive(false)}}>
          Switch to DONE
        </button> :   <button className="text-white fixed top-[60px] bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md" onClick={()=>{setIsActive(true)}}>
        Switch to TODO
        </button>}
   
        <div className=" h-[600px] mt-[70px] overflow-y-scroll pb-[50px]">
          {isActive ? (
            <div className="">
              {listArr &&
                listArr
                  .filter(item => item.status === true)
                  .map(item => (
                    <div className="flex w-full" key={item.id}>
                      <button
                        onClick={() => {
                          setIsModalOpen(true), setDeleteId(item.id);
                        }}
                        className="p-2 m-1 bg-red-500 text-white rounded"
                      >
                        x
                      </button>
                      <div
                        key={item.id}
                        className="bg-gray-200 p-2 m-1 rounded-md flex items-center w-[300px]  text-black"
                      >
                        <div className="flex justify-between w-full">
                          <p className="font-bold">{item.name}</p>
                          <button
                            // onClick={() => {setIsModalOpen(true),setDeleteId(item.id)}}
                            onClick={() => {
                              handleChangeStatus(item.id,item.status);
                            }}
                            className=" w-[50px] bg-green-500 text-white rounded select-none"
                          >
                            DONE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          ) : (
            <div className="">
              {listArr &&
                listArr
                  .filter(item => item.status === false)
                  .map(item => (
                    <div className="flex w-full" key={item.id}>
                      <button
                        onClick={() => {
                          setIsModalOpen(true), setDeleteId(item.id);
                        }}
                        className="p-2 m-1 bg-red-500 text-white rounded"
                      >
                        x
                      </button>
                      <div
                        key={item.id}
                        className="bg-gray-200 p-2 m-1 rounded-md flex items-center w-[300px]  text-black"
                      >
                        <div className="flex justify-between w-full">
                          <p className="font-bold">{item.name}</p>
                          <button
                            // onClick={() => {setIsModalOpen(true),setDeleteId(item.id)}}
                            onClick={() => {
                              handleChangeStatus(item.id,item.status);
                            }}
                            className=" w-[50px] bg-orange-500 text-white rounded select-none"
                          >
                            UNDO
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <form
          onSubmit={submit}
          className="fixed bottom-0 bg-white p-4 w-full flex items-center"
        >
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          xBotton={true}
        >
          <div className="">
            <p className="mt-4 text-black">Are You Sure?</p>
            <button
              className="p-2 m-1 mt-[80px] bg-red-500 text-white rounded"
              onClick={() => {
                handleDelete(deleteId), setIsModalOpen(false);
              }}
            >
              Force Delete
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Page;
