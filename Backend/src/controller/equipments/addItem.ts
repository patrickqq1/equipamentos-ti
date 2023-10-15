import { Request, Response } from "express";
import { Knex } from "../../database";

const addItem = async (request: Request, response: Response) => {
  const idUser = request.id;
  const { name, acquisition_date, description, value, status } = request.body;
  try {
    const verify = await Knex("equipments")
      .select("*")
      .where("name", "=", name)
      .where("acquisition_date", "=", acquisition_date);

    if (verify[0]) {
      return response.status(422).json({ message: "Equipment already exists" });
    }
    await Knex("equipments").insert({
      name,
      acquisition_date,
      description,
      status,
      value,
      added_by: idUser
    });
    return response.status(200).json({
      message: `Equipamento adicionado!`,
    });
  } catch (error) {
    return response.status(500).json({
      message: `Erro ao cadastrar equipamento`,
    });
  }
};

export default addItem;
