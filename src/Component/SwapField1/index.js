import { useState } from "react";
import BnbImg from "../../assets/bnb.png";
import ChooseNet from "../ChooseNet";
const SwapField1 = ({ disable ,formAmount ,setFormAmount}) => {
  const [walletPopUp, setWalletPopUp] = useState(false);

  return (
    <div
      className={`flex ${
        disable ? " bg-indigo-400 " : " bg-indigo-400"
      }  bg-opacity-70 p-4 flex justify-between gap-4 rounded-xl`}
    >
      <ChooseNet
        open={walletPopUp}
        close={() => setWalletPopUp(!walletPopUp)}
      />

      <div
        className=" bg-indigo-700  px-3 rounded-xl flex items-center cursor-pointer "
        onClick={() => setWalletPopUp(true)}
      >
        <div className="rounded-full bg-black px-2 py-1.5 mr-1">
          <img src={BnbImg} className="h-3 " />
        </div>
        <>BNB</>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div className="flex flex-col items-end">
        <input
          onChange={(e)=>setFormAmount((state)=>({...state,coinAmount:e.target.value}))}
          className="bg-transparent text-white text-end focus:outline-none text-xl"
          placeholder="0.00"
          value={formAmount.coinAmount}
        />
        <div className="text-xs text-white ">$113.05</div>
      </div>
    </div>
  );
};
export default SwapField1;
