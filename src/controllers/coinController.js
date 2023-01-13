const  axios = require("axios")
const CoinModel = require("../models/coinSchema")

const getCoins = async(req,res)=> {
try{
let data = await axios.get("https://api.coincap.io/v2/assets")
let coinData = data.data

let checkData = await CoinModel.find()
if(checkData.length===0){
let a = []
for(let i=0; i<coinData.data.length; i++){
var obj={
    symbol : coinData.data[i].symbol,
    name  : coinData.data[i].name,
    marketCapUsd : coinData.data[i].marketCapUsd,
    priceUsd : coinData.data[i].priceUsd,

}
let createData = await CoinModel.create(obj)
 a.push(obj)
}
return res.send({status:true, msg : "data has been created"})
}
else{
let getData = await CoinModel.find().lean()
for(let i=0; i<getData.length; i++){
    getData[i].changePercent24Hr= coinData.data[i].changePercent24Hr
}

for(let i=0; i<getData.length; i++){
    getData.sort((a,b)=>Number(b.changePercent24Hr)-Number(a.changePercent24Hr))
}
 return res.send(getData)
}
}
catch(err){
  return  res.status(500).send({status:false, msg : err.message})
}
}

module.exports.getCoins= getCoins