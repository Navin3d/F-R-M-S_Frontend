import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import Input from '@mui/material/Input';

import web3 from "../../blockchain/Web3";
import FrmsContract from "../../blockchain/FRMS-Contract";

import { MyButton } from "./Button";

import "../../styles/components/base/Navbar.css";


const Navbar = () => {

  const [contributionValue, setContributionValue] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [click, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    contributeHandler();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const contributeHandler = async () => {
    try {

      message.warn("This may take a while...");
      await FrmsContract.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(`${contributionValue}`, "ether")
      });

      message.success("Thanks For Contributing");

    } catch (e) {

      console.log("e", e);
      message.error(e.message);

    } finally {

    }
  }

  useEffect(() => {
    web3.eth.getAccounts().then(setAccounts);
  }, []);

  return (
    <div>
      <nav className="navbar" sticky="top">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          FRMS
        </NavLink>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/detail-stats" className="nav-links" onClick={closeMobileMenu}>
              Detail Stats
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/lavishing"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Lavishing
            </NavLink>
          </li>
          <li className="nav-item">
            <button className="btn" style={{ backgroundColor: "#050850", color: "white" }} onClick={showModal}>
              Contribute
            </button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <h5>Enter Amount to Contribute</h5>
              <Input onChange={(e) => { setContributionValue(e.target.value) }} value={contributionValue} />
            </Modal>
          </li>
        </ul>
        {/* <MyButton className={"btn"} style={{ backgroundColor: "#050850", color: "white" }} value={"Contribute"} onClick={contributeHandler} /> */}
      </nav>
    </div>
  );
}

export default Navbar;