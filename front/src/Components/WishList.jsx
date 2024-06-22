import { Card } from "flowbite-react";
import FundingProgress from "./Funding/FundingProgress";
import { useNavigate } from "react-router";

export default function WishList({
  _id,
  imageUrl,
  brandImageUrl,
  brandName,
  title,
  price,
  remainDays,
  customWidth,
  customHeight,
  customProgressBarWidth,
  renderButton,
  useFundingProgress,
  useButton,
  imgWidth,
  fundingId,
  funding,
}) {
  const navigate = useNavigate();

  function handleCardClick() {
    if (useButton) {
      navigate(`/product/${_id}`);
    } else {
      navigate(`/funding/${fundingId}`);
    }
  }

  function handleButtonClick(e) {
    e.stopPropagation();
  }

  const currentFundingAmount = funding?.transaction?.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // Truncate title to 20 characters
  const truncatedTitle =
    title.length > 20 ? title.substring(0, 20) + "..." : title;

  return (
    <div
      className="border border-spacing-3 hover:shadow-lg hover:transform hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg bg-white p-4"
      onClick={handleCardClick}
    >
      <div className="md:flex gap-6 items-center">
        <div className="flex-shrink-0 max-w-[280px]">
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-20 h-20 mb-3 rounded-md"
              alt="product"
            />
          )}
          <div className="flex items-center mb-3">
            {brandImageUrl && (
              <img
                src={brandImageUrl}
                alt="Brand Logo"
                className="w-8 h-8 mr-2 rounded-full"
              />
            )}
            <h6 className="text-sm font-semibold text-gray-600">{brandName}</h6>
          </div>
        </div>
        <div className="text-start w-full">
          <h5 className="font-bold text-gray-800 mb-2 truncate overflow-hidden whitespace-nowrap text-overflow-ellipsis">
            {truncatedTitle}
          </h5>
          <p className="text-lg font-bold text-gray-700 mb-2">
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
          {useButton && (
            <div className="flex justify-end mt-3" onClick={handleButtonClick}>
              {renderButton()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
