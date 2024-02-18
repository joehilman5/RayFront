import "../App.css";
import { ethers } from "ethers";

function Navigation({ account,connectHandler }) {


  return (
    <nav>
      {account ? (
        <button type="button" className="conn_but">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="conn_but" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
}

export default Navigation;
