import { Request, Response } from "express";
import { Knex } from "../../database";

const editItem = async (request: Request, response: Response) => {
    const { id } = request.params
    const { value, description } = request.body
    try {
        await Knex("equipments").where("id", "=", id).update({
            value,
            description
        })
        return response.status(200).json({
            message:"Equipamento atualizado com sucesso"
        })
    } catch (error) {
        return response.status(500).json({
            message:`Falha ao tentar atualizar o equipamento ${value}`
        })
    }
}

export default editItem