import React from "react";
import LoginForm from "../forms/LoginForm";

import { signIn } from "next-auth/react";

export default function Signin({}) {
  async function sendOtp(phoneNumber) {
    const res = await fetch("http://localhost:8080/auth/generateotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
    });

    console.log(res);

    if (!res.ok) {
      alert("error occured");
      return false;
    }

    const data = await res.json();

    console.log(data);

    return true;
  }
  async function validateOtp(phoneNumber, otp) {
    const res = await fetch("http://localhost:8080/auth/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        otp: otp,
      }),
    });

    console.log(res);

    if (!res.ok) {
      alert("error occured");
      return false;
    }

    const data = await res.json();

    console.log(data);

    signIn("credentials", {
      mobile: phoneNumber,
      token: data.message,
      redirect: false,
    });

    return true;
  }

  return (
    <div>
      <LoginForm sendOtp={sendOtp} validateOtp={validateOtp} />
    </div>
  );
}
