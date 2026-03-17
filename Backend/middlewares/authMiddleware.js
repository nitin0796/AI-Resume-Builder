import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Error authenticating user", error);
    res.status(400).json({ message: error.message });
  }
};

export default authenticateToken;
