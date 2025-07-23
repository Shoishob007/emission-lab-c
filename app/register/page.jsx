"use client";

import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  CheckCircle,
  Lock,
  LockKeyhole,
  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import { checkPasswordStrength, emailRegex } from "@/utils/helper";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

// API base URL from env variable
const API_URL = process.env.NEXT_PUBLIC_API;

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const router = useRouter();

  const btnBase =
    "relative w-full py-2.5 rounded-lg text-white font-semibold text-base bg-gradient-to-br from-primary to-green-600 shadow transition-all overflow-hidden flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 hover:opacity-90 duration-500";
  const btnIcon =
    "pointer-events-none flex items-center justify-center mr-2 flex-shrink-0 opacity-80";

  // fallback timeout in case onLoad doesn't trigger
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!animationLoaded) {
        setAnimationLoaded(true);
      }
    }, 100);

    return () => clearTimeout(fallbackTimer);
  }, [animationLoaded]);

  // validation check
  const isFullNameValid = fullName.trim().length >= 2;
  const isEmailValid = emailRegex.test(email);
  // const isPhoneValid = phoneRegex.test(phone) || phone === "";
  const passwordStrength = checkPasswordStrength(password);
  const isPasswordValid =
    passwordStrength === "strong" || passwordStrength === "medium";
  const isConfirmValid = confirmPassword === password && password.length > 0;

  // API call
  const registerUser = async ({ email, name, password, phone }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        password,
        role: "individual",
      }),
    });
    // error
    if (!res.ok) {
      let error = "Registration failed";
      try {
        const data = await res.json();
        error = data.detail || data.message || JSON.stringify(data);
      } catch {}
      throw new Error(error);
    }
    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      await registerUser({ email, name: fullName, password });
      setSuccess(true);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(false), 3000);
      router.push("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // validation
  const validationIcon = (valid, value) => {
    if (!value) return null;
    if (valid)
      return (
        <CheckCircle
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary transition-all duration-300 animate-[checkmark_0.5s_ease-out]"
          size={20}
          aria-label="valid"
        />
      );
    return (
      <XCircle
        className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 animate-[shake_0.5s_ease-out]"
        size={20}
        aria-label="invalid"
      />
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 overflow-x-hidden">
      <div className="relative z-10 w-full max-w-[480px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_20px_60px_rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.1)] animate-slideUp">
        <div className="text-center">
          <div className="pointer-events-none flex items-center justify-center -mb-6 -mt-4">
            <DotLottieReact
              src="/tree-animation.lottie"
              loop
              autoplay
              onLoad={() => {
                setAnimationLoaded(true);
              }}
              onError={(error) => {
                setAnimationLoaded(true);
              }}
              style={{
                width: "250px",
                height: "250px",
                opacity: animationLoaded ? 0.9 : 0,
                transition: "opacity 0.3s ease-out",
              }}
            />
          </div>
          <h1
            className={`text-primary text-2xl md:text-[28px] font-bold mb-2 transition-all duration-500 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            Join Emission Lab
          </h1>
          <p
            className={`text-gray-600 text-base mb-2 transition-all duration-500 delay-100 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            Start your sustainable journey today
          </p>
        </div>
        {/* Form */}
        <form
          id="registrationForm"
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-8"
        >
          {/* name */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-200 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                size={20}
                strokeWidth={1.8}
              />
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full pl-12 pr-10 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-sm placeholder:text-sm transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  borderColor: fullName
                    ? isFullNameValid
                      ? "#4CAF50"
                      : "#f44336"
                    : "#e0e0e0",
                }}
                required
              />
              {validationIcon(isFullNameValid, fullName)}
            </div>
          </div>
          {/* email */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-200 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                size={20}
                strokeWidth={1.8}
              />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-10 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-sm placeholder:text-sm transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: email
                    ? isEmailValid
                      ? "#4CAF50"
                      : "#f44336"
                    : "#e0e0e0",
                }}
                required
              />
              {validationIcon(isEmailValid, email)}
            </div>
          </div>
          {/* pass */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-200 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                size={20}
                strokeWidth={1.8}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full pl-12 pr-10 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-sm placeholder:text-sm transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderColor: password
                    ? isPasswordValid
                      ? "#4CAF50"
                      : "#f44336"
                    : "#e0e0e0",
                }}
                required
              />
              {validationIcon(isPasswordValid, password)}
            </div>
          </div>
          {/* confirm Password */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-200 ${
              animationLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            <div className="relative">
              <LockKeyhole
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                size={20}
                strokeWidth={1.8}
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full pl-12 pr-10 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-sm placeholder:text-sm transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  borderColor: confirmPassword
                    ? isConfirmValid
                      ? "#4CAF50"
                      : "#f44336"
                    : "#e0e0e0",
                }}
                required
              />
              {validationIcon(isConfirmValid, confirmPassword)}
            </div>
          </div>
          {apiError && (
            <div className="mb-3 text-red-500 text-sm text-center">
              {apiError}
            </div>
          )}
          <div
            className={`flex flex-col gap-3 mt-2 mb-1 transition-all duration-500 delay-400 ${
              animationLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <button
              type="submit"
              className={`${btnBase} bg-btn-secondary hover:bg-btn-secondary-hover`}
              disabled={
                loading ||
                !isFullNameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmValid
              }
            >
              {loading && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </span>
              )}
              <span className="btn-text transition-opacity duration-300">
                {success ? "🎉 Welcome to Emission Lab!" : "Ready To Go!"}
              </span>
            </button>
            {/* <button
              type="button"
              className={`${btnBase} !bg-[#DB4437] !from-[#DB4437] !to-[#DB4437]`}
              aria-label="Login with Google"
            >
              <span className={btnIcon}>
                <RiGoogleFill size={18} aria-hidden="true" />
              </span>
              Register with Google
            </button>
            <button
              type="button"
              className={`${btnBase} !bg-[#14171a] !from-[#14171a] !to-[#14171a]`}
              aria-label="Login with X"
            >
              <span className={btnIcon}>
                <RiTwitterXFill size={18} aria-hidden="true" />
              </span>
              Register with X
            </button>
            <button
              type="button"
              className={`${btnBase} !bg-[#1877f2] !from-[#1877f2] !to-[#1877f2]`}
              aria-label="Login with Facebook"
            >
              <span className={btnIcon}>
                <RiFacebookFill size={18} aria-hidden="true" />
              </span>
              Register with Facebook
            </button> */}
          </div>
          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:text-green-800 transition-colors"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;