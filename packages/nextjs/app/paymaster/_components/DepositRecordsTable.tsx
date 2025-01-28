import { useState } from "react";

type DepositRecord = {
  date: Date;
  tx: string;
  network: string;
  amount: number;
  fromAddress: string;
  // In `selectedCurrency`
  balanceAfter: number;
};

export const DepositRecordsTable = () => {
  const [depositRecords] = useState<DepositRecord[]>([]);

  return (
    <div className="flex text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-0">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3">
              Network
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Tx
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {depositRecords.map(deposit => (
            <tr key={deposit.tx} className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                {+deposit.date}
              </th>
              <td className="px-6 py-4">{deposit.network}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{deposit.amount}</td>
              <td className="px-6 py-4">{deposit.fromAddress}</td>
              <td className="px-6 py-4">{deposit.tx}</td>
              <td className="px-6 py-4">{deposit.balanceAfter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
