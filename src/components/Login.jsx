import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true); // True = หน้า Login
  const navigate = useNavigate();

  //   กดแล้วแจ้งเตือน
  const handleForgetPassword = () => {
    alert("Forgot-Password");
  };

  //  กดแล้วไปหน้า Home
  const handleLogin = () => {
    navigate("/home");
  };

  //   แจ้งว่าลงทะเบียนเสร็จ
  const handleSignUp = () => {
    alert("Sign Up successful!");
  };

  return (
    <div className="d-flex align-items-center vh-100 justify-content-center">
      <div
        className="border border-1 border-black m-auto rounded-4 shadow p-4"
        style={{ width: "350px" }}
      >
        <h1
          className="align-items-center bg-secondary rounded-circle m-auto mt-4 mb-4"
          style={{ width: "200px", height: "200px" }}
        ></h1>

        {/* Form */}
        <div className="px-4 py-5">
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control border-black bg-secondary-subtle rounded-4 px-3 mb-3"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control border-black bg-secondary-subtle rounded-4 px-3 mb-3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control border-black bg-secondary-subtle rounded-4 px-3 mb-3"
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control border-black bg-secondary-subtle rounded-4 px-3 mb-3"
              />
            </div>
          )}

          {/* Forget Password*/}
          {isLogin && (
            <p
              className="text-center text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleForgetPassword}
            >
              Forget password
            </p>
          )}

          {/* button ปุ่ม */}
          <div className="d-flex">
            <Button
              variant={isLogin ? "warning" : "warning"}
              className="py-3 w-100 fs-5 rounded-5 px-5"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </div>

          {/* Link สลับหน้า */}
          <p className="mt-3 text-center text-primary">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
