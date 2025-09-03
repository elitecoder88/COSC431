var axios = require('axios');
var web3 = require('web3');

axios.get('https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=0x192336f603b8e7bef43518108c39b8fb933c8eee60c0e242655138c8206259ef&apikey=IXVD99UE8GKJJUZBUVUXVY1JHPM35FTNYU', {

}).then(function(response) {
  var weiHexValue = response.data.result.value;
  var weiDecimalValue = parseInt(weiHexValue, 16);

  var ethQuantity = web3.utils.fromWei(weiDecimalValue, 'ether');
  
  console.log(`Marlon Humphrey (MarlonHumphrey.eth) from the Baltimore Ravens purchased Bored Ape #1880 for ${ethQuantity} ETH`);

}).catch(function (error) {
    console.log(error);
});



