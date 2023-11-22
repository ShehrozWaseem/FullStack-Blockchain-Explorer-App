import React from 'react'
import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'

const Reciept = ({addressInfo={},resetTransaction,amtVal=null,remBalance=0}) => {
  return (
    <Card
    className="my-2">
    <CardHeader className="text-center" tag="h4">
      RECIEPT
    </CardHeader>
    <CardBody>
      <CardTitle tag="h6" className="mb-3">
       Your transaction was successful below is the reciept
      </CardTitle>
      <CardText className="my-2">
        <strong>From: </strong>
        {addressInfo?.addFrom}
      </CardText>
      <CardText className="my-2">
        <strong>To: </strong>
        {addressInfo?.addTo}
      </CardText>
      <CardText className="my-2">
        <strong>Block Hash: </strong>
        {addressInfo?.blkHash}
      </CardText>
      <CardText className="my-2">
        <strong>To: </strong>
        {addressInfo?.transHash}
      </CardText>
      <CardText className="my-2">
        <strong>Block Number: </strong>
        {addressInfo?.blockNum}
      </CardText>
      <CardText className="my-2">
        <strong>Amount Transfered: </strong>
        {amtVal}
      </CardText>
      {/* <CardText className="my-2">
        <strong>Remaining Balance: </strong>
        {remBalance}
      </CardText> */}
      {/* Lifting the state up by resetting reciept component will disppers */}
      <Button  color="danger" onClick={()=>resetTransaction()}>
            Intitate a New Transaction
    </Button>
    <p style={{fontSize:"12px"}} className='text-danger mt-2'>Please note that this reciept will be deleted when you Intiate a new transaction from here</p>    </CardBody>
  </Card>
  )
}

export default Reciept