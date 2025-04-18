import { FC } from "react";

const TheadComponent: FC = () => {
  return (
    <thead className="bg-secondary-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
          Detail
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
          Amount
        </th>
      </tr>
    </thead>
  );
};

export default TheadComponent;
