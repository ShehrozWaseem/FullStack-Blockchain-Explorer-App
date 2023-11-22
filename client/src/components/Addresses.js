import React, { useState, useEffect } from "react";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { randomHashArray } from "./constants";
import { Link } from "react-router-dom";
import useDataFetch from "../custom-hook/useDataFetch";
import { useBalance } from "../contextApi/BalanceContext";
const Addresses = () => {
  const { dispatch, balanceAvl } = useBalance();

  const saveToContext = (add) => {
    dispatch({ type: "ADDRESSES", addresses: add });
  };
  console.log("balanceAvl balanceAvlbalanceAvl", balanceAvl);

  const { data, loading, error, doTryAgain } = useDataFetch(
    "http://localhost:8000/account/addresses",
    saveToContext
  );

  console.log("data---->", data, loading);
  return (
    <div className="d-flex flex-column align-items-center">
      {loading ? (
        <>
          <h3 className="my-3">Loading... Please Wait</h3>
          <Spinner
            color="primary"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          >
            Loading...
          </Spinner>
        </>
      ) : error && !data ? (
        <div className="d-flex flex-column align-items-center">
          <p className="text-danger my-0 mt-1">Its an error :/</p>
          <h6 className="text-danger"> {error}</h6>
          <Button color="danger" onClick={() => doTryAgain()}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <h3 className="my-3">Click any below Address to transfer eth</h3>
          <ListGroup>
            {data?.map((item) => (
              <ListGroupItem className="p-3">
                <Link to={`/addresses/${item}`} className="addressItem">
                  {item}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default Addresses;
