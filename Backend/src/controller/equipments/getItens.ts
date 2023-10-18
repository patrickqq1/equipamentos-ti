import { Request, Response } from "express";
import { Knex } from "../../database";

const getItens = async (request: Request, response: Response) => {
  try {
    const data = await Knex("equipments").select("*")
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

export default getItens