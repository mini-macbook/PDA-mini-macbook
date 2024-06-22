import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FundingProgress from "../Components/Funding/FundingProgress";
import FundingProfile from "../Components/Funding/FundingProfile";
import ModalComp from "../Components/Common/Modal";
import axios from "axios";
import { fetchFundingDetail, fetchFundingPost } from "../Api/Funding";
import { userInfoState } from "../stores/auth";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { Alert } from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import FundingDetail from "../Components/Funding/FundingDetail";

const calculateDDay = (targetDate) => {
  // Get the current date
  const currentDate = new Date();
  const curYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate(); // Day of the month (1-31)
  const currentMonth = currentDate.getMonth() + 1;

  // Parse the target date string to a Date object (Note: Not required in this case)
  const parsedTargetDate = new Date(targetDate);
  const targetDay = parsedTargetDate.getDate();
  const targetMonth = parsedTargetDate.getMonth() + 1;

  const curDateObject = new Date(curYear, currentMonth - 1, currentDay);
  const targetDateObject = new Date(curYear, targetMonth - 1, targetDay);

  // Calculate the time difference in milliseconds
  const timeDifference = targetDateObject - curDateObject;

  // Calculate the number of days
  const daysDifference =
    Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) % 365;

  return daysDifference < 0 ? (daysDifference + 365) % 365 : daysDifference;
};

const Funding = () => {
  const { fundingId } = useParams();
  const [fundingDetail, setFundingDetail] = useState([]);
  const [userFundingResult, setUserFundingResult] = useState();
  const [productDetail, setProductDetail] = useState();
  const [userDetail, setUserDetail] = useState();
  const [userInfo, setUserInfo] = useState();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFundingDetail(fundingId);
      console.log(response[0]);
      setFundingDetail(response[0].transaction);
      setProductDetail(response[0].product);
      setUserDetail(response[0].user);

      const userAmountResult = response[0].transaction.reduce((acc, item) => {
        const {
          amount,
          userId: { nickName },
        } = item;
        acc[nickName] = (acc[nickName] || 0) + amount;
        return acc;
      }, {});
      console.log(userAmountResult);
      const resultArray = Object.entries(userAmountResult).map(
        ([user, amount]) => ({
          user,
          amount,
        })
      );
      console.log(resultArray);
      setUserFundingResult(resultArray);
    };
    fetchData();
    setUserInfo(JSON.parse(sessionStorage.getItem("AUTH_USER")).nickName);
  }, []);

  useEffect(() => {
    // Set a timeout to hide the confetti after 3 seconds
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  // const currentFundingAmount = fundingDetail.length === 0 ? 0 : 3;
  const currentFundingAmount = fundingDetail.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="flex flex-col items-center">
      {currentFundingAmount === productDetail?.price && showConfetti && (
        <Confetti width={width} height={height} />
      )}
      <div className="w-[90vw] max-w-[700px] flex flex-col items-center">
        {currentFundingAmount === productDetail?.price ? (
          <Alert
            icon={HiInformationCircle}
            color="success"
            className="w-[100%]"
            // onDismiss={() => alert("Alert dismissed!")}
            withBorderAccent
          >
            <span className="font-bold text-[16px]">
              펀딩이 완료된 상품입니다!
            </span>
          </Alert>
        ) : (
          <div></div>
        )}
        <div className="text-[40px] mt-2 mb-3 font-semibold text-center">
          <div>
            <a className="font-extrabold ">
              {userDetail?.nickName === userInfo ? (
                <div>펀딩이 진행 중입니다!</div>
              ) : (
                <div>{userDetail?.nickName}님의 생일을 축하해주세요!</div>
              )}
            </a>
          </div>
        </div>
        <img src={productDetail?.detailImageUrl} width={500} />
        <div className="w-[80%] text-[20px] font-bold text-center mt-3 mb-3">
          {productDetail?.title}
        </div>
        <div className="bg-[#f5f7fb] w-[80%] flex justify-center rounded-lg">
          <FundingDetail
            customHeight="h-[84px]"
            targetFundingAmount={productDetail?.price}
            currentFundingAmount={currentFundingAmount}
            remainDays={calculateDDay(userDetail?.birthDay)}
          />
        </div>
        {/* <button className="w-[80%] bg-myColor-green3 text-white mt-4 h-[50px] rounded-lg">
          펀딩하기
        </button> */}
        <div className="w-[90%] max-w-[700px] mt-3">
          <ModalComp
            currentFundingAmount={currentFundingAmount}
            targetFundingAmount={productDetail?.price}
            fundingId={fundingId}
            productDetail={productDetail}
            userDetail={userDetail}
          />
        </div>
        <div className="flex flex-row flex-wrap w-[100%] justify-center mt-4">
          {userFundingResult?.map((value) => {
            return (
              <div key={value.user} className="w-[30%] h-[200px] m-1 ">
                <FundingProfile amount={value.amount} userInfo={value.user} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Funding as default, calculateDDay };
