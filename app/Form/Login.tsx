import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    try {
      setDisabled(true);
      setProcessing(true);
      const response = await axios.post("/api/users/signin", user);
      console.log("Sign in success!", response.status);
      setUser({ ...user, email: "", password: "" });
      await router.push("/profile/");
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (user.email.length || user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            id="password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleSubmit()}
          disabled={disabled ? true : false}
        >
          {processing ? "processing..." : "login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
