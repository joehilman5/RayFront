import '../App.css';
import {ethers} from 'ethers';

function Navigation({account, setAccount, rayCoin, setRayBalance}) {

    const connectHandler = async () => {

        try {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const account = ethers.utils.getAddress(accounts[0]);
            setAccount(account);
    
            let rayBalance = await rayCoin.balanceOf(account);
            let formatBalance = ethers.utils.formatUnits(rayBalance, 18);
            setRayBalance(formatBalance);
        } catch(e) {
            console.error(e);
        }
       
    }

  return (
    <nav>
        {account ? (
            <button type='button'
            className='conn_but'>
                {account.slice(0, 6) + "..." + account.slice(38, 42)}
            </button>
        ) : (
            <button
            type='button'
            className='conn_but'
            onClick={connectHandler}>
                Connect
            </button>
        )}
      
    </nav>
  );
}

export default Navigation;
