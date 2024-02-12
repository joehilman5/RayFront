import './App.css';

import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

//ABIs
import RayCoin from './abis/RayCoin.json';
import RayCoinPool from './abis/RayCoinPool.json';

import Navigation from './com/Navigation';
import BuyRay from './com/BuyRay';
import SellRay from './com/SellRay';

import config from './config.json';

function App() {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [rayCoin, setRayCoin] = useState(null);
  const [rayCoinPool, setRayCoinPool] = useState(null);
  const [rayBalance, setRayBalance] = useState(0);

  const loadBlockchainData = async () => {

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network.chainId);

    const rayCoin = new ethers.Contract(config[network.chainId].rayCoin.address, RayCoin, provider);
    setRayCoin(rayCoin);

    const rayCoinPool = new ethers.Contract(config[network.chainId].rayCoinPool.address, RayCoinPool, provider);
    setRayCoinPool(rayCoinPool);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);

      let rayBalance = ethers.utils.formatUnits(await rayCoin.balanceOf(account), 18);
      setRayBalance(rayBalance);
    })

    rayCoin.on('Transfer', async (from, to) => {
      let rayBalance = await rayCoin.balanceOf(to);
      let formatBalance = ethers.utils.formatUnits(rayBalance, 18);
      setRayBalance(formatBalance);
    })

  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} rayCoin={rayCoin} setRayBalance={setRayBalance} />

      <h1 className='center'>Ray Coin</h1>

      {account ? (<div> 

        {//Page when user connects to MetaMask
        }
        <BuyRay rayCoinPool={rayCoinPool} provider={provider} />

        <SellRay rayCoin={rayCoin} rayCoinPool={rayCoinPool} provider={provider} />

        <p className='ray_balance'>Your RayCoin Balance is: {rayBalance}</p>
        </div>
        ) : (
          
          <div>
            <h3 className='meta'>Connect Your MetaMask!!</h3>
          </div>
        )}

  
    </div>
  );
}

export default App;
