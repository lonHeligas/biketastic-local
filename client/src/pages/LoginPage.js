import { useState } from "react";
import cookie from "js-cookie";
import { useAppCtx } from "../utils/AppContext";

const LoginPage = () => {
  const defForm = { email: "", password: "" };
  const [formData, setFormData] = useState(defForm);
  const [loginResult, setLoginResult] = useState("");

  const { setUser } = useAppCtx();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const query = await fetch("/api/user/auth", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await query.json();

    if (result && !result.err && result.data && result.data.token) {
      setLoginResult("success");
      setUser(result.data.user);
      cookie.set("auth-token", result.data.token, { expires: 3 });
    } else {
      setLoginResult("fail");
    }
  };

  return (
    <div className="container w-25 mx-auto mt-4">
      <h1 className="text-center my-4">Login</h1>

      <form className="form mb-3">
        <div className="form-group">
          <label className="my-2">Email</label>
          <input
            type="text"
            name="email"
            placeholder="gary@gmail.com"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="my-2">Password</label>
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2 text-center ">
          <button className="btn btn-primary" onClick={handleFormSubmit}>
            Login
          </button>
          <p className="mt-2">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-decoration-none"
              style={{ color: "blue" }}
            >
              Signup here.
            </a>
          </p>
        </div>
      </form>

      {loginResult === "success" && (
        <div className="alert alert-success" role="alert">
          Login successful!
        </div>
      )}

      {loginResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Login failed!
        </div>
      )}
    </div>
  );
};

export default LoginPage;
