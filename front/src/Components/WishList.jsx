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
      className="border border-spacing-3 hover:shadow-lg transition-transform duration-300 ease-in-out hover:cursor-pointer border-transparent rounded-lg bg-white p-4"
      onClick={handleCardClick}
    >
      <div className="flex gap-5">
        <div className="flex flex-col items-center justify-start w-52 h-44">
          {imageUrl && (
            <img
              src={imageUrl}
              className="w-36 h-32 rounded-md mt-1"
              alt="product"
            />
          )}
          <div className="flex flex-col items-center">
            <h6 className="text-sm font-semibold text-gray-600">{brandName}</h6>
          </div>
        </div>
        <div className="text-start w-full mt-2">
          <h5 className="font-bold text-gray-800 mb-2 truncate overflow-hidden whitespace-nowrap text-overflow-ellipsis">
            {truncatedTitle}
          </h5>
          <p className="text-lg font-bold text-gray-700 mb-1">
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
