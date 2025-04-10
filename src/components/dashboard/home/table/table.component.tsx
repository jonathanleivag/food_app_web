import { FC } from "react";
import TheadComponent from "./thead.component";
import TbodyComponent from "./tbody.component";

const TableComponent: FC = () => {
  return (
    <table className="min-w-full divide-y divide-secondary-200">
      <TheadComponent />
      <TbodyComponent />
    </table>
  );
};

export default TableComponent;
