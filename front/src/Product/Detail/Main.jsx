import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Avatar } from "flowbite-react";
import heart from "../../imgs/heart.svg";
import heart_full from "../../imgs/heart_full.svg";
import { fetchProductDetail } from "../../Api/ProductDetailApi";
import sanitizeHtml from "sanitize-html";
import { fetchWishPost, fetchWishDelete } from "../../Api/WishApi";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [isHeart, setIsHeart] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  };

  const onWishClick = async () => {
    if (!isHeart) {
      const response = await fetchWishPost(productDetail[0]?.productId);
      Swal.fire({
        icon: "success",
        title: "위시리스트 추가",
        text: "펀딩이 시작됩니다!",
      }).then(setIsHeart((prev) => !prev));
      console.log(response);
    } else if (isHeart) {
      const response = await fetchWishDelete(productDetail[0]?.productId);
      Swal.fire({
        icon: "warning",
        title: "위시리스트 삭제",
        text: "펀딩이 취소되고 지금까지 모인 모두 펀딩이 환불처리 됩니다.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "승인",
        cancelButtonText: "취소",
        everseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("펀딩 취소가 완료되었습니다!");

          setIsHeart((prev) => !prev);
        }
      });
      console.log(response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProductDetail(productId);
      console.log("product response:", response);
      if (response[0].isHeart) {
        setIsHeart(true);
      } else {
        setIsHeart(false);
      }
      setProductDetail(response);
    };
    fetchData();
  }, [productId]);

  const htmlCode = productDetail[0]?.productDetailDescription;
  const cleanCode = sanitizeHtml(htmlCode, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "iframe",
      "video",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "data-animated", "data-origin-url"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allowfullscreen",
        "allow",
      ],
      video: [
        "src",
        "width",
        "height",
        "controls",
        "autoplay",
        "loop",
        "muted",
      ],
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <div className="flex flex-row items-start justify-center w-full max-w-4xl gap-4 p-4 m-20 bg-white border-2 border-gray-200 rounded-lg shadow-lg ">
        <Card
          className="w-[398px] h-[398px]"
          imgAlt="Product image"
          imgSrc={productDetail[0]?.detailImageUrl}
        />
        <div className="flex flex-col justify-start max-w-sm">
          <Card className="w-[398px] h-[398px]">
            <h5 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400 ">
              {productDetail[0]?.detailName}
            </h5>
            <div className="mb-3 mt-2.5 flex items-center">
              <Avatar
                className="w-[30px] h-[30px]"
                img={productDetail[0]?.brandImageUrl}
                alt="Brand logo"
                rounded
              />
              <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {productDetail[0]?.brandName}
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-transparent text-yellow-500 bg-clip-text">
              {formatPrice(productDetail[0]?.price)}
            </span>
            <Button
              onClick={onWishClick}
              color="warning"
              className="mt-4 text-white transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm hover:bg-lime-300 focus:outline-none"
            >
              위시리스트 담기
              <img
                className="ml-2"
                src={isHeart ? heart_full : heart}
                alt="위시리스트 아이콘"
                width={15}
                height={15}
              />
            </Button>
          </Card>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-6">
        <div dangerouslySetInnerHTML={{ __html: cleanCode }}></div>
      </div>
    </div>
  );
};

export default ProductDetail;
