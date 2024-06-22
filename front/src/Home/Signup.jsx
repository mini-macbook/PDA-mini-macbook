import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { fetchSignup, fetchNickName } from "../Api/AuthApi";

import before from '../imgs/before.png';

const Signup = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3001/api/users/signup";
  const nickNameUrl = "http://localhost:3001/api/users/nickName";

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [state, setState] = useState({
    department: "",
    userEmail: "",
    userPassword: "",
    passwordCheck: "",
    nickName: "",
    phoneNumber: "",
    birthDay: Date.now(),
  });

  const onClickSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchSignup(state);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("회원가입이 실패했습니다.");
    }
  };

  const onClickNickNameCheck = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchNickName({
        nickName: state.nickName,
      });
      console.log(response.data);
      if (response.data.result === true) {
        alert("중복된 아이디 입니다.");
      } else {
        alert("사용가능한 아이디 입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("중복검사가 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div>
          <Link
            to="/"
            className="flex "
          >
            <img src={before} alt="before" className="w-4 h-4 mr-2" />
          </Link>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-black">
          회원가입
        </h2>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            {/* 이름 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="nickName"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                이름
              </label>
              <div className="relative flex-grow">
                <input
                  id="nickName"
                  name="nickName"
                  type="text"
                  value={state.nickName}
                  autoComplete="nickName"
                  required
                  onChange={handleChangeState}
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="이름"
                />
              </div>
            </div>

            {/* 아이디 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="userEmail"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                아이디
              </label>
              <div className="relative flex-grow">
                <input
                  id="userEmail"
                  name="userEmail"
                  type="text"
                  value={state.userEmail}
                  autoComplete="userEmail"
                  required
                  onChange={handleChangeState}
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="아이디"
                />
              </div>
            </div>

            {/* 중복 검사 버튼 */}
            <div className="flex items-center space-x-2">
              <div className="w-24"></div> {/* 공간을 만들기 위한 빈 div */}
              <button
                type="button"
                className="flex-shrink-0 py-2 px-6 text-xs font-semibold text-gray-400 bg-white border border-l border-transparent rounded-md shadow-sm hover:bg-lime-300 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                onClick={onClickNickNameCheck}
              >
                중복 검사
              </button>
            </div>

            {/* 비밀번호 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="userPassword"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                비밀번호
              </label>
              <div className="relative flex-grow">
                <input
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  onChange={handleChangeState}
                  value={state.userPassword}
                  autoComplete="new-password"
                  required
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="비밀번호 입력"
                />
              </div>
            </div>

            {/* 학과 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="department"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                학과
              </label>
              <div className="relative flex-grow">
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={state.department}
                  autoComplete="department"
                  required
                  onChange={handleChangeState}
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="학과"
                />
              </div>
            </div>

            {/* 생년월일 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="birthDay"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                생년월일
              </label>
              <div className="relative flex-grow">
                <input
                  id="birthDay"
                  name="birthDay"
                  value={state.birthDay}
                  type="date"
                  required
                  onChange={handleChangeState}
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="yyyy-mm-dd"
                />
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center space-x-2">
              <label
                htmlFor="phoneNumber"
                className="block w-24 text-sm font-medium leading-5 text-gray-700"
              >
                전화번호
              </label>
              <div className="relative flex-grow">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="phoneNumber"
                  required
                  value={state.phoneNumber}
                  onChange={handleChangeState}
                  className="w-full max-w-xs px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={onClickSignUp}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-lime-300 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
            >
              회원가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
