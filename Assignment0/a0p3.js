var axios = require('axios');

axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20solana%2C%20cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&precision=2', {

}).then(function(response) {
  var btcPrice = response.data[0].current_price;
  var ethPrice = response.data[1].current_price;
  var solPrice = response.data[2].current_price;
  var adaPrice = response.data[3].current_price;
  
  console.log('The current price for Bitcoin, Ethereum, Solana, and Cardano are the following:');
  console.log(`- BTC: $${btcPrice} USD`);
  console.log(`- ETH: $${ethPrice} USD`);
  console.log(`- SOL: $${solPrice} USD`);
  console.log(`- ADA: $${adaPrice} USD`);
}).catch(function (error) {
  console.log(error);
});

axios.all([
  axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-03-2020'),
  axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-03-2020'),
  axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=01-05-2017'),
  axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/history?date=08-07-2022'),
])
.then(function(responseArr) {
  // parse response

  //BTC price on March 1, 2020 @ 12am EST
  btcPrice0 = responseArr[0].data.market_data.current_price.usd;

  //BTC price on March 30, 2020 @ 12am EST
  btcPrice1 = responseArr[1].data.market_data.current_price.usd;

  //BTC price on May 1, 2017 @ 12am EST
  btcPrice2 = responseArr[2].data.market_data.current_price.usd;

  //BTC price on July 8, 2022 @ 12am EST ==> My birthday in 2022!
  btcPrice3 = responseArr[3].data.market_data.current_price.usd;

  console.log('These are the prices of Bitcoin on the following date:');
  console.log(`- BTC price on March 1, 2020 @ 12am EST: $${btcPrice0.toFixed(2)} USD`);
  console.log(`- BTC price on March 30, 2020 @ 12am EST: $${btcPrice1.toFixed(2)} USD`);
  console.log(`- BTC price on May 1, 2017 @ 12am EST: $${btcPrice2.toFixed(2)} USD`);
  console.log(`- BTC price on July 8, 2022 @ 12am EST (My Birthdate): $${btcPrice3.toFixed(2)} USD`);

}).catch(function (error) {
    console.log(error);
});

