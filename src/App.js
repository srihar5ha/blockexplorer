import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions,setTransactions]=useState();
  // useEffect(() => {
  //   async function getBlockNumber() {
  //     setBlockNumber(await alchemy.core.getBlockNumber());
  //   }

  //   getBlockNumber();
  // });

  async function getBlockNumber(){
    let number=await alchemy.core.getBlockNumber();
    setBlockNumber(number);

     
if (number){
  async function getBlockWithTransactions(number){
    const response = await alchemy.core.getBlockWithTransactions(number);
    console.log(response.transactions.length);
    let transactionObject={
      'total': response.transactions.length ,
      'from': response.transactions[0]?.['from'],
      'to': response.transactions[0]?.['to']
    }
    setTransactions(transactionObject);
  }

  getBlockWithTransactions(blockNumber);
}


  }
 
useEffect(()=>{
  getBlockNumber();

},[]);

  return <div className="App">
     <div className="container mt-5 w-50">
      <div className="card border rounded">
        <div className="card-body">
          <h6 className="card-title bg-warning p-2">Latest Block Number: {blockNumber}</h6>
          <div className="bg-primary text-white p-2">
            <h6 className="card-title">Transactions in the Block:</h6>
            {transactions && (
              Object.entries(transactions).map(([key, value]) => (
                <div key={key}>
                  <div className="card mb-2">
                    <div className="card-body">
                      <h6 className="card-title">{key}</h6>
                      <p className="card-text">{value}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>

   

     </div>;

}

export default App;
