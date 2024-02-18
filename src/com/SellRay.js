import "../App.css";
import { useRef } from "react";

/* global BigInt */

function SellRay({ rayCoin, rayCoinPool, provider }) {
  const sellRef = useRef();

  const sellHandler = async () => {
    try {
      const signer = provider.getSigner();

      let amount = sellRef.current.value;

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

  return (
    <div className="sell_canvas">
      <p className="sell_message">Sell Ray Coin</p>
      <input type="text" className="sell_amount" ref={sellRef} />
      <button type="button" className="sell_but" onClick={sellHandler}>
        Sell RAY
      </button>
    </div>
  );
}

export default SellRay;
