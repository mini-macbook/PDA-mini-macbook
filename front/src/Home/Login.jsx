import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../stores/auth";
import axios from "axios";
import { fetchLogin } from "../Api/AuthApi";

import first from '../imgs/first.png';
import before from '../imgs/before.png';

export const AUTH_KEY = "AUTH_USER";

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3001/api/users/login";
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [state, setState] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onClickLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchLogin(state);
      const user = response.data;
      if (user.token) {
        setUserInfo(user);
        console.log(user);
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
        navigate("/main");
      } else {
        alert("Error logging in");
      }
    } catch (error) {
      console.error(error);
      alert("로그인이 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-m w-full max-w-4xl gap-10">
        <Link
          to="/"
          className="mr-auto"
        >
          <img src={before} alt="before" className="w-4 h-4 mr-2 mt-1" />
        </Link>
        <div className="mt-6 text-4xl md:text-6xl font-extrabold flex justify-between text-center text-transparent bg-clip-text text-black">
          <img src={first} alt="before" className="m-auto" />
        </div>

        <form className="mt-8 w-full max-w-64" onSubmit={onClickLogin}>
          <div className="flex items-center justify-center border-b border-gray-300 pb-2" style={{ width: "100%" }}>
            <div className="w-64">
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 placeholder-gray-400 border-none focus:outline-none sm:text-sm"
                placeholder="아이디"
                value={state.userEmail}
                onChange={handleChangeState}
              />
            </div>
          </div>
          <div className="flex items-center justify-center border-b border-gray-300 pb-2" style={{ width: "100%" }}>
            <div className="w-64">
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                autoComplete="current-userPassword"
                required
                className="relative block w-full px-3 py-2 placeholder-gray-400 border-none focus:outline-none sm:text-sm"
                placeholder="비밀번호"
                value={state.userPassword}
                onChange={handleChangeState}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center px-4 py-2 text-sm font-bold text-white bg-blue-400 border border-transparent rounded-md shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              로그인
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="font-medium text-zinc-700 hover:text-zinc-500"
          >
            계정이 없으신가요? 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
