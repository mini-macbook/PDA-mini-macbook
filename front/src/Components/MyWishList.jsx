import { Card } from "flowbite-react";
import FundingProgress from "./Funding/FundingProgress";
import { useNavigate } from "react-router";

export default function MyWishList({
  _id,
  imageUrl,
  title,
  price,
  remainDays,
  customWidth,
  customHeight,
  brandName,
  customProgressBarWidth,
  useFundingProgress,
  fundingId,
  funding,
}) {
  const currentFundingAmount = funding?.transaction?.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Truncate title to 20 characters
  const truncatedTitle =
    title.length > 20 ? title.substring(0, 20) + "..." : title;

  return (
    <div className="border border-spacing-3 transition-transform duration-300 ease-in-out hover:border-blue-500 rounded-lg bg-white p-2">
      <div className="md:flex gap-6 items-center">
        <div className="w-32">
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-24 h-24 mb-3 rounded-md"
              alt="product"
            />
          )}
        </div>
        <div className="text-start w-full">
          <h5 className="text-gray-500 font-bold mt-2 mb-1 text-sm">
            {brandName}
          </h5>

          <h5 className="font-bold text-gray-800 mb-1 truncate overflow-hidden whitespace-nowrap text-overflow-ellipsis">
            {truncatedTitle}
          </h5>
          <p className="font-bold text-gray-700 mb-2">
            {parseInt(price).toLocaleString()} 원
          </p>
          {useFundingProgress && (
            <FundingProgress
              targetFundingAmount={price}
              currentFundingAmount={currentFundingAmount}
              remainDays={remainDays}
              customWidth={customWidth}
              customHeight={customHeight}
              customProgressBarWidth={customProgressBarWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
}
