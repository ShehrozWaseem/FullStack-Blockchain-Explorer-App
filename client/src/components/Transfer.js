import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import Reciept from "./Reciept";
import { useParams, Link } from "react-router-dom";
import { randomHashArray, walletInfo } from "./constants";
import { useBalance } from "../contextApi/BalanceContext";
import Randomstring from "randomstring";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Transfer = () => {
  const { add } = useParams();
  // console.log(add, add?.includes(randomHashArray));
  // const isAddFromData = true || randomHashArray?.includes(add);
  const isAddFromData = true;
  const history = useHistory();
  // address info which will be passed to reciept compinent as prop as it is using that info
  const [addressInfo, setAddressInfo] = useState({
    addFrom: walletInfo?.address,
    addTo: "",
    blkHash:
      "0x8a36f255f29545ab110ed6747ca1550a72c432c12c654bf8d869f35b4dcd9837",
    transHash:
      "0x731a3d26bc9719c646f35a8c01a8e9d8f5f151b25bea9de2b07a0f3df647b70e7",
    blk: 15,
    amtVal: 0,
    pvtKey: "",
    selectedAdd: "",
  });

  const [error, setError] = useState(false);

  const [recieptError, setRecieptError] = useState(false);
  const [recieptData, setRecieptData] = useState({});

  const [amtVal, setValue] = useState(null);

  //we'll update the state of parent component from child i.e reciept using below state var
  const [doTransfer, setTransfer] = useState(false);

  const [inv, setInvalid] = useState(null);

  //getting balance from global state var
  const { balanceAvl, dispatch } = useBalance();

  const addressesData = balanceAvl?.addresses?.filter(
    (address) => address != add
  );

  const onChangeVal = (e) => {
    setValue(+e.target.value);

    // If entered value is zero or lesser then raise error it will go to if condition else it wont go to if and the erro state will remain false
    setError(false);
    // console.log(balanceAvl?.balance);
    if (e.target.value <= 0 || balanceAvl?.balance < +e.target.value) {
      setError(
        balanceAvl?.balance < e.target.value
          ? `You dont have enough balance. Your current balance is: ${balanceAvl?.balance}`
          : "Please enter an amount greater than 0"
      );
    }
  };

  useEffect(() => {
    if (!addressesData?.length) {
      history.push("/addresses");
    } else {
      setAddressInfo({ ...addressInfo, addTo: addressesData[0] });
    }
  }, []);

  const resetTransaction = () => {
    setTransfer(!doTransfer);
    setValue("");
    setRecieptData({});
  };

  const submitTransaction = async () => {
    setInvalid(null);
    setRecieptError(null);
    // console.log(addressInfo)
    if (!addressInfo?.pvtKey) {
      setInvalid("privatekey");
      setError("Please Enter Senders Private Key");
      return;
    }
    if (!addressInfo?.addTo) {
      setInvalid("address");
      setError("Please Select Address to who you want to transfer");
      return;
    }
    // const currentDate = new Date();
    // console.log(amtVal);

    // setTransfer(true);
    // dispatch({ type: "TRANSFER", amount: +amtVal,transaction:{
    //   hash:`0x${Randomstring.generate({
    //     length: 46,
    //     charset: 'alphanumeric'
    //   })}`,
    //   status:"Success",
    //   time:currentDate.toLocaleString(),
    //   from:walletInfo?.address,
    //   to:add,
    //   amount: +amtVal
    // } });
    const endpoint = "http://localhost:8000/transaction/send";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        srcPrivateKey: addressInfo?.pvtKey,
        receiverAddress: addressInfo?.addTo,
        amtToTransfer: +amtVal,
      }),
    };

    try {
      const response = await fetch(endpoint, requestOptions);
      console.log(response);

      const result = await response.json();

      if (result?.error) {
        throw new Error(`${result?.error}. Please try again.`);
      }

      setTransfer(true);

      setRecieptData({
        blkHash: result?.blockHash,
        addTo: result?.blockHash,
        addFrom: result?.from,
        transHash: result?.transactionHash,
        blockNum: result?.blockNumber,
        amtVal: +amtVal,
      });
      console.log("Transaction result:", result);
    } catch (error) {
      setRecieptError(`Error sending transaction:${error}`);

      console.log("Error sending transaction:", error);
    }
  };
  // console.log(addressInfo)
  return (
    <>
      <Card className="my-2">
        <CardHeader className="text-center" tag="h4">
          Transfer Ethers
        </CardHeader>
        <CardBody>
          <CardTitle tag="h6" className="mb-3">
            Your Ether will be transfered to below information
          </CardTitle>
          <CardText className="my-2 fromAdd">
            <strong>From: </strong>
            {add}
            {/* <Input
            id="addFrom"
            name="addFrom"
            // placeholder="Please Enter Your Private Key"
            type="text"
            disabled
            value={addressInfo?.addFrom}
          /> */}
          </CardText>
          <Label className="my-0">Private Key *</Label>
          <Input
            id="password"
            name="password"
            placeholder="Please Enter Your Private Key"
            type="password"
            onChange={(e) => {
              setError(false);
              setAddressInfo({ ...addressInfo, pvtKey: e.target.value });
            }}
            invalid={inv === "privatekey"}
          />
          <CardText
            style={{ color: balanceAvl?.addresses?.length ? "black" : "red" }}
          >
            {/* <strong>To: </strong>
            {addressInfo?.addTo}
            {!isAddFromData && (
              <>
                <br />
                <Link to="/addresses" className="mb-5">
                  Go to Addresses
                </Link>
              </>
            )} */}
            <Label for="selectAdd" className="mb-0 mt-2">
              Select Reciever Address
            </Label>
            <Input
              id="selectAdd"
              name="Select Address"
              type="select"
              onChange={(e) => {
                setError(false);
                setAddressInfo({ ...addressInfo, addTo: e.target.value });
              }}
              invalid={inv === "address"}
            >
              {balanceAvl?.addresses?.length
                ? addressesData?.map((item, key) => <option>{item}</option>)
                : "No Address Found"}
            </Input>
          </CardText>

          <span className="field">
            <InputGroup>
              <Input
                id="exampleNumber"
                name="number"
                placeholder="Enter Amount"
                type="number"
                min="0"
                step="1"
                onChange={onChangeVal}
                disabled={doTransfer || !isAddFromData}
                value={amtVal}
              />
              <Button
                disabled={amtVal < 1 || doTransfer || error}
                color="success"
                onClick={submitTransaction}
              >
                Transfer
              </Button>
            </InputGroup>
            {/* if error is true show error msg */}
            {error && (
              <span style={{ fontSize: "12px", color: "red" }}>{error}</span>
            )}
            {doTransfer && (
              <span style={{ fontSize: "12px", color: "blue" }}>
                Please clear the reciept to Intitate a new transaction
              </span>
            )}
          </span>
        </CardBody>
      </Card>
      {recieptData?.transHash && !recieptError && (
        <Reciept
          resetTransaction={resetTransaction}
          addressInfo={recieptData}
          amtVal={amtVal}
          remBalance={balanceAvl?.balance}
        />
      )}
      {recieptError && (
        <div className="d-flex flex-column align-items-center" style={{maxWidth:"675px"}}>
          <p className="text-danger my-0 mt-1">Transaction Failed :/</p>
          <h6 className="text-danger"> {recieptError}</h6>
        </div>
      )}
    </>
  );
};

export default Transfer;
