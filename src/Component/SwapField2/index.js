import Logo from "../../assets/logo3.png";

const SwapField2 = ({ disable ,formAmount ,setFormAmount}) => {
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
        <> Ray</>
      </div>
      <div className="flex flex-col items-end">
        <input
          onChange={(e)=>{setFormAmount((state)=>({...state,rayAmount:e.target.value}))}}
          className="bg-transparent text-white text-end focus:outline-none text-xl"
          placeholder="0.00"
          value={formAmount.rayAmount}
        />
        
        <div className="text-xs text-white">$113.05</div>
      </div>
    </div>
  );
};
export default SwapField2;
