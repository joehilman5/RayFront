import React, { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import SwapField1 from "../SwapField1";
import SwapField2 from "../SwapField2";

function Swap({ account, connectHandler, rayCoin, rayCoinPool, provider }) {
  const [swap, setSwap] = useState(true);
  const [formAmount, setFormAmount] = useState({
    rayAmount: "",
    coinAmount: "",
  });
  const sellHandler = async (amount) => {
    try {
      const signer = provider.getSigner();
      //   let amount = 0;
      if (!isNaN(amount) && amount >= 1) {
        let adjust_amount = amount.concat("000000000000000000");
        let action = await rayCoin
          .connect(signer)
          .approve(rayCoinPool.address, BigInt(adjust_amount));
        await action.wait();
        action = await rayCoinPool
          .connect(signer)
          .sellRayCoin(BigInt(adjust_amount));
        await action.wait();
      } else {
        //Error Page for Wrong Input
        console.log("Input proper value");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const buyHandler = async (amount) => {
    try {
      const signer = provider.getSigner();

      //   let amount = 0;

      if (!isNaN(amount) && amount >= 1) {
        let cost = amount * (await rayCoinPool.price());
        let action = await rayCoinPool
          .connect(signer)
          .buyRayCoin({ value: BigInt(cost) });
        await action.wait();
      } else {
        console.log("Input proper value");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col">
      <div className=" rounded-xl bg-indigo-600 shadow-xl text-white p-5">
        <div className="   ">
          <p className="mb-3">You're paying</p>
        </div>
        {swap ? (
          <SwapField1
            disable={swap ? false : true}
            formAmount={formAmount}
            setFormAmount={setFormAmount}
          />
        ) : (
          <SwapField2
            disable={swap ? true : false}
            formAmount={formAmount}
            setFormAmount={setFormAmount}
          />
        )}

        <div className="border-b border-white mt-10 mb-3 relative">
          <div
            className={` flex justify-center items-end absolute -top-4 left-[47%] bg-indigo-700 border-4 border-indigo-900 ${
              swap ? "hover:border-rose-500" : "hover:border-green-500"
            }  p-1 rounded-full`}
            onClick={() => setSwap(!swap)}
          >
            <MdSwapVert />
          </div>
        </div>
        <div className="">
          <p className=" mt-5 mb-3 select-none">To receive</p>
          {swap ? (
            <SwapField2
              disable={swap ? true : false}
              formAmount={formAmount}
              setFormAmount={setFormAmount}
            />
          ) : (
            <SwapField1
              disable={swap ? false : true}
              formAmount={formAmount}
              setFormAmount={setFormAmount}
            />
          )}
        </div>
        {!account ? (
          <div
            onClick={connectHandler}
            className="pulse rounded-xl bg-indigo-100 bg-opacity-80  font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 text-center py-3.5 tracking-wider  text-lg mt-4 cursor-pointer"
          >
            Connect Wallet
          </div>
        ) : (
          <>
            <div
              onClick={() =>
                swap
                  ? buyHandler(formAmount.coinAmount)
                  : sellHandler(formAmount.rayAmount)
              }
              className={`bg-indigo-100 border-2 font-bold ${
                swap
                  ? " border-green-500  text-green-500 "
                  : " border-rose-500  text-rose-500 "
              }  mt-4 rounded-xl text-center py-3.5 tracking-wider text-lg cursor-pointer`}
            >
              {swap ? "Buying" : "Selling"} Ray Coin
            </div>
          </>
        )}
      </div>
      <div className="text-gray-100 text-xl text-center mt-4">
       <p clas>RayCoin Balance: <span className="font-bold text-white">0.00</span> </p>
      </div>
    </div>
  );
}

export default Swap;
