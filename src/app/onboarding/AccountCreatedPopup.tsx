import { CheckCircleBroken } from "@untitled-ui/icons-react";
import React from "react";

interface AccountCreatedPopupProps {
  onClose: () => void;
}

const AccountCreatedPopup: React.FC<AccountCreatedPopupProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-90 backdrop-blur-lg"></div>
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 z-10">
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="rounded-full bg-green-100 p-2 inline-block">
              <CheckCircleBroken className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h2 className="text-gray1 text-2xl font-bold mb-2">
            Account Created
          </h2>
          <p className="text-gray3 mb-6">
            Welcome to MatMaster! Explore tournaments, analyze your wrestling,
            and more! Explore the app to learn more about the interface.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreatedPopup;
