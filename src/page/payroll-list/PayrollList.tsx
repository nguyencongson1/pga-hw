import { Button, DatePicker, Table } from "antd";
import { InputSearchGlobal } from "../../components/InputGlobal";
import { SelectGlobal } from "../../components/SelectGlobal";
import "./PayrollList.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/api-service";
import { IProductRes } from "../../interface";
import { ColumnsType } from "antd/es/table";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { ModalPayroll } from "./ModalPayroll/ModalPayroll";

export default function PayrollPage() {
  const [dataProduct, setDataProduct] = useState<IProductRes[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const columns: ColumnsType<IProductRes> = [
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const colorText = () => {
          if (record.status === "PROCESSING") return "yellow";
          if (record.status === "FULFILLED") return "green";
          if (record.status === "PENDING") return "none";
          if (record.status === "RECEIVED") return "aqua";
        };
        return <div className={colorText()}>{record.status}</div>;
      },
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => {
        return <div className="text-table">{record.createdAt}</div>;
      },
    },
    {
      title: "Client",
      key: "client",
      render: (_, record) => {
        return <div className="text-table">{record.client}</div>;
      },
    },
    {
      title: "Currency",
      key: "currency",
      render: (_, record) => {
        return <div className="text-table">{record.currency}</div>;
      },
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => {
        return <div className="text-table">{record.total}</div>;
      },
    },
    {
      title: "Invoice #",
      key: "invoice",
      render: (_, record) => {
        return <div className="text-table">{record.invoice}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="action-btn">
            <Button className="update-btn" onClick={hanldeUpdate}>
              Update
            </Button>
            <Button className="delete-btn">
              <DeleteFilled />
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getProducts().then((res: any) => {
      setDataProduct(res.data);
      console.log("product", res);
    });
  }, []);
  const handleAdd = () => {
    setIsOpenModal(true);
  };
  const hanldeUpdate = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="payroll-container">
      <div className="content-box">
        <div className="first-map">
          <div className="first-title"> Payroll Transactions List</div>
          <Button className="add-btn" type="primary" onClick={handleAdd}>
            <PlusOutlined /> Add
          </Button>
        </div>
        <div className="global-button">
          <div className="left-btn">
            <SelectGlobal placeholder="Status" />
            <SelectGlobal placeholder="Client" />
            <DatePicker className="date-btn" />
            <DatePicker className="date-btn" />
            <InputSearchGlobal placeholder="invoice#" />
          </div>
          <div className="right-btn">
            <Button className="apply-btn">Apply</Button>
            <Button className="clear-btn">Clear</Button>
          </div>
        </div>
        <div className="table-box">
          <Table
            className="table-content"
            columns={columns}
            dataSource={dataProduct}
          />
        </div>
        <ModalPayroll isOpen={isOpenModal} />
      </div>
    </div>
  );
}
