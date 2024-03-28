import { Select, SelectProps } from "antd";
import "./index.scss";
interface ISelectGlobalProps extends SelectProps {
  width?: number;
  height?: number;
}
function SelectGlobal({
  width = 200,
  height = 40,
  ...props
}: ISelectGlobalProps) {
  return (
    <Select
      allowClear
      {...props}
      className={`ant-select-global ${props.className}`}
      style={{ width: width, height: height }}
    />
  );
}
export { SelectGlobal };
