import { useState } from "react";
import { useAppCtx } from "../utils/AppContext";

const SignupPage = () => {
  const defForm = {
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defForm);
  const [signupResult, setSignupResult] = useState("");

  const { setUser } = useAppCtx();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!query.ok) {
      setSignupResult("fail");
    } else {
      const result = await query.json();
      setSignupResult("success");
      setUser(result);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  };

  return (
    <div className="container w-25 mx-auto mt-4">
      <h1 className="text-center my-4">Signup</h1>

      <form className="form mb-3">
        <div className="form-group">
          <label className="my-2">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Gary"
            className="form-control mb-3"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="my-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Almes"
            className="form-control mb-3"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="my-2">City</label>
          <input
            type="text"
            name="city"
            placeholder="Minneapolis"
            className="form-control mb-3"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="my-2">State</label>
          <input
            type="text"
            name="state"
            placeholder="Minnesota"
            className="form-control mb-3"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="my-2">Email</label>
          <input
            type="text"
            name="email"
            placeholder="john@gmail.com"
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

        <div className="form-group mt-2 text-center">
          <button className="btn btn-primary" onClick={handleFormSubmit}>
            Sign Me Up!
          </button>
          <p className="mt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-decoration-none"
              style={{ color: "blue" }}
            >
              Login here.
            </a>
          </p>
        </div>
      </form>

      {signupResult === "success" && (
        <div className="alert alert-success" role="alert">
          Signup successful!
        </div>
      )}

      {signupResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Signup failed!
        </div>
      )}
    </div>
  );
};

export default SignupPage;
