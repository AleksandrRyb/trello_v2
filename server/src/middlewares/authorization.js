import jwt from "jsonwebtoken";

async function protect(req, res, next) {
  const token = req.header("x-auth-token");
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "You need to be logged in to visit this page" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "You need to be logged in to visit this page" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "You need to be logged in to visit this page" });
  }
}

export { protect };
