import { Button, DatePicker, Modal, Table, message } from "antd";
import { InputSearchGlobal } from "../../components/InputGlobal";
import { SelectGlobal } from "../../components/SelectGlobal";
import "./PayrollList.scss";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../service/api-service";
import { IProductRes, typeUpdate } from "../../interface";
import { ColumnsType } from "antd/es/table";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { ModalPayroll } from "./ModalPayroll/ModalPayroll";

export default function PayrollPage() {
  const [dataProduct, setDataProduct] = useState<IProductRes[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<typeUpdate>({ type: "add" });
  const [initValue, setInitValue] = useState<IProductRes>({});
  const [reload, setReload] = useState(false);
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
      render: (index, record) => {
        return (
          <div key={index} className="text-table">
            {record.total}
          </div>
        );
      },
    },
    {
      title: "Invoice #",
      key: "invoice",
      render: (index, record) => {
        return (
          <div key={index} className="text-table">
            {record.invoice}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="action-btn">
            <Button
              className="update-btn"
              onClick={() => hanldeUpdate(record)}
              key="update-btn"
            >
              Update
            </Button>
            <Button
              className="delete-btn"
              key="delete-btn"
              onClick={() => handleDelete(record.id)}
            >
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
    });
  }, [isOpenModal, reload]);
  const handleAdd = () => {
    setIsOpenModal(true);
    setTypeModal((prev) => ({ ...prev, type: "add" }));
    setInitValue({});
  };
  const hanldeUpdate = (value: IProductRes) => {
    setIsOpenModal(true);
    setTypeModal(() => ({ id: value.id, type: "edit" }));
    setInitValue(value);
  };
  const handleDelete = (id: number | undefined) => {
    Modal.warning({
      title: "Warning",
      content: (
        <div>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Bạn có chắc muốn xóa không ?
          </span>
        </div>
      ),
      onOk() {
        deleteProduct(id).then((res) => {
          if (res.message === "OK") {
            message.success("Delete payroll success");
            setReload(!reload);
          } else {
            message.error("err");
          }
        });
      },
    });
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
            dataSource={dataProduct.map((item) => ({ ...item, key: item.id }))}
            scroll={{ y: 450 }}
          />
        </div>
        <ModalPayroll
          isOpen={isOpenModal}
          cancel={() => setIsOpenModal(false)}
          typeModal={typeModal}
          initValue={initValue}
        />
      </div>
    </div>
  );
}
