import React from "react";
import User from "../Common/User";
import "./Friends.css";
import search from "../../imgs/search.png";

export default function Friends({
  friends,
  setPhoneNumber,
  selectedMonth,
  setSelectedMonth,
  searchTerm,
  setSearchTerm,
}) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleMonthClick = (month) => {
    if (selectedMonth === month) {
      setSelectedMonth(null); // Deselect the filter if it is already selected
    } else {
      setSelectedMonth(month);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-white rounded-3xl p-4" style={{ boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.15)' }}>
      <div className="flex flex-row">
        <div className="text-2xl font-bold mt-2 w-14">친구</div>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="검색"
            className="flex-grow px-4 py-2 ml-5 mr-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="">
            <img src={search} alt="Search" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {months.map((month) => (
          <button
            key={month}
            className={`py-1 px-2 rounded-full text-sm ${
              month === selectedMonth ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleMonthClick(month)}
          >
            {month}월
          </button>
        ))}
      </div>
      <div className="friend-list">
        {friends.length > 0 && (
          <div className="mb-4">
            {friends
              .filter((friend) => {
                const today = new Date();
                const friendDate = new Date(friend.birthDay);
                return (
                  friendDate.getMonth() === today.getMonth() &&
                  friendDate.getDate() === today.getDate()
                );
              })
              .map((friend) => (
                <>
                  <div className="text-lg font-bold">오늘 생일</div>
                  <User
                    key={friend._id}
                    friend={friend}
                    setPhoneNumber={setPhoneNumber}
                  />
                </>
              ))}
          </div>
        )}
        {friends.map((friend) => (
          <User
            key={friend._id}
            friend={friend}
            setPhoneNumber={setPhoneNumber}
          />
        ))}
      </div>
    </div>
  );
}
