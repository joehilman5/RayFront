import "../App.css";
import { useRef } from "react";

/* global BigInt */

function BuyRay({ rayCoinPool, provider }) {
  const buyRef = useRef();

  const buyHandler = async () => {
    try {
      const signer = provider.getSigner();

      let amount = buyRef.current.value;

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
    <div className="buy_canvas">
      <p className="buy_message">Buy Ray Coin</p>
      <input type="text" className="buy_amount" ref={buyRef} />
      <button type="button" className="buy_but" onClick={buyHandler}>
        Buy RAY
      </button>
    </div>
  );
}

export default BuyRay;
