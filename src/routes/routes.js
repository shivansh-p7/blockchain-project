const express = require("express")
const router = express.Router()
const {getCoins} = require("../controllers/coinController")




router.get("/coins", getCoins)
module.exports = router