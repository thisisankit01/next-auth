import React, { useEffect, useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setDisabled(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success: ", response.data);
      setUser({ ...user, email: "", username: "", password: "" });
    } catch (error) {
      console.log("SignUp Failed : ", error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a account now for free!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            type="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            id="username"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={user.email}
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={user.password}
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={disabled ? true : false}>
          {loading ? "Processing..." : "Create account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
