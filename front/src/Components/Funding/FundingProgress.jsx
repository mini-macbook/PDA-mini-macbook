import React from "react";

const FundingProgress = ({
  targetFundingAmount = 10000,
  currentFundingAmount = 5000,
  remainDays = 1,
  customWidth,
  customHeight = "h-[200px]",
  customProgressBarWidth = "w-[380px]",
}) => {
  const now = (currentFundingAmount / targetFundingAmount) * 100;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  return (
    <div className="flex flex-col justify-center">
      <div
        className={`flex flex-row items-stretch justify-between ${customProgressBarWidth} mb-2`}
      >
        {/* <div>
          현재 ₩{formatPrice(currentFundingAmount)} / 총 ₩
          {formatPrice(targetFundingAmount)}
        </div>
        <div>🗓️{remainDays}일 남음</div> */}
      </div>
      <div
        className={`relative ${customProgressBarWidth} h-4 bg-gray-300 rounded-full overflow-hidden`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-blue-500"
          style={{ width: `${now}%` }}
        >
          <span className="absolute right-0 ml-3 left-2 text-white text-xs">
            {now.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FundingProgress;
