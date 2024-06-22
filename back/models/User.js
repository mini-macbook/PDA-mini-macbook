const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      unique: true,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    birthDay: {
      type: Date,
      required: true,
    },
    friendList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    isWishList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    department: String,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signUp = async function (
  userEmail,
  userPassword,
  nickName,
  phoneNumber,
  birthDay
) {
  const salt = await bcrypt.genSalt();
  console.log(salt);
  try {
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const user = await this.create({
      userEmail: userEmail,
      userPassword: hashedPassword,
      nickName: nickName,
      phoneNumber,
      birthDay,
    });
    return {
      _id: user._id,
      userEmail: user.userEmail,
      nickName: user.nickName,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
    };
  } catch (err) {
    throw err;
  }
};

userSchema.statics.login = async function (userEmail, userPassword) {
  const user = await this.findOne({ userEmail });

  if (user) {
    const auth = await bcrypt.compare(userPassword, user.userPassword);
    if (auth) {
      return user.visibleUser;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    _id: doc._id,
    userEmail: doc.userEmail,
    phoneNumber: doc.phoneNumber,
    nickName: doc.nickName,
    birthDay: doc.birthDay,
  };
});

const User = mongoose.model("User", userSchema);
module.exports = User;
