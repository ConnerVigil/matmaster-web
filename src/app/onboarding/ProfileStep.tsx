import React, { useState } from "react";
import { useOnboarding } from "./OnboardingProvider";
import StepButtons from "./StepButtons";
import Image from "next/image";
import AccountCreatedPopup from "./AccountCreatedPopup";
import { useRouter } from "next/navigation";
import { userService } from "@/lib/frontend/services/userService";
import { z } from "zod";
import { format } from "date-fns";

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

const ProfileStep = () => {
  const { prevStep } = useOnboarding();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = async () => {
    const newErrors: Record<string, string> = {};

    try {
      nameSchema.parse({ firstName, lastName });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      }
    }

    if (!gender) newErrors.gender = "Gender is required";
    if (!grade) newErrors.grade = "Grade is required";
    if (!birthday) newErrors.birthday = "Birthday is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = await userService.getUserFromDB();
      const formattedDOB = birthday ? format(birthday, "yyyy-MM-dd") : "";
      await userService.onboardUser(user.ID, {
        firstName,
        lastName,
        gender,
        grade: parseInt(grade),
        dateOfBirth: formattedDOB,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error during onboarding:", error);
      setErrors({
        submit: "An error occurred during onboarding. Please try again.",
      });
    }
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBirthday((prev) => {
      const newDate = prev ? new Date(prev) : new Date();
      if (name === "day") newDate.setDate(parseInt(value));
      if (name === "month") newDate.setMonth(parseInt(value) - 1);
      if (name === "year") newDate.setFullYear(parseInt(value));
      return newDate;
    });
    setErrors((prev) => ({ ...prev, birthday: "" }));
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
      <h1 className="text-gray1 text-xl font-bold mb-2">Wrestler Profile</h1>
      <p className="text-gray3 mb-6">
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
            <p className="text-sm text-gray3 mb-2">
              This picture will be public to coaches and wrestlers on MatMaster.
            </p>
            <label className="bg-primaryLight text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-600 transition">
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

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray3 mb-1">
              First Name
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray3 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Gender
          </label>
          <select
            className={`w-full p-2 border ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } text-gray3 rounded`}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setErrors((prev) => ({ ...prev, gender: "" }));
            }}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Grade
          </label>
          <select
            className={`w-full p-2 border ${
              errors.grade ? "border-red-500" : "border-gray-300"
            } rounded text-gray3`}
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setErrors((prev) => ({ ...prev, grade: "" }));
            }}
          >
            <option value="" disabled>
              Select grade
            </option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
          {errors.grade && (
            <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
          )}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Birthday
        </label>
        <div className="grid grid-cols-3 gap-2">
          <select
            name="day"
            className={`p-2 border ${
              errors.birthday ? "border-red-500" : "border-gray-300"
            } rounded text-gray3`}
            value={birthday ? birthday.getDate() : ""}
            onChange={handleBirthdayChange}
          >
            <option value="" disabled>
              Day
            </option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            name="month"
            className={`p-2 border ${
              errors.birthday ? "border-red-500" : "border-gray-300"
            } rounded text-gray3`}
            value={birthday ? birthday.getMonth() + 1 : ""}
            onChange={handleBirthdayChange}
          >
            <option value="" disabled>
              Month
            </option>
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
          <select
            name="year"
            className={`p-2 border ${
              errors.birthday ? "border-red-500" : "border-gray-300"
            } rounded text-gray3`}
            value={birthday ? birthday.getFullYear() : ""}
            onChange={handleBirthdayChange}
          >
            <option value="" disabled>
              Year
            </option>
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
        {errors.birthday && (
          <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
        )}
      </div>

      <StepButtons nextStep={handleNext} prevStep={prevStep} />

      {showPopup && <AccountCreatedPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default ProfileStep;
