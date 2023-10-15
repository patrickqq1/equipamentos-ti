import { Request, Response } from "express";
import { Knex } from "../../database";

const register = async (request: Request, response: Response) => {
  const { username, adUsername, isAdmin } = request.body;
  try {
    await Knex("users").insert({
        is_admin: isAdmin,
        ad_username: adUsername,
        username: username
    });
    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    return response.status(500).json({
      message: "Erro ao cadastrar usuário.",
      error: error,
    });
  }
};

export default register;
