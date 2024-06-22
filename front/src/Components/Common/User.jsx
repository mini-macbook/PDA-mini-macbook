/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import profileImg from "../../imgs/profile.svg";

export default function User({ friend, setPhoneNumber }) {
  const month = new Date(friend.birthDay).getMonth() + 1;
  const day = new Date(friend.birthDay).getDate();

  return (
    <div
      onClick={() => {
        setPhoneNumber(friend.phoneNumber);
      }}
      className="gap-4 hover:bg-gray-100 hover:cursor-pointer flex items-center py-2 px-4 rounded-lg transition-colors duration-300"
    >
      <img
        className="w-10 h-10 object-cover rounded-full"
        src={profileImg}
        alt="User avatar"
      />
      <div className="ml-4">
        <div className="text-xl">{friend.nickName}</div>
        <div className="text-sm text-slate-500">
          {month}월 {day}일
        </div>
      </div>
    </div>
  );
}
