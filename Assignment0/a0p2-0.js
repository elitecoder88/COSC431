var axios = require('axios');
var web3 = require('web3');

const walletAddress = '';

axios.all([
  axios.get('https://api.etherscan.io/api?module=account&action=balance&address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&tag=latest&apikey=IXVD99UE8GKJJUZBUVUXVY1JHPM35FTNYU'),
  axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=IXVD99UE8GKJJUZBUVUXVY1JHPM35FTNYU')
])
.then(function(responseArr) {
  // parse response
  var wei = responseArr[0].data.result;

  var ethQuantity = web3.utils.fromWei(wei, 'ether');
  var ethTokenPrice = responseArr[1].data.result.ethusd;
    
  var ethValue = ethTokenPrice * ethQuantity;

  console.log(`Here is an Overview of the ${walletAddress} wallet address:\n- ${ethQuantity} ETH\n- $${ethValue.toFixed(2)} USD`);
}).catch(function (error) {
    console.log(error);
});


