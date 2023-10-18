import { Request, Response } from "express";
import { Knex } from "../../database";

const getMovItens = async (request: Request, response: Response) => {
  try {
    const data = await Knex("equipment_movements").select("*");
    return response.status(200).json({
      message: "Itens obtidos com sucesso!",
      data,
    });
  } catch (error) {
    return response.json(500).json({
      message: "Erro ao obter itens!",
    });
  }
};
const getMovHistoryByid = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const data = await Knex("equipment_movements")
      .select("equipment_movements.*", "users.username")
      .join("users", "equipment_movements.user_id", "users.id")
      .where("equipment_id", "=", id);
    return response.status(200).json({
      message: "Itens obtidos com sucesso!",
      data,
    });
  } catch (error) {
    return response.json(500).json({
      message: "Erro ao obter itens!",
    });
  }
};

export { getMovItens, getMovHistoryByid };
