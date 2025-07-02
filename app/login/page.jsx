"use client";

import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CheckCircle, Lock, Mail, XCircle } from "lucide-react";
import { checkPasswordStrength, emailRegex } from "@/utils/helper";
import { signIn, getSession } from "next-auth/react";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

const btnBase =
  "relative w-full py-2.5 rounded-lg text-white font-semibold text-base bg-gradient-to-br from-primary to-green-600 shadow transition-all overflow-hidden flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 hover:opacity-90 duration-500";
const btnIcon =
  "pointer-events-none flex items-center justify-center mr-2 flex-shrink-0 opacity-80";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const router = useRouter();

  // fallback timeout in case onLoad doesn't trigger
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!animationLoaded) {
        setAnimationLoaded(true);
      }
    }, 200);
    return () => clearTimeout(fallbackTimer);
  }, [animationLoaded]);

  const isEmailValid = emailRegex.test(email);
  const passwordStrength = checkPasswordStrength(password);
  const isPasswordValid =
    passwordStrength === "strong" || passwordStrength === "medium";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        setSuccess(true);
        const session = await getSession();
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // validation check
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
      <div className="relative z-10 w-full max-w-[480px] bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_20px_60px_rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.1)] animate-slideUp">
        <div className="text-center">
          <div className="pointer-events-none flex items-center justify-center -mb-6 -mt-4">
            <DotLottieReact
              src="/tree-animation.lottie"
              loop
              autoplay
              onLoad={() => setAnimationLoaded(true)}
              onError={() => setAnimationLoaded(true)}
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
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Welcome Back!
          </h1>
          <p
            className={`text-gray-600 text-base mb-2 transition-all duration-500 delay-100 ${
              animationLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Continue your sustainable journey towards future
          </p>
        </div>
        <form
          id="loginForm"
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* email */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-200 ${
              animationLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
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
                disabled={loading}
              />
              {validationIcon(isEmailValid, email)}
            </div>
          </div>

          {/* password */}
          <div
            className={`mb-5 form-group transition-all duration-500 delay-300 ${
              animationLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
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
                disabled={loading}
              />
              {validationIcon(isPasswordValid, password)}
            </div>
          </div>

          {/* login button and social logins */}
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
              disabled={loading || !isEmailValid || !isPasswordValid}
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
                {success
                  ? "🎉 Welcome to Emission Lab!"
                  : loading
                  ? "Signing In..."
                  : "Ready To Go!"}
              </span>
            </button>

            <button
              type="button"
              className={`${btnBase} !bg-[#DB4437] !from-[#DB4437] !to-[#DB4437]`}
              aria-label="Login with Google"
              disabled={loading}
            >
              <span className={btnIcon}>
                <RiGoogleFill size={18} aria-hidden="true" />
              </span>
              Login with Google
            </button>

            <button
              type="button"
              className={`${btnBase} !bg-[#14171a] !from-[#14171a] !to-[#14171a]`}
              aria-label="Login with X"
              disabled={loading}
            >
              <span className={btnIcon}>
                <RiTwitterXFill size={18} aria-hidden="true" />
              </span>
              Login with X
            </button>

            <button
              type="button"
              className={`${btnBase} !bg-[#1877f2] !from-[#1877f2] !to-[#1877f2]`}
              aria-label="Login with Facebook"
              disabled={loading}
            >
              <span className={btnIcon}>
                <RiFacebookFill size={18} aria-hidden="true" />
              </span>
              Login with Facebook
            </button>
          </div>

          <p
            className={`text-center mt-5 text-gray-600 text-sm transition-all duration-500 delay-500 ${
              animationLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            Not registered yet?{" "}
            <a
              href="/register"
              className="text-primary font-medium hover:text-green-700 transition-colors"
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
