var axios = require('axios');

axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=IXVD99UE8GKJJUZBUVUXVY1JHPM35FTNYU', {

}).then(function(response) {
    var ethTokenPrice = response.data.result.ethusd;
    var ethInBTC = response.data.result.ethbtc;
    console.log(`The current price of ETH in USD is: $${ethTokenPrice} USD`);
    console.log(`The current price of ETH in BTC is: ${ethInBTC} BTC`);
}).catch(function (error) {
    console.log(error);
});
