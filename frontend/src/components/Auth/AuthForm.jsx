import React, { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Function to pre-fill the guest user data
  const handleGuestLogin = () => {
    setFormData({
      email: "guestuser@gmail.com",
      password: "12345678",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-2/4 mx-auto mt-10 p-6 bg-custom-purple text-purple-900 rounded-3xl shadow-[5px_5px_10px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-shrikhand text-white mb-4 text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <div className="mb-4">
        <label htmlFor="email" className="block font-shrikhand text-white">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-full font-shrikhand bg-white text-gray-700 placeholder-gray-400"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-shrikhand text-white">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-full font-shrikhand bg-white text-gray-700 placeholder-gray-400 "
          placeholder="Enter your password"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="w-1/2 bg-custom-pink font-shrikhand text-black p-2 rounded-full border-e-4 border-b-4 border-black transform transition-transform duration-200 hover:scale-105"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {mode === "login" && (
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-1/2 bg-custom-blue font-shrikhand text-black p-2 rounded-full border-e-4 border-b-4 border-black transform transition-transform duration-200 hover:scale-105"
          >
            Login as Guest
          </button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
