const express = require("express");
const router = express.Router();
const { authenticate } = require("./users");
const User = require("../models/User");
const Product = require("../models/Product");
const Funding = require("../models/Funding");

// baseUrl : 127.0.0.1:3000/api/user/wish/

// 특정 유저의 위시 리스트 조회 GET: /api/user/wish/:phoneNumber
router.get("/:phoneNumber", authenticate, async (req, res, next) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const user = await User.findOne({ phoneNumber: phoneNumber }).populate(
      "isWishList"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const fundings = await Funding.find({ user: user._id }); // 해당 유저의 모든 Funding 객체 가져오기
    console.log(fundings);

    res.json({
      userEmail: user.userEmail,
      nickName: user.nickName,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      isWishList: user.isWishList,
      fundings: fundings,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:UserId", authenticate, async (req, res, next) => {
  try {
    const UserId = req.params.UserId;
    const user = await User.findOne({ UserId: UserId }).populate("isWishList");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const fundings = await Funding.find({ user: user._id }); // 해당 유저의 모든 Funding 객체 가져오기
    res.json({
      userEmail: user.userEmail,
      nickName: user.nickName,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      isWishList: user.isWishList,
      fundings: fundings,
    });
  } catch (error) {
    next(error);
  }
});

// 나의 위시리스트 상품 추가 POST: /api/user/wish
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { productId } = req.body.data;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    user.isWishList.push(product._id);
    const updatedUser = await user.save();

    // funding 인스턴스 생성
    const funding = await Funding.create({
      user: userId,
      product: product._id,
      transaction: [],
    });

    res.json({
      user: updatedUser.isWishList,
      funding,
    });

    // res.json("test");
  } catch (error) {
    next(error);
  }
});

// 나의 위시리스트 상품 삭제 DELETE: /api/user/wish
router.delete("/", authenticate, async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findOne({ productId: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const index = user.isWishList.indexOf(product._id);
    if (index !== -1) {
      user.isWishList.splice(index, 1);
    }

    const updatedUser = await user.save();

    console.log("product._id", product._id);

    // funding 인스턴스 삭제
    const fundingId = await Funding.find({
      user: userId,
      product: product._id,
    });
    console.log(fundingId[0]._id);
    await Funding.deleteOne({
      _id: fundingId[0]._id,
    });
    // await Funding.deleteMany(fundingId);
    // await Funding.findOneAndDelete({ product: product._id });
    // console.log(res);

    res.json(updatedUser.isWishList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
