import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 100 }}
            className="text-primaryLight"
            spin
          />
        }
      />
    </div>
  );
}
