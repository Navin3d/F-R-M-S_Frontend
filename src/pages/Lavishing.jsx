import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { CloseOutlined } from "@ant-design/icons"
import Table from 'react-bootstrap/Table';

import FrmsContract from "../blockchain/FRMS-Contract";


import "../styles/pages/Lavishing.css";

const INITIAL_STATE = {
    0: ["Fetching..."],
    1: ["Please Be Patient..."]
}

const Lavishing = () => {

    const [fundRequests, setFundRequests] = useState(INITIAL_STATE);

    useEffect(() => {
        // console.log(`Web3 Version from Home.jsx: ${web3.version}`);
        // web3.eth.getAccounts().then(console.log);
        FrmsContract.methods.getAllRequests().call().then(setFundRequests);
    }, []);

    return (
        <div>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Reason</th>
                            <th>Amount</th>
                            <th>Agree</th>
                            <th>Dis-Agree</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fundRequests["0"].map((req, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{req}</td>
                                    <td>{fundRequests["1"].at(index)} ETH</td>
                                    <td><button className="agree-button"  >Vote</button></td>
                                    <td><button className="disagree-button"><CloseOutlined /></button></td>
                                </tr>
                                // <h1 key={index}>{req} - {fundRequests["1"].at(index)}</h1>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );

};

export default Lavishing;
