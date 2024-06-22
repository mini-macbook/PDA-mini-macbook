import React, { useState, useEffect } from "react";
import WishList from "../Components/WishList";
import { Row, Col } from "react-bootstrap";
import { fetchWishes } from "../Api/WishApi";
import { fetchFundingDetail } from "../Api/Funding";
import FundingProgress from "../Components/Funding/FundingProgress";
import profile from "../imgs/profile.svg";
import { userInfoState } from "../stores/auth";
import { useRecoilState } from "recoil";
import { AUTH_KEY } from "../Home/Login";

export default function WishListPage() {
  const [myWishList, setMyWishList] = useState([]);
  const [fundingData, setFundingData] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const userNickName = JSON.parse(sessionStorage.getItem(AUTH_KEY)).nickName;
  const customWidth = "w-[300px]";
  const customHeight = "h-[80px]";
  const customProgressBarWidth = "w-[280px]";
  const userInfo1 = sessionStorage.getItem("AUTH_USER");
  const birthDayDate = new Date(JSON.parse(userInfo1)?.birthDay);

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
      console.log("Fetched Wishes", data1);
      setMyWishList(data1.isWishList);
      setFundingData(data1.fundings);
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
      <div className="flex-col border border-solid w-[30%] border-gray-600 rounded-2xl transition-transform bg-white p-4 mt-5">
        <div className="flex flex-col w-full items-start justify-between mb-3">
          <span className="text-3xl mb-8 mt-4 ml-4 font-bold">
            나의 펀딩 현황
          </span>
          <img
            src={profile}
            alt="Profile"
            className="w-40 mt-8 h-40 rounded-2xl m-auto"
          />
        </div>
        <div className="text-xl flex items-center font-bold flex-col gap-2 mt-8">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold">{userNickName}</p>
            <p className="text-sm text-gray-400">생일 6월 22일</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">
              {userInfo.department}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[60%]">
        <h2 className="px-5 pt-5 pb-2 text-[20px]">나의 위시리스트</h2>
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
