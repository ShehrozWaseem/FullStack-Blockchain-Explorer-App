const express = require ('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const defaultSnippet = require('./template/index.js')
const app = express()
require('dotenv').config(); 
const PORT =  process.env.PORT
// using old web 3 package for ease
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
	res.status(200).send(defaultSnippet)
})

/*
//Account route. Following Routes are handled in account route
/addresses -> fetches all the addresses
/balance/:Address -> fetches the balance and address for that particular address being passed from client
/history -> fetches history or past transactions saved in the database
*/
app.use('/account', require('./routes/accountRoute.js'));

/*
//Transaction route. This service handle all the activites performed related to transaction
/send -> this end point is used to send/transfer eth tokens
*/
app.use('/transaction', require('./routes/transactionRoute.js'));


app.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`)
})