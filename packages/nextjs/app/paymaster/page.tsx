import { Dashboard } from "./_components/Dashboard";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Paymaster Admin Dashboard</h1>
        <p className="text-neutral">You can setup & interact with your deployed Paymaster</p>
      </div>
      <Dashboard />
    </>
  );
};

export default Debug;
