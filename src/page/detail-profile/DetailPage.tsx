import "./DetailPage.scss";
import { Button, Form, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { getProfile } from "../../service/api-service";
import { IProductRes, IProfile, IResProfile } from "../../interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";

export function DetailPage() {
  const [dataProfile, setDataProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const onFinish = (value: any) => {
    console.log("value", value);
  };
  useEffect(() => {
    getProfile().then((res: IResProfile) => {
      if (res.message === "OK") {
        setDataProfile(res?.data);
        console.log("done", res);
      }
    });
  }, []);
  //upload anh
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <div className="detail-container">
      <div className="detail-box">
        <div className="title-detail"> Detail Profile</div>
        <div className="form-box">
          <Form
            name="form-profile"
            initialValues={dataProfile}
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item name="avatar">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item label="Email">
              <div>{dataProfile?.email}</div>
            </Form.Item>
            <Form.Item label="User Name">
              <div>{dataProfile?.name}</div>
            </Form.Item>
            <Form.Item label="Description">
              <div>{dataProfile?.description}</div>
            </Form.Item>
            <Form.Item label="State">
              <div>{dataProfile?.state}</div>
            </Form.Item>
            <Form.Item label="Region">
              <div>{dataProfile?.region}</div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {" "}
                thay ava
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
