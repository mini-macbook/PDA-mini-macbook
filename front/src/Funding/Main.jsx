import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FundingProfile from "../Components/Funding/FundingProfile";
import ModalComp from "../Components/Common/Modal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { fetchFundingDetail, fetchFundingPost } from "../Api/Funding";
import { userInfoState } from "../stores/auth";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import FundingChart from "../Components/Funding/FundingChart";

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
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
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

  const FundingRight = () => {
    return (
      <div className="w-[500px] mt-20 mr-20 h-full">
        <div className="w-[400px] m-auto h-full">
          <div className="bg-[#517ACC] rounded-xl mb-10 h-[100px] w-full text-xl font-semibold flex items-center text-white pl-10">
            "맥북 갖고싶어잉."
          </div>
          <FundingChart
            targetFundingAmount={productDetail?.price}
            currentFundingAmount={currentFundingAmount}
          />
          <ModalComp
            currentFundingAmount={currentFundingAmount}
            targetFundingAmount={productDetail?.price}
            fundingId={fundingId}
            productDetail={productDetail}
            userDetail={userDetail}
          />
          <div className="flex flex-col gap-y-2 w-[100%] justify-center mt-4">
            <p className="text-xl font-bold mb-2 mt-2">펀딩에 참여한 친구들</p>
            {userFundingResult?.map((value) => {
              return (
                <div key={value.user} className="w-full h-[80px] ">
                  <FundingProfile amount={value.amount} userInfo={value.user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
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
  const FundingLeft = () => {
    // const htmlCode = productDetail[0]?.productDetailDescription;
    // const cleanCode = sanitizeHtml(htmlCode, {
    //   allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    //     "img",
    //     "iframe",
    //     "video",
    //   ]),
    //   allowedAttributes: {
    //     ...sanitizeHtml.defaults.allowedAttributes,
    //     img: ["src", "alt", "data-animated", "data-origin-url"],
    //     iframe: [
    //       "src",
    //       "width",
    //       "height",
    //       "frameborder",
    //       "allowfullscreen",
    //       "allow",
    //     ],
    //     video: [
    //       "src",
    //       "width",
    //       "height",
    //       "controls",
    //       "autoplay",
    //       "loop",
    //       "muted",
    //     ],
    //   },
    // });

    return (
      <div className="flex flex-1 mx-20 flex-col items-center">
        {currentFundingAmount === productDetail?.price && showConfetti && (
          <Confetti width={width} height={height} />
        )}
        <div className="w-[60vw] max-w-[700px] flex flex-col items-center">
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
          <div className="w-full px-10 flex-col items-center">
            <div className="flex">
              <img src={productDetail?.detailImageUrl} width={170} />
              <div className="flex-1 flex flex-col gap-1 h-[150px] mx-4 border-y justify-center px-2 border-solid border-gray-500">
                <div className="w-full max-w-[400px] text-xl font-bold truncate">
                  {productDetail?.title}
                </div>
                <div className="text-[grey] text-sm font-semibold">
                  {productDetail?.brandName}
                </div>
                <div className="text-xl font-semibold">
                  {formatPrice(productDetail?.price)}원
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mt-16 text-2xl font-bold border-b border-solid w-[150px] leading-10 text-center border-b-black">
                상품상세
              </p>
              <div>
                {/* <div dangerouslySetInnerHTML={{ __html: cleanCode }}></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <FundingLeft />
      <FundingRight />
    </div>
  );
};

export { Funding as default, calculateDDay };
