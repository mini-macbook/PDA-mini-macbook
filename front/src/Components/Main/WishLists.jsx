/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import WishList from "../WishList";
import { useNavigate } from "react-router";
import { calculateDDay } from "../../Funding/Main";

export default function WishLists({ wishList, fundings, birthDay }) {
  const navigate = useNavigate();

  function findFunding(wishId) {
    const funding = fundings.find((f) => f.product === wishId);
    return funding;
  }

  return (
    <div className="overflow-y-auto ml-0 h-94vh max-w-66vw scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="pb-8 text-2xl font-bold ps-8">
        친구가 진행 중인 펀딩
        <span className="text-lg font-medium">
          {" "}
          {`${wishList?.length || 0}`}개
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-8">
        {wishList?.length > 0 &&
          wishList.map((item, index) => (
            <WishList
              key={index}
              {...item}
              customHeight={"h-[180px]"}
              customWidth={"w-[100%]"}
              customProgressBarWidth={"w-[90%]"}
              remainDays={calculateDDay(birthDay)}
              renderButton={() => (
                <button
                  className="w-full py-2 my-3 font-bold text-white transition-colors duration-200 ease-in-out transform bg-blue-500 border-none rounded-md hover:bg-blue-400"
                  onClick={() => {
                    const fundingId = findFunding(item._id)._id;
                    if (fundingId) {
                      navigate(`/funding/${fundingId}`);
                    } else {
                      alert("해당 펀딩이 없습니다.");
                    }
                  }}
                >
                  펀딩하기
                </button>
              )}
              useFundingProgress={true}
              useButton={true}
              imgWidth={"200px"}
              funding={findFunding(item._id)}
            />
          ))}
      </div>
    </div>
  );
}
