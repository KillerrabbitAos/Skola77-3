"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const user = session?.user;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

    } catch {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || !user) return <div>laddar</div>;

  if (user.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
          className="border-2 border-gray-300 rounded p-1 m-1"
            type="text"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            value={password}
            className="border-2 border-gray-300 rounded mr-1 p-1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="bg-amber-200 p-1 rounded border-gray-300 border-2">Create</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
