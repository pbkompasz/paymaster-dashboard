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
      <table>
        <th>
          <td>Date & Time</td>
          <td>Network</td>
          <td>Amount</td>
          <td>From</td>
          <td>Tx</td>
          <td>Balance</td>
        </th>
        {depositRecords.map(deposit => (
          <tr key={deposit.tx}>
            <td></td>
          </tr>
        ))}
      </table>
    </div>
  );
};
