var axios = require('axios');
var web3 = require('web3');

axios.get('https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=0x941bc36723200c0fbc5199f52f45340ce8bdcb645bf83f6241917d9644b5b06b&apikey=IXVD99UE8GKJJUZBUVUXVY1JHPM35FTNYU', {

}).then(function(response) {
  var weiHexValue = response.data.result.value;
  var weiDecimalValue = parseInt(weiHexValue, 16);

  var ethQuantity = web3.utils.fromWei(weiDecimalValue, 'ether');
  
  console.log(`Trey Songz (TreySongz.eth) transfered ${ethQuantity} ETH to the wallet address 0x5e0b733905CC54989Ec7c28A07c516e51c5Afedf`);

}).catch(function (error) {
    console.log(error);
});

