const express = require ('express')

const router = express.Router();

const { performTramsaction } = require("../services/getTransactionInfo")

router.post('/send',async(req,res) =>{
	try{

		console.log(req.body)
		const {srcPrivateKey, receiverAddress, amtToTransfer} = req.body
		
		const transactionReceipt = await performTramsaction(srcPrivateKey, receiverAddress, amtToTransfer)
        console.log(transactionReceipt)
		res.json(transactionReceipt)
		
	} catch(error){
		console.log("err--->",error)
		res.json({error:`Server Error: ${error}`,status:500})
	}

})

module.exports = router;
