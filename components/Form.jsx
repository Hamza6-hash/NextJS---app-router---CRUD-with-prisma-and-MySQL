"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const savedUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (res.status === 409) alert("User exist");
      if (res.status === 400) alert("Empty fields are not allowed...");
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-lg text-center p-3">Create Form</h1>
      <form onSubmit={savedUser} className="flex flex-col gap-4">
        <input
          className="rounded-md h-10 p-3"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="rounded-md h-10 p-3"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="rounded-md h-10 p-3"
          type="text"
          placeholder=" Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded-md h-10 p-3"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white h-10 hover:opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
