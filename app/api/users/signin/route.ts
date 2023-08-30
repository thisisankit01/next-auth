import { connect } from "@/db/dbconfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //checking if user doestn't exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json("The user Doesn't Exits", { status: 400 });
    }

    //comparing db password with actual password by dehashing it
    const deHashedPassword = await bcrypt.compare(password, user.password);

    if (!deHashedPassword) {
      return NextResponse.json("Incorrect Password", { status: 400 });
    }
    console.log(user);

    //creating token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Sign in successful",
      success: true,
      status: 200,
    });

    //setting cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
