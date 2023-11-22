import React from "react";
import { useBalance } from "../contextApi/BalanceContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Spinner,
} from "reactstrap";
import useDataFetch from "../custom-hook/useDataFetch";
const Transaction = ({ addressInfo }) => {
  const { balanceAvl } = useBalance();

  const { data, loading, error, doTryAgain } = useDataFetch(
    "http://localhost:8000/account/history"
  );
  console.log(data);
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h5>Transaction History</h5>
      </div>
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <h6 className="my-3">Fetching history... Please Wait</h6>
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
      ) : data.length > 0 ? (
        data?.map((item, key) => (
          <Card className="my-2">
            <CardHeader className="text-center" tag="h4">
              Transaction #{key + 1}
            </CardHeader>
            <CardBody>
              <CardText className="my-2">
                <strong>From: </strong>
                {item?.from}
              </CardText>
              <CardText>
                <strong>To: </strong>
                {item?.to}
              </CardText>
              <CardText className="my-2">
                <strong>Transaction Hash: </strong>
                {item?.hash}
              </CardText>
              <CardText className="my-2">
                <strong>Time: </strong>
                {item?.time}
              </CardText>
              <CardText className="my-2">
                <strong>Amount Transfered: </strong>
                {item?.amount}
              </CardText>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card className="my-2">
          <CardHeader className="text-center" tag="h4">
            Transaction
          </CardHeader>
          <CardBody>
            <CardText className="my-2 text-center">
              <strong>No Transaction history to display :/ </strong>
            </CardText>{" "}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Transaction;
