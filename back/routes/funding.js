const express = require("express");
const router = express.Router();
const Funding = require("../models/Funding");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hi");
});

// funding ID로 조회
router.get("/:fundingId", (req, res, next) => {
  Funding.find({
    _id: req.params.fundingId,
  })
    .populate("user")
    .populate("product")
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      next(err);
    });
});

// funding 추가
router.post("/", (req, res, next) => {
  Funding.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:fundingId", async (req, res, next) => {
  const newTransaction = { userId: req.body.userId, amount: req.body.amount };
  console.log(newTransaction);
  //   res.send("hi");
  const result = await Funding.find({
    _id: req.params.fundingId,
  });
  console.log(result);
  //   res.send("hu");
  const updateResult = await Funding.updateOne(
    {
      _id: req.params.fundingId,
    },
    {
      $push: {
        transaction: newTransaction,
      },
    }
  );
  res.send(updateResult);
});
router.patch("/:fundingId/complete", async (req, res, next) => {
  try {
    const result = await Funding.updateOne(
      { _id: req.params.fundingId },
      { $set: { isProgress: false } }
    );
    if (result.nModified === 0) {
      return res
        .status(404)
        .send({ message: "Funding not found or already completed" });
    }
    res.send({ message: "Funding marked as completed", result });
  } catch (error) {
    next(error);
  }
});

// Existing endpoint to delete transaction for test purposes
router.patch("/:fundingId", async (req, res, next) => {
  try {
    const result = await Funding.updateOne(
      {
        _id: req.params.fundingId,
      },
      {
        $set: { transaction: [] },
      }
    );
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
