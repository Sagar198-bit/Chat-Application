import { createUser, loginUser } from "../services/authServices.js";
export const signup= async (req, res) => {
  try {
    await createUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    // known errors thrown from service
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    // unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  //checking user sucessfully login or not ?
  try {
    const { token, user } = await loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true, // cannot access via JS
      secure: false, // true in production (HTTPS)
      sameSite: "Lax", // CSRF protection
    });
    res.status(200).json({
      message: "User Login Successfully",
      status: true,
      user: user,
    });
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json({
        message: err.message,
        status: false,
      });
    }
    res.status(500).json({
      message: "Server Internal Problem",
      status: false,
    });
  }
};


export const getme = (req , res) => {
  try{
    console.log("Cookies: " , req.cookies)
  }catch(err){
    console.log(err)
  }
}