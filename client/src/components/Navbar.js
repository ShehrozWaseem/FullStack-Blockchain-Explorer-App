import React from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Transfer from "./Transfer";
import { useState } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { randomHashArray } from "./constants";
import { useParams } from "react-router-dom";

const Navbar = () => {



    const history = useHistory()
    const loc = useLocation()
    const pathname = loc?.pathname
    const params = useParams(); // Call useParams unconditionally
    const [nav,selectNav] = useState(pathname?.includes('addresses')  ? "2" : pathname?.substring(1) === 'transaction' ? "1" : "3")
    console.log(loc)
    const onClickItem = (tabId) => {
        if(tabId==="1"){
            selectNav("1")
            history.push("/transaction")
        }else if(tabId==="2"){
            selectNav("2")
            history.push("/addresses")
        }else{
            selectNav("3")
            history.push("/")
        }
    }
    useEffect(()=>{
        selectNav(pathname?.includes('addresses')  ? "2" : pathname?.substring(1) === 'transaction' ? "1" : "3")
    },[pathname])


    return (
        <div>
            <Nav tabs>
            <NavItem>
                <NavLink className={nav==="3"?"active":""} style={{cursor:"pointer"}}  onClick={()=>onClickItem("3")}>
                    Wallet
                </NavLink>
                </NavItem>

                <NavItem>
                <NavLink className={nav==="2"?"active":""} style={{cursor:"pointer"}}  onClick={()=>onClickItem("2")}>
                    Addresses
                </NavLink>
                </NavItem>

                <NavItem>
                <NavLink className={nav==="1"?"active":""} style={{cursor:"pointer"}} onClick={()=>onClickItem("1")}>
                    Transactions
                </NavLink>
                </NavItem>

            </Nav>
        </div>
    );
};

export default Navbar;
