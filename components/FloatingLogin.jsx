"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  LockKeyhole,
  User,
  Phone,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { RiFacebookFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { checkPasswordStrength, emailRegex, phoneRegex } from "@/utils/helper";


const API_URL = process.env.NEXT_PUBLIC_API || "https://api.aiemissionlab.com";
const leftImage = "/CTA_bg_1.jpg";

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

export function FloatingLoginModal({ open, onOpenChange }) {
  const [showSignUp, setShowSignUp] = useState(false);

  // --- LOGIN STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  // --- REGISTER STATE
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState("");

  const router = useRouter();

  // Login validation
  const isEmailValid = emailRegex.test(email);
  const passwordStrength = checkPasswordStrength(password);
  const isPasswordValid =
    passwordStrength === "strong" || passwordStrength === "medium";

  // Register validation
  const isFullNameValid = fullName.trim().length >= 2;
  const isRegEmailValid = emailRegex.test(regEmail);
  const isPhoneValid = phoneRegex.test(phone) || phone === "";
  const regPasswordStrength = checkPasswordStrength(regPassword);
  const isRegPasswordValid =
    regPasswordStrength === "strong" || regPasswordStrength === "medium";
  const isConfirmValid =
    confirmPassword === regPassword && regPassword.length > 0;

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setLoginError("Invalid email or password. Please try again.");
        setLoginLoading(false);
        return;
      }
      if (result?.ok) {
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          onOpenChange(false);
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      setLoginError("An error occurred during login. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Register handler
  const registerUser = async ({ email, name, password, phone }) => {
    const res = await fetch(`${API_URL}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        password,
        phone: phone || undefined,
        role: "individual",
      }),
    });
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    try {
      await registerUser({
        email: regEmail,
        name: fullName,
        password: regPassword,
        phone,
      });
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setShowSignUp(false);
        // Optionally auto-fill login fields
        setEmail(regEmail);
        setPassword(regPassword);
      }, 1500);
    } catch (err) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] w-full p-0 rounded-2xl overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row bg-white min-h-[680px] relative transition-all duration-500">
          {/* Left half with image and text */}
          <div
            className="md:w-1/2 w-full max-h-[680px] flex flex-col justify-center items-center p-0 relative"
            style={{
              background: `url(${leftImage}) center center / cover no-repeat`,
            }}
          >
            <div className="absolute inset-0 bg-black/40 z-0 rounded-l-2xl" />
            <div className="relative z-10 flex flex-col items-center text-center w-full h-full justify-center p-8">
              <h2 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                {showSignUp ? "Create Account" : "Good Afternoon"}
                <br />
                Welcome
              </h2>
              <span className="text-white font-medium mb-8 text-base drop-shadow">
                {showSignUp ? "Already have account?" : "Don't have account ?"}
              </span>
              <button
                className="px-7 py-2 rounded-lg bg-btn-primary hover:bg-btn-primary-hover text-white font-bold text-base flex items-center gap-2 shadow-lg transition mx-auto sm:mx-0 sm:w-fit"
                onClick={() => setShowSignUp((prev) => !prev)}
                type="button"
              >
                {showSignUp ? "Sign In" : "Register"}
              </button>
            </div>
          </div>

          {/* Right half: Form */}
          <div className="md:w-1/2 w-full max-h-[680px] flex flex-col justify-center items-center bg-white relative overflow-y-auto">
            {!showSignUp ? (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full max-w-[420px] flex flex-col justify-center items-center bg-white rounded-xl p-8">
                  <h3 className="text-3xl font-bold text-[#22292f] mb-6 text-center">
                    Sign In
                  </h3>
                  <form
                    className="space-y-3 w-full"
                    autoComplete="off"
                    onSubmit={handleLoginSubmit}
                  >
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="email"
                        placeholder="Enter Username / Email"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
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
                        disabled={loginLoading}
                      />
                      {validationIcon(isEmailValid, email)}
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
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
                        disabled={loginLoading}
                      />
                      {validationIcon(isPasswordValid, password)}
                    </div>
                    {loginError && (
                      <div className="mb-2 text-red-500 text-sm text-center">
                        {loginError}
                      </div>
                    )}
                    {/* <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-gray-400 text-xs hover:underline"
                      >
                        Forgot Password ?
                      </a>
                    </div> */}
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-lg text-base font-bold bg-[#3BBF4A] hover:bg-green-700 shadow-none transition-all mt-2"
                      disabled={
                        loginLoading || !isEmailValid || !isPasswordValid
                      }
                    >
                      {loginLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white animate-spin mr-2"
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
                          Logging in...
                        </span>
                      ) : loginSuccess ? (
                        "🎉 Welcome to Emission Lab!"
                      ) : (
                        "Login Now"
                      )}
                    </Button>
                    {/* Social logins */}
                    {/* <div className="flex flex-col text-white gap-3 mt-4">
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#DB4437] hover:bg-[#c1351a] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Login with Google"
                        disabled={loginLoading}
                      >
                        <RiGoogleFill size={20} className="mr-2" />
                        Login with Google
                      </button>
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#14171a] hover:bg-[#23272f] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Login with X"
                        disabled={loginLoading}
                      >
                        <RiTwitterXFill size={20} className="mr-2" />
                        Login with X
                      </button>
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#1877f2] hover:bg-[#1558b0] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Login with Facebook"
                        disabled={loginLoading}
                      >
                        <RiFacebookFill size={20} className="mr-2" />
                        Login with Facebook
                      </button>
                    </div> */}
                  </form>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full max-w-[420px] flex flex-col justify-center items-center bg-white rounded-xl p-8">
                  <h3 className="text-3xl font-bold text-[#22292f] mb-6 text-center">
                    Join Emission Lab
                  </h3>
                  <form
                    className="space-y-3 w-full"
                    autoComplete="off"
                    onSubmit={handleSignUpSubmit}
                  >
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
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
                        disabled={regLoading}
                      />
                      {validationIcon(isFullNameValid, fullName)}
                    </div>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        style={{
                          borderColor: regEmail
                            ? isRegEmailValid
                              ? "#4CAF50"
                              : "#f44336"
                            : "#e0e0e0",
                        }}
                        required
                        disabled={regLoading}
                      />
                      {validationIcon(isRegEmailValid, regEmail)}
                    </div>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          borderColor: phone
                            ? isPhoneValid
                              ? "#4CAF50"
                              : "#f44336"
                            : "#e0e0e0",
                        }}
                        disabled={regLoading}
                      />
                      {validationIcon(isPhoneValid, phone)}
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        style={{
                          borderColor: regPassword
                            ? isRegPasswordValid
                              ? "#4CAF50"
                              : "#f44336"
                            : "#e0e0e0",
                        }}
                        required
                        disabled={regLoading}
                      />
                      {validationIcon(isRegPasswordValid, regPassword)}
                    </div>
                    <div className="relative">
                      <LockKeyhole
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all"
                        size={20}
                        strokeWidth={1.8}
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-base placeholder:text-base transition-all focus:border-green-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(76,175,80,0.1)]"
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
                        disabled={regLoading}
                      />
                      {validationIcon(isConfirmValid, confirmPassword)}
                    </div>
                    {regError && (
                      <div className="mb-2 text-red-500 text-sm text-center">
                        {regError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-lg text-base font-bold bg-[#3BBF4A] hover:bg-green-700 shadow-none transition-all mt-2"
                      disabled={
                        regLoading ||
                        !isFullNameValid ||
                        !isRegEmailValid ||
                        !isRegPasswordValid ||
                        !isConfirmValid
                      }
                    >
                      {regLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white animate-spin mr-2"
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
                          Registering...
                        </span>
                      ) : regSuccess ? (
                        "🎉 Welcome to Emission Lab!"
                      ) : (
                        "Register"
                      )}
                    </Button>
                    {/* Social logins */}
                    {/* <div className="flex flex-col text-white gap-3 mt-4">
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#DB4437] hover:bg-[#c1351a] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Sign up with Google"
                        disabled={regLoading}
                      >
                        <RiGoogleFill size={20} className="mr-2" />
                        Sign up with Google
                      </button>
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#14171a] hover:bg-[#23272f] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Sign up with X"
                        disabled={regLoading}
                      >
                        <RiTwitterXFill size={20} className="mr-2" />
                        Sign up with X
                      </button>
                      <button
                        type="button"
                        className="w-full h-12 rounded-lg text-base font-bold bg-[#1877f2] hover:bg-[#1558b0] flex items-center justify-center gap-2 shadow-none transition-all"
                        aria-label="Sign up with Facebook"
                        disabled={regLoading}
                      >
                        <RiFacebookFill size={20} className="mr-2" />
                        Sign up with Facebook
                      </button>
                    </div> */}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
