import "chart.js/auto"; // src/FundingChart.js
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "./FundingChart.css";
const FundingChart = ({ targetFundingAmount, currentFundingAmount }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  const percentage = Math.round(
    (currentFundingAmount / targetFundingAmount) * 100
  );

  const data = {
    labels: ["Funding", "Remaining"],
    datasets: [
      {
        data: [
          currentFundingAmount,
          targetFundingAmount - currentFundingAmount,
        ],
        backgroundColor: ["rgba(96, 165, 250, 1)", "rgba(192, 192, 192, 0.6)"],
        borderColor: ["rgba(96, 165, 250, 1)", "rgba(192, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="p-3 relative w-full h-[200px] bg-[rgba(255,255,255,1)] border border-solid border-[rgba(217,217,217,1)] rounded-xl">
      <h1 className="Pretendard mb-2 ml-2 text-xl">펀딩 모금액 현황</h1>
      <div className="flex pl-2 pr-10 justify-between">
        <div className="w-[140px] h-[140px] relative">
          <Doughnut data={data} options={options} className="w-80" />
          <div
            className="absolute top-1/2 left-1/2 text-xl font-bold text-[rgba(96,165,250,1)]"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {percentage}%
          </div>
        </div>
        <div className="Pretendard mr-4 flex flex-col text-nowrap mt-4 ml-3 text-2xl">
          <div className="flex flex-col text-[#60A5FA]">
            <div className="text-xs font-extralight leading-3">달성금액</div>
            <div>
              {formatPrice(currentFundingAmount)}
              <span className="text-black">원</span>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="text-xs font-extralight leading-3 text-[grey]">목표금액</div>
            <div>
              {formatPrice(targetFundingAmount)}
              <span className="text-black">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingChart;
