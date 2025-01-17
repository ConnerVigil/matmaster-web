import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";
import { useRouter } from "next/navigation";
import { userService } from "@/lib/frontend/services/userService";
import { Form, Input, Select, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { z } from "zod";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import type { Dayjs } from "dayjs";

const { Option } = Select;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
});

interface FormValues {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  grade: string;
  dateOfBirth: Dayjs;
}

const ProfileStep: React.FC = () => {
  const { prevStep } = useOnboarding();
  const router = useRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      message.error("File size should not exceed 5MB!");
      return false;
    }

    setFileList([file]);
    return false; // Prevent automatic upload
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const user = await userService.getUserFromDB();

      // Handle image upload if exists
      let imageUrl = null;
      if (fileList[0]) {
        imageUrl = await userService.uploadImageToS3(
          fileList[0] as RcFile,
          user.ID
        );
        if (imageUrl) {
          await userService.updateUserProfileImage(user.ID, imageUrl);
        }
      }

      nameSchema.parse({
        firstName: values.firstName,
        lastName: values.lastName,
      });

      await userService.onboardUser(user.ID, {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        grade: parseInt(values.grade),
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      });

      message.success("Profile created successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          form.setFields([
            {
              name: err.path[0],
              errors: [err.message],
            },
          ]);
        });
      } else {
        message.error("An error occurred during onboarding. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-2">Wrestler Profile</h1>
      <p className="text-gray-500 mb-6">
        This information will help our system keep coaches organized.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          label="Profile Image"
          tooltip="This picture will be public to coaches and wrestlers on MatMaster"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onRemove={() => setFileList([])}
            maxCount={1}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined />
                <div className="mt-2">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select placeholder="Select gender">
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Grade is required" }]}
          >
            <Select placeholder="Select grade">
              {[9, 10, 11, 12].map((grade) => (
                <Option key={grade} value={grade.toString()}>
                  {grade}th
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Date of birth is required" }]}
        >
          <DatePicker
            className="w-full"
            format="YYYY-MM-DD"
            disabledDate={(current) => {
              // Disable dates less than 14 years ago
              const fourteenYearsAgo = new Date();
              fourteenYearsAgo.setFullYear(fourteenYearsAgo.getFullYear() - 14);
              return current && current.valueOf() > fourteenYearsAgo.valueOf();
            }}
          />
        </Form.Item>

        <div className="flex justify-between mt-6">
          <Button onClick={prevStep}>Previous</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileStep;
