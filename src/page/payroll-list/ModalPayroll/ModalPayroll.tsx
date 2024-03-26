import { Form, Input, Modal, Select } from "antd";

interface IModal {
  isOpen: boolean;
}
export function ModalPayroll(props: IModal) {
  const onFinish = (value: any) => {};
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
  return (
    <div className="modal-container">
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Modal open={props.isOpen}>
          <Form.Item label="Client" name="client">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={optionStatus} />
          </Form.Item>
          <Form.Item label="Invoice" name="invoice">
            <Input />
          </Form.Item>
          <Form.Item label="Currency" name="currency">
            <Select options={optionCurrency} />
          </Form.Item>
          <Form.Item label="Total" name="total">
            <Input />
          </Form.Item>
        </Modal>
      </Form>
    </div>
  );
}
