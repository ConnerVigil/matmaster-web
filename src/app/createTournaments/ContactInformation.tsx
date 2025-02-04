import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "antd";
import { FaFacebook, FaGlobeAfrica, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TournamentFormData } from "./zodSchemas";
import { Globe01 } from "@untitled-ui/icons-react";

interface ContactInformationProps {
  control: Control<TournamentFormData>;
  errors: FieldErrors<TournamentFormData>;
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
          name="xLink"
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
          name="instagramLink"
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
          name="facebookLink"
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Website
        </label>
        <Controller
          name="websiteLink"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://www.website.com"
              className="-translate-x-1"
              prefix={<Globe01 />}
            />
          )}
        />
      </div>
    </>
  );
};

export default ContactInformation;
