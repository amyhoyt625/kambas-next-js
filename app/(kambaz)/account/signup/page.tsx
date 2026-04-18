"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, FormSelect } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    role:"STUDENT",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      redirect("/account/profile");
    } catch (e: any) {
      setError(e.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2" placeholder="username" />
      <FormControl value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2" placeholder="password" type="password" />
      <FormSelect                                         // ← entire block is new
  value={user.role}
  onChange={(e) => setUser({ ...user, role: e.target.value })}
  className="mb-2">
  <option value="STUDENT">Student</option>
  <option value="FACULTY">Faculty</option>
</FormSelect>
      <button onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100">
        Sign up
      </button><br />
      <Link href="signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}