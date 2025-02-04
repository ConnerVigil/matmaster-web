import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Upload01 } from "@untitled-ui/icons-react";
import { TournamentFormData } from "./zodSchemas";

interface Props {
  control: Control<TournamentFormData>;
  errors: FieldErrors<TournamentFormData>;
}

const { TextArea } = Input;

const TermsAndConditions = ({ control, errors }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileName, setfileName] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "File uploaded",
    });
  };

  return (
    <div>
      <h2 className="text-black text-xl font-semibold mb-4">
        Terms & Conditions{" "}
        <span className="font-light text-gray3">(optional)</span>
      </h2>

      {contextHolder}

      <Controller
        name="termsAndConditionsPDF"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Button
            icon={<Upload01 />}
            className="text-white !bg-primaryLight hover:!bg-purple-600 hover:!text-white"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "application/pdf";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  field.onChange(file);
                  setfileName(file.name);
                  success();
                }
              };
              input.click();
            }}
          >
            Upload
          </Button>
        )}
      />

      {fileName && <p>{fileName}</p>}

      {errors.termsAndConditionsPDF && (
        <p className="text-red-500 text-xs mt-1">
          {errors?.termsAndConditionsPDF?.message?.toString()}
        </p>
      )}

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
