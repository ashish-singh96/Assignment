const authMiddleware = (req, res, next) => {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Authorization Header:", req.header("Authorization"));
    console.log("Extracted Token:", token);
   
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
      req.userExits = decoded.userExits;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
  
export default authMiddleware;
