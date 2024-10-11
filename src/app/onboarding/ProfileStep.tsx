import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";
import StepButtons from "./StepButtons";
import Image from "next/image";
import AccountCreatedPopup from "./AccountCreatedPopup";
import { useRouter } from "next/navigation";
import { userService } from "@/lib/frontend/services/userService";

const ProfileStep = () => {
  const { prevStep } = useOnboarding();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    const user = await userService.getCurrentUser();
    await userService.onboardUser(user.ID);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    router.push("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      console.log("File uploaded:", file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-textPrimary text-xl font-bold mb-2">
        Wrestler Profile
      </h1>
      <p className="text-textSecondary mb-6">
        This information will help our system keep coaches organized.
      </p>
      <div className="mb-6">
        <div className="flex items-center mb-4 gap-4">
          <div className="w-6/12">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile Image"
                width="100"
                height="100"
                priority
                className="object-cover object-center w-full h-full rounded-full"
              />
            ) : (
              <Image
                src={"/defaultuser.png"}
                alt="Default Avatar"
                width="100"
                height="100"
                priority
                className="object-cover object-center w-full h-full rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col p-2 w-6/12">
            <h2 className="text-black font-bold mb-1">
              Upload a profile image
            </h2>
            <p className="text-sm text-textSecondary mb-2">
              This picture will be public to coaches and wrestlers on MatMaster.
            </p>
            <label className="bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-600 transition">
              Upload Image
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Gender
          </label>
          <select className="w-full p-2 border border-gray-300 text-textSecondary rounded">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">
            Grade
          </label>
          <select className="w-full p-2 border border-gray-300 rounded text-textSecondary">
            <option value="">Grade</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-textSecondary mb-1">
          Birthday
        </label>
        <div className="grid grid-cols-3 gap-2">
          <select className="p-2 border border-gray-300 rounded text-textSecondary">
            <option value="">DD</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="p-2 border border-gray-300 rounded text-textSecondary">
            <option value="">MM</option>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, i) => (
              <option key={i} value={i + 1}>
                {month}
              </option>
            ))}
          </select>
          <select className="p-2 border border-gray-300 rounded text-textSecondary">
            <option value="">YYYY</option>
            {[...Array(30)].map((_, i) => {
              const year = new Date().getFullYear() - i - 14;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <StepButtons nextStep={handleNext} prevStep={prevStep} />

      {showPopup && <AccountCreatedPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default ProfileStep;
