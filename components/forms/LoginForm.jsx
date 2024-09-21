import React, { FormEvent, useState } from "react";

export default function LoginForm({ sendOtp, validateOtp }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);

  async function genOtp(event) {
    event.preventDefault();

    setPhoneNumber(event.target[0].value);

    const res = await sendOtp(event.target[0].value);

    if (res) {
      setSend(true);
    }
  }

  async function login(event) {
    event.preventDefault();

    setOtp(event.target[0].value);

    const res = await validateOtp(phoneNumber, event.target[0].value);

    if (!res) {
      setError(true);
      return;
    }
  }

  return (
    <div>
      LoginForm
      {/* send otp */}
      {!send && (
        <form onSubmit={genOtp}>
          <input type="text" />
          <button>Send Otp</button>
        </form>
      )}
      {/* validate otp */}
      {send && (
        <form onSubmit={login}>
          <input type="text" />
          <button>Login</button>
        </form>
      )}
      {error && <h3>Error</h3>}
    </div>
  );
}
