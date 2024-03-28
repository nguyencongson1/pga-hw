import "./ModalPayroll.scss";
import { Form, Input, Modal, Select, Space, message } from "antd";
import { IProductRes, typeUpdate } from "../../../interface";
import {
  addPayroll,
  getProductById,
  updateProduct,
} from "../../../service/api-service";
import { useEffect, useState } from "react";

interface IModal {
  isOpen: boolean;
  cancel: () => void;
  typeModal: typeUpdate;
  initValue: IProductRes;
}
export function ModalPayroll(props: IModal) {
  const [check, setCheck] = useState(false);
  const [form] = Form.useForm();
  const onFinishAdd = (value: IProductRes) => {
    addPayroll(value).then((res) => {
      if (res.message === "OK") {
        message.success("Add payroll success");
      } else {
        message.error("err");
      }
      props.cancel();
    });
  };
  const onFinishEdit = (value: IProductRes) => {
    updateProduct(value).then((res) => {
      if (res.message === "OK") {
        message.success("Edit payroll success");
      } else {
        message.error("err");
      }
    });
    props.cancel();
  };

  useEffect(() => {
    props.typeModal.type === "edit" ? setCheck(true) : setCheck(false);
  }, [props.typeModal.type]);
  const optionStatus = [
    {
      value: "PROCESSING",
      label: "PROCESSING",
    },
    {
      value: "FULFILLED",
      label: "FULFILLED",
    },
    {
      value: "PENDING",
      label: "PENDING",
    },
    {
      value: "RECEIVED",
      label: "RECEIVED",
    },
  ];
  const optionCurrency = [
    {
      value: "VNĐ",
      label: "VNĐ",
    },
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
  ];

  useEffect(() => form.resetFields(), [props.initValue]);
  return (
    <div className="modal-container">
      <Form
        name="form-payroll"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={props.initValue}
        onFinish={props.typeModal.type === "add" ? onFinishAdd : onFinishEdit}
        style={{ width: "100%" }}
      >
        <Modal
          width={1200}
          title={
            props.typeModal.type === "add" ? "Add Payroll" : "Edit Payroll"
          }
          open={props.isOpen}
          onCancel={props.cancel}
          onOk={() => {
            form.submit();
          }}
          className="modal-payroll"
          style={{ width: "100%" }}
        >
          <Space
            direction="vertical"
            className="left-modal"
            style={{ width: "49%", marginRight: "1%" }}
          >
            {check ? (
              <Form.Item label="Id" name="id">
                <Input disabled />
              </Form.Item>
            ) : (
              ""
            )}
            <Form.Item
              label="Client"
              name="client"
              rules={[{ required: true, message: "không để trống Client" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "không để trống Status" }]}
            >
              <Select options={optionStatus} />
            </Form.Item>
            <Form.Item
              label="Invoice"
              name="invoice"
              rules={[{ required: true, message: "không để trống Invoice" }]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Space
            direction="vertical"
            className="left-modal"
            style={{ width: "50%" }}
          >
            <Form.Item
              label="Currency"
              name="currency"
              rules={[{ required: true, message: "không để trống Currency" }]}
            >
              <Select options={optionCurrency} />
            </Form.Item>
            <Form.Item
              label="Total"
              name="total"
              rules={[{ required: true, message: "không để trống Total" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Funding Method"
              name="fundingMethod"
              rules={[
                { required: true, message: "không để trống Funding Method" },
              ]}
            >
              <Select options={[{ value: "Cash", label: "Cash" }]} />
            </Form.Item>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "không để trống Order" }]}
            >
              <Select
                options={[
                  { value: "Order 1", label: "Order 1" },
                  { value: "Order 2", label: "Order 2" },
                  { value: "Order 3", label: "Order 3" },
                  { value: "Order 4", label: "Order 4" },
                ]}
              />
            </Form.Item>
          </Space>
        </Modal>
      </Form>
    </div>
  );
}
