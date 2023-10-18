import { Request, Response, request } from "express";
import { Knex } from "../../database";

const updateItem = async (request: Request, response: Response) => {
    const userId = request.id
  const { username } = request.body;
  try {
    await Knex("users")
      .update({
        username
      })
      .where("id", "=", userId);
    return response.status(200).json({
      message: "Ajustado com sucesso!",
    });
  } catch (error) {
    console.log("Erro ao atualizar", error);
    return response.status(500).json({
      message: "Erro ao atualizar " + error,
    });
  }
};

export default updateItem;
