import { Input, InputProps } from "antd";

function InputSearchGlobal({ width = 200, height = 40, ...props }: InputProps) {
  return (
    <Input
      className={`ant-search-global ${props.className}`}
      style={{ width: width, height: height }}
      allowClear
      {...props}
    />
  );
}
export { InputSearchGlobal };
