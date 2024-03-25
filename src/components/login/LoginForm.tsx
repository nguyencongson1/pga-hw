import React from "react";
import "./LoginForm.scss";
import { Button, Checkbox, Form, Input } from "antd";

import logo from "../../assets/images/logo-pwa.png";
import { login } from "../../service/api-service";
import { setItem } from "../../utils/storage-utils";
import { useNavigate } from "react-router-dom";
import { setToken, storeRedux } from "../../redux/store-redux";

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const onFinish = (value: ILoginForm) => {
    // console.log("thanh cong",value);
    login(value)
      .then((res) => {
        if (res?.success === true) {
          storeRedux.dispatch(setToken(res.user_cookie));
          setItem("key", res.user_cookie);
        }
        if (res.user === false) {
          alert(res?.errors?.email);
        }
        console.log("aa", localStorage.getItem("key"));
      })
      .catch((err) => {});
  };
  console.log("sasdasdasdasdasdasdasdasd", storeRedux.getState());
  return (
    <div className="login-container">
      <div className="box-login">
        <img src={logo} alt="anh logo" />
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="form-login"
        >
          <Form.Item
            label="Địa chỉ email"
            name="email"
            rules={[
              { required: true, message: "Không để trống trường username!" },
            ]}
            className="form-item"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "không để trống trường password!" },
            ]}
            className="form-item"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="form-item"
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Lưu mật khẩu đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item className="form-button">
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <Button onClick={() => navigate("/sign-up")}>Đăng ký</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
