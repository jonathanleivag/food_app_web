import { FC } from "react";
import TheadComponent from "./thead.dashboard.component";
import TbodyComponent from "./tbody.dashboard.component";
import { TableComponentProps } from "@/type";

const TableComponent: FC<TableComponentProps> = ({ cart }) => {
  return (
    <table className="min-w-full divide-y divide-secondary-200">
      <TheadComponent />
      <TbodyComponent cart={cart} />
    </table>
  );
};

export default TableComponent;
