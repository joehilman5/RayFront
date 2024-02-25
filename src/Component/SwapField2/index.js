import Logo from "../../assets/logo3.png";
import { ethers } from "ethers";

const SwapField2 = ({ disable ,formAmount ,setFormAmount, swap, rayPayback}) => {

  const safeMul = (n) => {
    if(n < 1000000000) {
      return n;
    } else {
      return 0;
    }
  }

  return (
    <div
    className={`flex ${
      disable ? " bg-indigo-400 " : " bg-indigo-400"
    }  bg-opacity-70 p-4 flex justify-between gap-4 rounded-xl`}
    >
      <div className="bg-indigo-700  px-3 rounded-xl flex items-center cursor-pointer">
        <div className="rounded-full bg-black px-1 py-1.5 mr-1">
          <img src={Logo} className="h-3 " />
        </div>
        <> RAY</>
      </div>
      <div className="flex flex-col items-end">
        {swap ? (
          <input
          onChange={(e)=>{setFormAmount((state)=>({...state,rayAmount: e.target.value}))}}
          className="bg-transparent text-white text-end focus:outline-none text-xl"
          placeholder="0.00"
          value={formAmount.rayAmount}
        />
        ) : (
        <input
          onChange={(e)=>{setFormAmount((state)=>({...state,rayAmount: e.target.value, coinAmount: ethers.utils.formatUnits(safeMul(e.target.value) * rayPayback, 18)}))}}
          className="bg-transparent text-white text-end focus:outline-none text-xl"
          placeholder="0.00"
          value={formAmount.rayAmount}
        />)}
        
        
      </div>
    </div>
  );
};
export default SwapField2;
