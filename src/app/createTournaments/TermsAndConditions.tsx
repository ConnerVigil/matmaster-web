import { Upload, Button, UploadProps, Input, message } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { FormData } from "./CreateEvent";
import { Upload01 } from "@untitled-ui/icons-react";

interface Props {
  control: Control<FormData>;
}

const { TextArea } = Input;

const TermsAndConditions = ({ control }: Props) => {
  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#53389E",
        "100%": "#53389E",
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <div>
      <h2 className="text-black text-xl font-semibold mb-4">
        Terms & Conditions{" "}
        <span className="font-light text-gray3">(optional)</span>
      </h2>

      <Upload maxCount={1} {...props}>
        <Button className="mb-4 text-primary" icon={<Upload01 />}>
          Upload
        </Button>
      </Upload>

      <div className="mb-4">or</div>

      <div className="mb-6">
        <Controller
          name="termsAndConditions"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextArea {...field} rows={6} placeholder="Terms and conditions" />
          )}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
