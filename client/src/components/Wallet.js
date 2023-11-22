import React from "react";
import { walletInfo } from "./constants";
import { useBalance } from "../contextApi/BalanceContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Spinner,
} from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useDataFetch from "../custom-hook/useDataFetch";

const Wallet = () => {
  const { balanceAvl } = useBalance();

  const myAddress = "0xbFc0eBEFbD55BaA0f4EE9Ca6489D1Ae648e5885a";

  const { data, loading, error, doTryAgain } = useDataFetch(
    "http://localhost:8000/account/balance/0xbFc0eBEFbD55BaA0f4EE9Ca6489D1Ae648e5885a"
  );
  console.log(data);
  const history = useHistory();
  return (
    <Card className="my-2">
      <CardHeader className="text-center" tag="h4">
        Wallet Information
      </CardHeader>
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <h6 className="my-3">Fetching Info... Please Wait</h6>
          <Spinner
            color="primary"
            style={{
              height: "3rem",
              width: "3rem",
              marginBottom: "10px",
            }}
          >
            Loading...
          </Spinner>
        </div>
      ) : error ? (
        <div className="d-flex flex-column align-items-center">
          <p className="text-danger my-0 mt-1">Its an error :/</p>
          <h6 className="text-danger"> {error}</h6>
          <Button color="danger" onClick={() => doTryAgain()}>
            Try Again
          </Button>
        </div>
      ) : (
        <CardBody>
          <CardText className="my-2">
            <strong>Address: </strong>
            {data?.account}
          </CardText>
          <CardText>
            <strong>Balance: </strong>
            {+data?.balance}
          </CardText>
          <Button color="primary" onClick={() => history.push("/addresses")}>
            Transfer Eth
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default Wallet;
