"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DeleteUser({ userId }) {
  const router = useRouter();
  const deleteUser = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:3000/api/user/delete/${id}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
  };

  return (
    <div>
      <button
        className="h-10 bg-pink-800 w-20 text-white rounded-md hover:bg-pink-900"
        onClick={() => deleteUser(userId)}
      >
        Delete
      </button>
    </div>
  );
}
