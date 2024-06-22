import React from "react";
import { Avatar } from "flowbite-react";

const FundingProfile = ({ amount, userInfo }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  return (
    <div className="w-full h-[80px] flex justify-between items-center border border-solid border-gray-400 rounded-xl">
      <div className="h-full rounded-xl flex items-center mx-4">
        <Avatar
          className="border border-gray-400 w-fit"
          size="sm"
          color="gray"
        />
      </div>
      <div className="flex-1 flex-col">
        <div className="text-[16px] ">{userInfo} ({userInfo.d})</div>
        <div className="text-xs text-gray-400">친구야 사랑해</div>
      </div>

      <div className="h-full flex items-center mr-4 text-center rounded-lg mt-2">
        <div
          className="flex items-center mb-2 text-center font-semibold text-[18px]"
        >
          ₩{formatPrice(amount)}
        </div>
      </div>
    </div>
  );
};

export default FundingProfile;
