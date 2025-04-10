import { FC } from "react";

const TbodyComponent: FC = () => {
  return (
    <tbody className="bg-white divide-y divide-secondary-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          #12345
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent-success text-white">
            Completed
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          $150.00
        </td>
      </tr>
    </tbody>
  );
};

export default TbodyComponent;
