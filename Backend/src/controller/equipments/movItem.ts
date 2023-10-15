import { Request, Response } from "express";
import { Knex } from "../../database";

const getMovementType = (currentValue: number, newValue: number) => {
  if (!newValue) return "Manutenção";
  if (currentValue < newValue) return "Devolução";
  if (currentValue > newValue) return "Retirada";
  return "Manutenção";
};

const getStatus = (currentValue: number, newValue: number) => {
  if (!newValue) return "em uso";
  if (currentValue < newValue) return "disponivel";
  if (currentValue > newValue) return "em uso";
  return "em manutenção";
};

const movItem = async (request: Request, response: Response) => {
  const { id } = request.params;
  const idUser = request.id;
  const { value, user } = request.body;

  try {
    const [equipment] = await Knex("equipments")
      .select("value")
      .where("id", "=", id);

    const movementType = getMovementType(equipment.value, value);
    const statusW = getStatus(equipment.value, value);
    await Knex("equipment_movements").insert({
      equipment_id: parseInt(id),
      movement_type: movementType,
      user_placed_id: user,
      user_taken_id: idUser,
    });

    await Knex("equipments")
      .update({ value: !value ? equipment.value : value, status: statusW })
      .where("id", "=", id);

    return response.status(200).json({
      message: "Movido com sucesso",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: error,
    });
  }
};

export default movItem;
