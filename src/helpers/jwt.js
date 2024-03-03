import jwt from "jsonwebtoken";

class JWT {
  static generateToken(payload, expiresIn) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiresIn || "1d",
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export default JWT;
