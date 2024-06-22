import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../stores/auth";
import axios from "axios";
import { fetchLogin } from "../Api/AuthApi";
import "../Components/Funding/FundingChart.css";
import { MdArrowBackIos } from "react-icons/md";

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
      <div className="flex flex-col items-center justify-center p-10 relative bg-white rounded-3xl shadow-m w-full max-w-4xl gap-10">
        <div className="mt-6 w-full text-4xl md:text-6xl font-extrabold flex text-center text-transparent bg-clip-text text-black">
          <Link
            to="/"
            className="text-gray-300 absolute left-60 top-16 items-center font-thin hover:text-white-500 justify-start"
          >
            <MdArrowBackIos className="text-3xl"/>
          </Link>
          <div className="RecipekoreaOtf m-auto text-4xl font-medium">
            티끌모아 맥북
          </div>
        </div>

        <form className="mt-8 w-full max-w-64" onSubmit={onClickLogin}>
          <div
            className="flex items-center justify-center border-b border-gray-300 mb-2"
            style={{ width: "100%" }}
          >
            <div className="w-64">
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 placeholder-gray-400 border-none focus:outline-none sm:text-sm"
                placeholder="이메일"
                value={state.userEmail}
                onChange={handleChangeState}
              />
            </div>
          </div>
          <div
            className="flex items-center justify-center border-b border-gray-300"
            style={{ width: "100%" }}
          >
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
        <div className="mb-4 text-center">
          <Link
            to="/signup"
            className="font-medium text-zinc-700 hover:text-zinc-500"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
