import React, { useState, useEffect } from "react";
import WishList from "../Components/WishList";
import { Row, Col } from "react-bootstrap"
import { fetchWishes } from "../Api/WishApi";

export default function WishListPage() {
  const [myWishList, setMyWishList] = useState([]);
  
  const imageUrl="https://img1.kakaocdn.net/thumb/C414x414@2x.fwebp.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20240119113721_c2ec0eeb5cfe4f4fb72a7b4b4b99f538.jpg" 
  const brandImageUrl="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800"
  const brandName="하겐다즈"
  const title="[단독]하겐다즈 프리미엄 수제 아이스크림 케이크 리얼블랑 (바닐라+벨지안초코)"
  const price=32900
  const totalFunded=10000
  const remainDays=3
  const customWidth = "w-[300px]"
  const customHeight = "h-[80px]"
  const customProgressBarWidth = "w-[280px]"
  
  // useEffect(() => {
  //     async function fetchData() {
  //         const data = await fetchWishes()    // user phoneNumber 전달
  //         setMyWishList(data)
  //     }
  //     fetchData()
  // }, [])

  return (
    <>
      <h2 className="px-5 pt-5 pb-2 text-[20px] text">나의 위시리스트</h2>

      <div className="p-5">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* {myWishList.map((myWish, index) => (
            <WishList key={index}
              imageUrl={myWish.imageUrl}
              brandImageUrl={myWish.brandImageUrl}
              brandName={myWish.brandName}
              title={myWish.title}
              price={myWish.price}
              useFundingProgress="true"
              totalFunded={totalFunded}       // 이거
              remainDays={remainDays}         // 생일 - 현재 날짜?
              customWidth={customWidth}  
              customHeight={customHeight}
              customProgressBarWidth={customProgressBarWidth}
            />
          ))} */}

          {/* 데이터 가져오면 아래 부분 지우기 */}
          <WishList
            imageUrl={imageUrl}
            brandImageUrl={brandImageUrl}
            brandName={brandName}
            title={title}
            price={price}
            useFundingProgress="true"
            totalFunded={totalFunded}
            remainDays={remainDays}   
            customWidth={customWidth}  
            customHeight={customHeight}
            customProgressBarWidth={customProgressBarWidth}
          />
          <WishList
            imageUrl={imageUrl}
            brandImageUrl={brandImageUrl}
            brandName={brandName}
            title={title}
            price={price}
            useFundingProgress="true"
            totalFunded={totalFunded}
            remainDays={remainDays}   
            customWidth={customWidth}  
            customHeight={customHeight}
            customProgressBarWidth={customProgressBarWidth}
          />
          <WishList
            imageUrl={imageUrl}
            brandImageUrl={brandImageUrl}
            brandName={brandName}
            title={title}
            price={price}
            useFundingProgress="true"
            totalFunded={totalFunded}
            remainDays={remainDays}   
            customWidth={customWidth}  
            customHeight={customHeight}
            customProgressBarWidth={customProgressBarWidth}
          />
          <WishList
            imageUrl={imageUrl}
            brandImageUrl={brandImageUrl}
            brandName={brandName}
            title={title}
            price={price}
            useFundingProgress="true"
            totalFunded={totalFunded}
            remainDays={remainDays}   
            customWidth={customWidth}  
            customHeight={customHeight}
            customProgressBarWidth={customProgressBarWidth}
          />
        </div>
      </div>
    </>
  );
}
