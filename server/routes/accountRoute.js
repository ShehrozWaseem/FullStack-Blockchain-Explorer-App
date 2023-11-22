const express = require('express');
const { getAddress, getBalance } = require('../services/getAccountInfo');
const { getTransactionHistory } = require('../services/getTransactionInfo');
const router = express.Router();

router.get('/addresses', async (req,res) => {	
	try {
		const allAddresses = await getAddress()
		console.log(allAddresses)
		res.json(allAddresses)
	} catch(error) {
		res.json({error:`Server Error: ${error}`,status:500})
	}
})

router.get('/balance/:address', async(req,res) => {
	try {
		const reqAddress = req.params.address
		const accountInfo = await getBalance(reqAddress)
		console.log(accountInfo)
		res.json(accountInfo)
	} catch(error) {
		res.json({error:`Server Error: ${error}`,status:500})
	}
})

router.get('/history', async (req,res) => {
	try {
		const transHistory = await getTransactionHistory()
		console.log(transHistory)
		res.json(transHistory)
	} catch(error) {
		res.json({error:`Server Error: ${error}`,status:500})
	}
})

module.exports = router;
