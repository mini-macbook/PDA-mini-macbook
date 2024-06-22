import React, { useState, useEffect } from "react";
import WishList from "../Components/WishList";
import { Row, Col } from "react-bootstrap";
import { fetchWishes } from "../Api/WishApi";
import { fetchFundingDetail } from "../Api/Funding";

import profile from "../imgs/profile.png";

// console.log("유저정보", userInfo);
// console.log(typeof(userInfo))

export default function WishListPage() {
  const [myWishList, setMyWishList] = useState([]);
  const [fundingData, setFundingData] = useState([]);

  const customWidth = "w-[300px]";
  const customHeight = "h-[80px]";
  const customProgressBarWidth = "w-[280px]";
  const userInfo = sessionStorage.getItem("AUTH_USER");
  const birthDayDate = new Date(JSON.parse(userInfo)?.birthDay);
  // console.log("생일", birthDayDate)

  //username

  // 오늘 날짜
  const today = new Date();
  // 생일이 이미 지났다면 내년 생일로 설정
  if (
    birthDayDate.getMonth() < today.getMonth() ||
    (birthDayDate.getMonth() === today.getMonth() &&
      birthDayDate.getDate() < today.getDate())
  ) {
    birthDayDate.setFullYear(today.getFullYear() + 1);
  } else {
    birthDayDate.setFullYear(today.getFullYear());
  }

  // 오늘로부터의 차이 계산
  let remainingDays = Math.floor(
    (birthDayDate - today) / (1000 * 60 * 60 * 24)
  );

  // 생일이 지났다면 내년 생일로 설정
  if (remainingDays < 0) {
    birthDayDate.setFullYear(today.getFullYear() + 1);
    remainingDays = Math.floor((birthDayDate - today) / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    async function fetchData() {
      const data1 = await fetchWishes(
        JSON.parse(sessionStorage.getItem("AUTH_USER")).phoneNumber
      ); // user phoneNumber 전달
      console.log("2222222", data1);
      setMyWishList(data1.isWishList);
      setFundingData(data1.fundings);
      // console.log("위시리스트", data1.isWishList)
    }
    fetchData();
  }, []);

  console.log(myWishList);

  // 각 wishList 항목과 연결된 funding 객체의 id를 찾아주는 함수
  function findFunding(wishId) {
    const funding = fundingData.find((f) => f.product === wishId);
    return funding;
  }

  return (
    <div className="flex justify-evenly">
      <div className="border border-solid w-[30%] border-gray-600 rounded-2xl hover:shadow-lg hover:transform hover:scale-105 transition-transform  bg-white p-4 mt-5">
        <div className="flex flex-col w-full items-center justify-between mb-3">
          <span className="text-xl mb-4 font-bold">나의 펀딩 현황</span>
          <img src={profile} alt="Profile" className="w-12 mt-8 h-12 rounded-full m-auto" />
        </div>
        <div className="text-sm mt-8">
          <span className="font-bold">이름: 정우성</span>{" "}
          <br />
          <span className="font-bold">생년월일: 2000.00.00</span>{" "}

          <br />
          <span className="font-bold">학과: 정보시스템</span>
        </div>
      </div>

      <div className="w-[60%]">
        <h2 className="px-5 pt-5 pb-2 text-[20px] text">나의 위시리스트</h2>
        <div className="p-5">
          <div className="flex flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myWishList.map((myWish, index) => (
              <WishList
                key={index}
                _id={myWish._id}
                imageUrl={myWish.imageUrl}
                brandImageUrl={myWish.brandImageUrl}
                brandName={myWish.brandName}
                title={myWish.title}
                price={myWish.price}
                useFundingProgress="true"
                remainDays={remainingDays}
                customWidth={customWidth}
                customHeight={customHeight}
                customProgressBarWidth={customProgressBarWidth}
                fundingId={fundingData[index]?._id}
                funding={findFunding(myWish._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
