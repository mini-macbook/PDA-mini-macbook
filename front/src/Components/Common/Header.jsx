import React from "react";
import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import { Button, Navbar } from "flowbite-react";
import { userInfoState } from "../../stores/auth";
import { useRecoilState } from "recoil";
import { AUTH_KEY } from "../../Home/Login";
import { Avatar } from "flowbite-react";
import GetScrollY from "../../hooks/getScrollY";
export default function Header() {
  const getScrollY = GetScrollY();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userNickName = JSON.parse(sessionStorage.getItem(AUTH_KEY)).nickName;
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    sessionStorage.setItem(AUTH_KEY, "");
    setUserInfo({});
    navigate("/");
  };
  return (
    <div className="mb-20">
      <Navbar
        fluid
        rounded
        className={`px-4 mb-4 fixed left-0 top-0 right-0 ${
          getScrollY > 0 && "shadow-sm"
        }`}
      >
        <Navbar.Brand>
          <span
            className="pl-6 self-center text-xl font-semibold whitespace-nowrap dark:text-white hover:cursor-pointer"
            onClick={() => navigate("/main")}
          >
            티끌모아 맥북
          </span>
        </Navbar.Brand>
        <div className="flex items-center justify-center md:order-2">
          <Link to='/wish'>
            <span className="flex items-center mr-5 text-lg">
              <Avatar rounded size="sm" className="mr-2" />
              {userNickName}
            </span>
          </Link>
          <Button color="blue" onClick={handleLogout}>
            로그아웃
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="flex flex-row items-center justify-center mt-[-24px] ">
          {/* <Navbar.Link href="#" active>
            Home
          </Navbar.Link> */}
          <Navbar.Link
            className=" hover:cursor-pointer text-[16px]"
            onClick={() => {
              navigate("/main");
            }}
          >
            홈
          </Navbar.Link>
          <Navbar.Link
            className=" hover:cursor-pointer text-[16px]"
            onClick={() => {
              navigate("/product");
            }}
          >
            상품
          </Navbar.Link>
          <Navbar.Link
            className="hover:cursor-pointer text-[16px]"
            onClick={() => {
              navigate("/wish");
            }}
          >
            나의 펀딩
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">로고</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/main");
              }}
            >
              홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/product");
              }}
            >
              상품
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/wish");
              }}
            >
              위시리스트
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </div>
  );
}
