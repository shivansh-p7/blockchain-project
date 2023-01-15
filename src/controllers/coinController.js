const  axios = require("axios")
const CoinModel = require("../models/coinSchema")

const getCoins = async(req,res)=> {
try{
let bitcoinDetails = await axios.get("https://api.coincap.io/v2/assets")

let bitcoinData = bitcoinDetails.data

let storedData = await CoinModel.find()
if(storedData.length===0){

for(let i=0; i<bitcoinData.data.length; i++){
var obj={
    symbol : bitcoinData.data[i].symbol,
    name  : bitcoinData.data[i].name,
    marketCapUsd : bitcoinData.data[i].marketCapUsd,
    priceUsd : bitcoinData.data[i].priceUsd,

}
let createData = await CoinModel.create(obj)
}
return res.status(201).send({status:true, msg : "data has been created"})
}
else{
let getBitcoinData = await CoinModel.find().lean()
for(let i=0; i<getBitcoinData.length; i++){
    getBitcoinData[i].changePercent24Hr= bitcoinData.data[i].changePercent24Hr
}


    getBitcoinData.sort((a,b)=>Number(b.changePercent24Hr)-Number(a.changePercent24Hr))

 return res.status(200).send({status:true,Data:getData})
}
}
catch(err){
  return  res.status(500).send({status:false, msg : err.message})
}
}

module.exports.getCoins= getCoins