/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import WishList from "../WishList";
import { useNavigate } from "react-router";
import { calculateDDay } from "../../Funding/Main";
import MyWishList from "../MyWishList";

export default function MyWishLists({ wishList, fundings, birthDay }) {
  console.log(wishList);

  function findFunding(wishId) {
    const funding = fundings.find((f) => f.product === wishId);
    console.log(funding);
    return funding;
  }

  return (
    <div className="overflow-x-auto ml-0 h-94vh max-w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="pb-8 text-2xl font-bold ps-8"></div>
      <div className="flex gap-6 md:px-8">
        {wishList?.length > 0 &&
          wishList.map((item, index) => (
            <MyWishList
              key={index}
              {...item}
              customProgressBarWidth={"w-[70%]"}
              remainDays={calculateDDay(birthDay)}
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
