import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/Authprovider";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    if (name.length < 5) {
      setError({ ...error, name: "must be more than 5 character long" });
      return;
    }
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
    console.log({ name, email, photo, password });

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
        <h2 className="text-2xl font-semibold text-center mt-4">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Your Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full h-12"
              placeholder="Enter your name"
              required
            />
            {error.name && (
              <label className="label text-xs text-red-600">{error.name}</label>
            )}

            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full h-12"
              placeholder="Enter your photo-url"
              required
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full h-12"
              placeholder="Enter your email address"
              required
            />
            <label className="label mt-4">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full h-12"
              placeholder="Enter your password"
              required
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p className="text-center font-semibold">
            Already have an Account?
            <Link className="text-red-500" to="/auth/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
