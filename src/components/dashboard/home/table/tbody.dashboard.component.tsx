import { TableComponentProps } from "@/type";
import { formatChileanPesos } from "@/utils/formatChileanPesos.util";
import { FC } from "react";

const TbodyComponent: FC<TableComponentProps> = ({ cart }) => {
  return (
    <tbody className="bg-white divide-y divide-secondary-200">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          #{cart.id.slice(5, 10)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
          <ul className="flex flex-col gap-3">
            {cart.items.map((item) => (
              <li key={item.product.id}>
                <div className="flex flex-col">
                  <div>
                    {item.product.name} {formatChileanPesos(item.product.price)}{" "}
                    {item.quantity > 1 && `x${item.quantity}`}
                  </div>
                  {item.extra !== 0 && <div> extra: ${item.extra} </div>}
                </div>
              </li>
            ))}
          </ul>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent-success text-white">
            Completed
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
          {formatChileanPesos(cart.total)}
        </td>
      </tr>
    </tbody>
  );
};

export default TbodyComponent;
