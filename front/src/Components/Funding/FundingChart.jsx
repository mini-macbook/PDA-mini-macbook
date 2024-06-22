import "chart.js/auto"; // src/FundingChart.js
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import './FundingChart.css'
const FundingChart = ({targetFundingAmount, currentFundingAmount}) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  const percentage = Math.round((currentFundingAmount / targetFundingAmount) * 100);

  const data = {
    labels: ["Funding", "Remaining"],
    datasets: [
      {
        data: [currentFundingAmount, targetFundingAmount - currentFundingAmount],
        backgroundColor: ["rgba(101, 153, 255, 1)", "rgba(192, 192, 192, 0.6)"],
        borderColor: ["rgba(101, 153, 255, 1)", "rgba(192, 192, 192, 1)"],
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
            className="absolute top-1/2 left-1/2 text-lg font-bold"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {percentage}%
          </div>
        </div>
        <div className="Pretendard mr-4 font-semibold flex flex-col text-nowrap mt-10 ml-4 text-lg">
          <div> {formatPrice(currentFundingAmount)} /</div>
          <div> {formatPrice(targetFundingAmount)}원</div>
        </div>
      </div>
    </div>
  );
};

export default FundingChart;
