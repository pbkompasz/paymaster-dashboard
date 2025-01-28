"use client";

import { useEffect, useState } from "react";
import { DepositRecordsTable } from "./DepositRecordsTable";
import { WhitelistDialog } from "./WhitelistDialog";
import { Dropdown } from "flowbite-react";
import { GenericContract } from "~~/utils/scaffold-eth/contract";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

type Paymaster = {
  local: boolean;
  name: string;
  data: GenericContract;
};

export function Dashboard() {
  const contractDatas = useAllContracts();
  const [contractData, setContractData] = useState<GenericContract>();
  const [selectedPaymaster] = useState<Paymaster | null>();
  // setSelectedPaymaster(contractName);

  const localPaymasters = Object.keys(useAllContracts()).filter(name => name.toLocaleLowerCase().includes("paymaster"));
  // const [networkName, setNetworkName] = useState("");
  const [deployedPaymasterAddress, setDeployedPaymasterAddress] = useState("");

  const [showEditWhitelist, setShowEditWhitelist] = useState(false);
  const [deployedPaymasters] = useState([]);
  const [monintoredChains] = useState([]);
  const [currencySelectorModified] = useState(false);

  useEffect(() => {
    if (!selectedPaymaster) return;
    if (selectedPaymaster.local) {
      setContractData(contractDatas[selectedPaymaster.name]);
    } else {
    }
  }, [selectedPaymaster]);

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 w-full p-4">
      {localPaymasters.length && (
        <div className="text-center bg-secondary p-10">
          <h1 className="text-4xl my-0">Paymaster Admin Dashboard</h1>
          <p className="text-neutral">You can setup & interact with your deployed Paymaster</p>
          <p>
            Found {localPaymasters.length} local Paymaster {localPaymasters.length > 1 ? "s" : ""} and{" "}
            {deployedPaymasters.length} deployed on {monintoredChains.length} chains that interact with the official
            singleton EntryPoint contracts
          </p>
        </div>
      )}
      <br />
      <div className="flex flex-row-reverse gap-4">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create new
        </button>
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Specify a deployed Paymaster that you would like to edit
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={e => setDeployedPaymasterAddress(e.target.value)}
            value={deployedPaymasterAddress}
            defaultValue="Choose a country"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      {(localPaymasters.length || selectedPaymaster) && (
        <div className="flex flex-col gap-4">
          {contractData?.address}
          <div className="flex flex-row gap-4 justify-evenly">
            <div className="rounded-xl border-solid border-2 p-2 w-full">
              <h2 className="underline text-xl">Balances</h2>
              <div className="flex flex-row justify-evenly">
                <div className="flex gap-4 flex-col w-[50%]">
                  <div>
                    <p className="text-lg m-0">Total Balance(in gas currency)</p>
                    <p className="m-0 pl-2"> value</p>
                  </div>
                  <div>
                    <p className="text-lg m-0">Total Balance</p>
                    <p className="m-0 pl-2">value</p>
                  </div>
                </div>
                <div className="flex flex-col w-[50%] justify-start">
                  {/* TODO Select ERC-20 from list or add a custom one */}
                  <p className="text-lg mt-0">Gas Currency</p>
                  <div className="flex flex-row gap-4 pl-2">
                    <Dropdown label="Gas Currency">
                      <Dropdown.Item>Dashboard</Dropdown.Item>
                      <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Item>Earnings</Dropdown.Item>
                      <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <button
                      type="button"
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 
                        ${currencySelectorModified ? " cursor-not-allowed" : ""}`}
                      disabled={currencySelectorModified}
                    >
                      Set as gas currency
                    </button>
                  </div>
                  {/* Connects wallet and deposits funds in gasCurrency */}
                  <div className="pl-2 mt-2">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-solid border-2 p-2 px-4 min-w-[30%]">
              <h3 className="underline text-xl">Moderate usage</h3>
              {/* Opens modal to add rules for contract address */}

              <div className="flex items-center mb-4">
                <input
                  id="exclusiveContract"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="exclusiveContract"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Can interact with any contract
                </label>
              </div>
              <button onClick={() => setShowEditWhitelist(true)}>Edit smart contract moderation list</button>
              <WhitelistDialog show={showEditWhitelist} onClose={() => setShowEditWhitelist(false)}></WhitelistDialog>
            </div>
          </div>
          <div className="rounded-xl border-solid border-2 p-2">
            <h2 className="underline text-xl">Activity</h2>
            <h3 className="text-lg">Deposit Records</h3>
            {/* Fetch deposit records from etherscan on all chains */}
            <DepositRecordsTable></DepositRecordsTable>
            {/* Show consumption records in 3 views
              1. Historical
              2. Merged by contract address
              3. Merged by user 
            */}
            {/* <h3>Consumption Records</h3> */}
          </div>
        </div>
      )}
    </div>
  );
}
