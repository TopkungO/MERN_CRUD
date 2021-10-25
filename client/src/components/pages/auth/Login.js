import React, { useState } from "react";
import { toast } from "react-toastify";
//function
import { loginHandler } from "../../functions/auth";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, password } = formData;

  //? เช็คสิทธิ์
  const roleBasedRedirect = (res) => {
    if (res === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const newUser = {
      name,
      password,
    };
    
    loginHandler(newUser)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        toast.success("login complete");
        roleBasedRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Login</h1> : <h1>Loging</h1>}

          <form onSubmit={onSubmit}>
            <input
              className="form-control mb-2"
              type="text"
              name="name"
              placeholder="UserName"
              autoFocus
              onChange={onChange}
            />

            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            />

            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
