import "./App.css";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

//ABIs
import RayCoin from "./abis/RayCoin.json";
import RayCoinPool from "./abis/RayCoinPool.json";

import Navigation from "./com/Navigation";
import BuyRay from "./com/BuyRay";
import SellRay from "./com/SellRay";

import config from "./config.json";
import SideBar from "./Component/SideBar";
import ChooseNet from "./Component/ChooseNet";
import Swap from "./Component/Swap";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [rayCoin, setRayCoin] = useState(null);
  const [rayCoinPool, setRayCoinPool] = useState(null);
  const [rayBalance, setRayBalance] = useState(0);
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);

      let rayBalance = await rayCoin?.balanceOf(account);
      let formatBalance = ethers.utils.formatUnits(rayBalance, 18);
      setRayBalance(formatBalance);
    } catch (e) {
      console.error(e);
    }
  };
  const loadBlockchainData = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network.chainId);

    const rayCoin = await new ethers.Contract(
      config[network.chainId].rayCoin.address,
      RayCoin,
      provider
    );
    if (rayCoin) {
      setRayCoin(rayCoin);
    }
    const rayCoinPool = new ethers.Contract(
      config[network.chainId].rayCoinPool.address,
      RayCoinPool,
      provider
    );
    setRayCoinPool(rayCoinPool);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);

      let rayBalance = ethers.utils.formatUnits(
        await rayCoin?.balanceOf(account),
        18
      );
      setRayBalance(rayBalance);
    });

    rayCoin.on("Transfer", async (from, to) => {
      let rayBalance = await rayCoin.balanceOf(to);
      let formatBalance = ethers.utils.formatUnits(rayBalance, 18);
      setRayBalance(formatBalance);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <SideBar
        rayBalance={rayBalance}
        account={account}
        setAccount={setAccount}
        rayCoin={rayCoin}
        setRayBalance={setRayBalance}
        connectHandler={connectHandler}
      />
      <div className="mt-20 flex justify-center">
        <Swap
          rayCoin={rayCoin}
          rayCoinPool={rayCoinPool}
          provider={provider}
          account={account}
          connectHandler={connectHandler}
        />
      </div>
    </div>
  );
}

export default App;
