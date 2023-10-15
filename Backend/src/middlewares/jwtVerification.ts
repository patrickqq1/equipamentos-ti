import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
}

declare global {
    namespace Express {
        interface Request {
            id: number;
        }
    }
}

export const jwtVerify = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tokenHeader: any = request.headers.authorization;
  if (!tokenHeader) {
    return response.status(401).send({ message: "Token nao fornecido!" });
  }
  try {
    const [, token] = tokenHeader.split(" ");
    const tokenDecode = jwt.verify(
      token,
      process.env.JWT_SECRET || "teste"
    ) as TokenPayload;
    request.id = tokenDecode.id;
    next();
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao verificar o Token",
    });
  }
};
