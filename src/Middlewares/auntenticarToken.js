import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function autenticarToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ erro: "Token ausente" });
  }

  try {
    const decodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = decodificado;
    next(); // continua pra próxima rota
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}
