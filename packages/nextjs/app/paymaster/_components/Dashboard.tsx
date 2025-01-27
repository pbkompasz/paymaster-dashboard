"use client";

import { useState } from "react";
import { DepositRecordsTable } from "./DepositRecordsTable";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

export function Dashboard() {
  const contractName = "BasePaymaster";
  // const contractData = useAllContracts()[contractName];
  const [selectedPaymaster, setSelectedPaymaster] = useState("");
  setSelectedPaymaster(contractName);

  const localPaymasters = Object.keys(useAllContracts()).filter(name => name.toLocaleLowerCase().includes("paymaster"));
  // const [networkName, setNetworkName] = useState("");
  const [deployedPaymasterAddress, setDeployedPaymasterAddress] = useState("");

  const [showEditWhitelist, setShowEditWhitelist] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      {showEditWhitelist}
      {!localPaymasters.length ? (
        <p className="text-3xl mt-14">
          No Paymaster found! <br />
          Specify a deployed Paymaster that you would like to edit
        </p>
      ) : (
        <div className="text-center">
          Found {localPaymasters.length} local Paymaster{localPaymasters.length > 1 ? "s" : ""}, select one
          <br />
          -OR-
          <br />
          Specify a deployed Paymaster that you would like to edit
          <br />
          <div className="flex flex-row justify-center">
            <input
              className="border-primary bg-base-100 text-base-content placeholder:text-base-content/50 p-2 mr-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
              type="text"
              value={deployedPaymasterAddress}
              placeholder="Address"
              onChange={e => setDeployedPaymasterAddress(e.target.value)}
            />
          </div>
        </div>
      )}
      {(localPaymasters.length || selectedPaymaster) && (
        <>
          <div>
            <h2>Balances</h2>
            <p>Total Balance(in gas currency)</p>
            <div>
              <p>Total Balance</p>
              {/* <Balance address="0x26BfbD8ED2B302ec2c2B6f063C4caF7abcB062e0" /> */}
            </div>
            <div>
              {/* TODO Select ERC-20 from list or add a custom one */}
              <select name="" id=""></select>
              <button>Set as gas currency</button>
            </div>
            {/* Connects wallet and deposits funds in gasCurrency */}
            <button>Deposit</button>
          </div>
          <div>
            <h3>Moderate usage</h3>
            {/* Opens modal to add rules for contract address */}
            {/* Workflow:
              1. Add name, contractAddress and chain
              2. Fetch ABI
              3. Pick methods that you would like to support
              4. Specify max spend limit for contract per account
              5. Pick unsupported methods
             */}
            <button onClick={() => setShowEditWhitelist(true)}>Edit smart contract moderation list</button>
          </div>
          <div>
            <h2>Activity</h2>
            <h3>Deposit Records</h3>
            {/* Fetch deposit records from etherscan on all chains */}
            <DepositRecordsTable></DepositRecordsTable>
            {/* Show consumption records in 3 views
              1. Historical
              2. Merged by contract address
              3. Merged by user 
            */}
            <h3>Consumption Records</h3>
          </div>
        </>
      )}
    </div>
  );
}
