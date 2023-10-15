import { Request, Response } from "express";
import { Knex } from "../../database";
import { auth } from "../../auth/ad";
import generateToken from "../../auth/token";

const login = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  try {
    const data = await Knex("users")
      .select("*")
      .where("ad_username", "=", username);
    if (!data[0]) {
      return response
        .status(401)
        .json({ message: "SEM PERMISSÃO PARA ENTRAR!" });
    }
    const userData = data[0];
    const payload = {
      id: userData.id,
      name: userData.username,
      isAdmin: userData.is_admin,
    };
    const authenticate = await auth(username, password);
    if (!authenticate) {
      return response.status(401).json({
        message: "Falha na autenticação!",
      });
    }
    return response.status(200).json({
      message: "Usuario autenticado!",
      token: generateToken(payload),
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export default login;
