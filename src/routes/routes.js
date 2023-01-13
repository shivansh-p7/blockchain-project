const express = require("express")
const router = express.Router()
const {getCoins} = require("../controllers/coinController")

router.get("/test", (req, res)=> {
    res.send("hi i am api")
})


router.get("/coins", getCoins)
module.exports = router