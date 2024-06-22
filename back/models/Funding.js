const mongoose = require("mongoose");

const fundingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    isProgress: {
      type: Boolean,
      default: true,
    },
    transaction: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

fundingSchema.pre("find", function (next) {
  this.populate("transaction.userId");
  next();
});

const Funding = mongoose.model("Funding", fundingSchema);
module.exports = Funding;
