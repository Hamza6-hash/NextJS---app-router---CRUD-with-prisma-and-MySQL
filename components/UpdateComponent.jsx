"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateComponent() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setID] = useState("");

  const updateUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/user/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ firstName, lastName }),
    });
    if (res.status === 400) alert("Please Provide a valid ID");
    if (res.ok) router.refresh();
  };

  return (
    <div>
      <h1 className="font-semibold text-lg text-center p-3">Update Form</h1>
      <form onSubmit={updateUser} className="flex flex-col gap-4 p-4">
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
          placeholder="ID"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <button className="bg-orange-400 h-10 hover:bg-orange-500">
          Update
        </button>
      </form>
    </div>
  );
}
