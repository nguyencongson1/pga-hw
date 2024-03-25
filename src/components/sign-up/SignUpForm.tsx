import "./SignUpForm.scss";
import logo from "../../assets/images/logo-pwa.png";
import { Button, Form, Input, Select } from "antd";
import { ILocationRes, IOptionCity, ISignUp } from "../../interface";
import { useEffect, useMemo, useState } from "react";
import { getCity, getLocation, signUp } from "../../service/api-service";
import { storeRedux } from "../../redux/store-redux";

export default function SignUpForm() {
  const [itemLocation, setItemLocation] = useState<ILocationRes[]>([]);
  const [optionCity, setOptionCity] = useState<IOptionCity[]>([]);
  const handleFinish = (item: ISignUp) => {
    console.log("signup", item);
    signUp(item)
      .then((res) => {
        console.log("aaaaaaaaaaaaaaaaaa", res);
        if (res?.error === true) {
          console.log("yes");
        }
        if (res.error === false) {
          console.log("no");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getLocation().then((res) => {
      setItemLocation(res?.data);
    });
  }, []);
  const optionLocation = useMemo(() => {
    return itemLocation.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }, [itemLocation]);

  const handleChangeRegion = (e: number) => {
    getCity(e).then((res) => {
      const cityData = res?.data;
      const CityList = cityData.map((item: ILocationRes) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setOptionCity(CityList);
    });
  };
  const sex = [
    {
      value: "male",
      label: "Nam",
    },
    {
      value: "female",
      label: "Nữ",
    },
  ];
  const a = storeRedux.getState();
  console.log("ssssssssssss", a);
  return (
    <div className="form-container">
      <div className="signup-box">
        <img src={logo} alt="logo" />
        <Form
          initialValues={{}}
          className="form-sign-up"
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "không để trống Email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "không để trống mật khẩu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            label="Xác nhận lại mật khẩu"
            rules={[{ required: true, message: "xác nhận lại mật khẩu !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Không để trống tên !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "lựa chọn giới tính!" }]}
          >
            <Select placeholder="--slect an option--" options={sex} />
          </Form.Item>
          <Form.Item
            name="region"
            label="Quốc gia"
            rules={[{ required: true, message: "lựa chọn quốc gia!" }]}
          >
            <Select
              onChange={(value) => handleChangeRegion(value)}
              placeholder="--slect an option--"
              options={optionLocation}
            />
            {/* options={optionLocation} */}
          </Form.Item>
          <Form.Item
            name="state"
            label="Thành phố "
            rules={[{ required: true, message: "xác nhận lại mật khẩu !" }]}
          >
            <Select placeholder="--slect an option--" options={optionCity} />
          </Form.Item>
          <Form.Item className="form-button">
            <Button type="primary" htmlType="submit">
              Đăng ký ngay
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
