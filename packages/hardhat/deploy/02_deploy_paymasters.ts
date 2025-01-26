import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import fs from "fs";
import path from "path";

export function getAllSolidityFiles(dir: string) {
  const files = fs.readdirSync(dir);
  let solFiles: any[] = [];

  files.forEach((file: string) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      solFiles = solFiles.concat(getAllSolidityFiles(fullPath));
    } else if (file.toLowerCase().includes("paymaster")) {
      solFiles.push(fullPath);
    }
  });

  return solFiles;
}

const deploySimpleAccountFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  const paymasters = ["BasePaymaster", "ConfigurablePaymaster"];

  await Promise.allSettled(
    paymasters.map(async paymasterName => {
      await hre.deployments.deploy(paymasterName, {
        from: deployer,
        args: [],
        gasLimit: 6e6,
        log: true,
        deterministicDeployment: true,
      });
    }),
  );
};

export default deploySimpleAccountFactory;
