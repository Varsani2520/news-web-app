"use client";
import React, { useState } from "react";
import OtpInput from "otp-input-react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "../action/action";

const PhoneOtp = ({ user, setOpen, setLoading, phoneNo }) => {
  const [otp, setOtp] = useState(null);

  const dispatch = useDispatch();

  async function onOTPVerify() {
    
    if (!window.confirmationResult) {
      // Log an error or handle the absence of confirmationResult
      console.log("Confirmation result not available");
      return;
    }

    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        // after otp verification success
        addUserData(user);
        dispatch(loginUser(user));
        console.log(res);
        setOpen(false);
        console.log("Verify success");
        user.phone = phoneNo;
        console.log(user);
        toast.success("Login successful");
        Cookies.set("authenticated", true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Verification failed");
      });
  }

  return (
    <div className="flex flex-col justify-center items-center h-full text-start">
      <Toaster />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center text-center mb-6">
          <div className="">
            <h2 className="text-2xl font-bold text-start">Sign Up</h2>
          </div>
          <div className="">
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </div>
        </div>

        <div className="bg-white w-fit mx-auto p-4 rounded-full"></div>
        <label htmlFor="otp" className="font-small text-md text-center">
          Enter Verfication code send on
        </label>
        <p className="text-secondary">{phoneNo}</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          OTPLength={6}
          otpType="number"
          disabled={false}
          autoFocus
          className="opt-container"
        ></OtpInput>
        <button
          onClick={onOTPVerify}
          className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded secondry-bg"
        >
          <span>Verify OTP</span>
        </button>
      </div>
    </div>
  );
};

export default PhoneOtp;
