import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

function Gateway() {
  
  
  
  const [transactionHash, setTransactionHash] = useState(''); 

  const toAddress = '0x23073E14C00395c4cE85D9f79E2e25759e793a0e'
 
 

  const [subtotal, setSubtotal] = useState('');
  const [amount,setAmount] = useState('')

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const subtotalParam = urlParams.get('subtotal');
    if (subtotalParam) {
      setSubtotal(subtotalParam/10000000);
      setAmount(subtotalParam/10000000)
    }
  }, []); 

  const placeorder = async () => { 
      
    try {
        const response = await fetch('http://localhost:3000/user/order' , {
            method : 'POST' ,
            headers : {
                'Content-Type' : 'application/json' ,
                authorization : token 
            } ,
            body : JSON.stringify({
                email ,
                productlist
            })
         }) 

         if(response.ok) {
            console.log('product ordered successfully')
         }
    }catch(error) {
           console.error("error : " ,error.message)
    }

   }
 



 console.log(subtotal)
  const handleTransfer = async () => {
    try {
     
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

    
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];

      
      const abi = [
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "toAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferEther",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ];
      const contractAddress = '0x85A7Fa2815E4e486c25D373ca8e0762985aa77b3';

      
      const contract = new web3.eth.Contract(abi, contractAddress);

     
      await contract.methods.transferEther(toAddress, web3.utils.toWei(amount, 'ether'))
        .send({ from: fromAddress, value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', (hash) => {
          placeorder()
          setTransactionHash(hash);
          setTimeout(() => {
            window.location.href = 'http://localhost:5173/order';
        }, 2000);
          
        });


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (  
    <div className='box'>
    <div className="App">
      <h1>DecentraPay</h1> 
      Eth {subtotal} 
      <br></br>
      <br></br>
      <button style={{width : "200px"}} onClick={handleTransfer}>Pay</button>
      {transactionHash && (
        <div>
          <h2>Transaction Hash:</h2>
          <p>{transactionHash}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default Gateway;