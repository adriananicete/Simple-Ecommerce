import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function Auth() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const { signup, login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError(null)
    let result;
    if ( mode === 'signup') {
      result = signup(data.email, data.password)
    } else {
      result = login(data.email, data.password)
    }

    if(result.success) {
      navigate('/');
    } else {
      setError(result.error)
    }

    console.log(result)
  };
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form
            action=""
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required!" })}
                type="email"
                className="form-input"
                id="email"
              />
              {errors.email && (<span className="form-error">{errors.email.message}</span>)}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
                type="password"
                className="form-input"
                id="password"
              />
              {errors.password && (<span className="form-error">{errors.password.message}</span>)}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setMode("login")} className="auth-link">
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setMode("signup")} className="auth-link">
                  Sign UP
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
