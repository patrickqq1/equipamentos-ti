import { Request, Response } from "express";
import { Knex } from "../../database";

const getMovHistory = async (request: Request, response: Response) => {
  try {
    const data = await Knex("equipment_movements as em")
      .select(
        "em.id",
        "em.equipment_id as equipment_name",
        "em.movement_date",
        "em.movement_type",
        "e.name",
        "u_placed.username as placed_by_name",
        "u_taken.username as taken_by_name"
      )
      .join("equipments as e", "e.id", "em.equipment_id")
      .join("users as u_placed", "u_placed.id", "em.user_placed_id")
      .join("users as u_taken", "u_taken.id", "em.user_taken_id");
    const lastMov = await Knex.raw(`SELECT * FROM equipment_movements em where id in (SELECT max(id) FROM equipment_movements em group by equipment_id )`)
    return response.status(200).json({
      data,
      lastMov
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "erro",
    });
  }
};

const getMovHistoryById = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const data = await Knex("equipment_movements as em")
      .select(
        "em.id",
        "em.equipment_id as equipment_name",
        "em.movement_date",
        "em.movement_type",
        "e.name",
        "u_placed.username as placed_by_name",
        "u_taken.username as taken_by_name"
      )
      .join("equipments as e", "e.id", "em.equipment_id")
      .join("users as u_placed", "u_placed.id", "em.user_placed_id")
      .join("users as u_taken", "u_taken.id", "em.user_taken_id")
      .where("e.id", "=", id)

      return response.status(200).json({
        data
      })
  } catch (error) {
    console.error(error);
    return response.status(500).json({
        message:"Erro ao buscar o histórico de movimentações do equipamento."
    })
  }
};

export { getMovHistory, getMovHistoryById };
