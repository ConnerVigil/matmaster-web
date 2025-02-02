import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "antd";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { EventFormData } from "./zodSchemas";

interface ContactInformationProps {
  control: Control<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  control,
  errors,
}) => {
  return (
    <>
      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Contact Information
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Email Address
        </label>
        <Controller
          name="emailAddress"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              status={errors.emailAddress ? "error" : ""}
              placeholder="Enter email address"
            />
          )}
        />
        {errors.emailAddress && (
          <p className="text-red-500 text-xs mt-1">
            {errors.emailAddress.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Phone Number
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              status={errors.phoneNumber ? "error" : ""}
              placeholder="Enter phone number"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Social Media <span className="font-light text-gray3">(optional)</span>
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          X (Twitter)
        </label>
        <Controller
          name="twitterHandle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://www.twitter.com/username"
              prefix={<FaXTwitter size={24} className="-translate-x-1" />}
            />
          )}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Instagram
        </label>
        <Controller
          name="instagramHandle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://www.instagram.com/username"
              prefix={
                <FaInstagram
                  size={24}
                  className="text-[#E4405F] -translate-x-1"
                />
              }
            />
          )}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Facebook
        </label>
        <Controller
          name="facebookHandle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://www.facebook.com/username"
              prefix={
                <FaFacebook
                  size={24}
                  className="text-[#1877F2] -translate-x-1"
                />
              }
            />
          )}
        />
      </div>
    </>
  );
};

export default ContactInformation;
