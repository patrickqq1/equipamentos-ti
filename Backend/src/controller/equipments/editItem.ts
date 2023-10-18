import { Request, Response } from "express";
import { Knex } from "../../database";

const editItem = async (request: Request, response: Response) => {
    const { id } = request.params
    const userId = request.id
    const { value, movement_date, reason, type } = request.body
    console.log({ value, movement_date, reason, type })
    try {
        const [selectVerify] = await Knex("equipments").select("*").where("id", "=", id)
        if(selectVerify.value < value && type === "Retirada"){
            return response.status(401).json({ message: 'Voce nao tem essa quantia!'})
        }
        await Knex("equipments").where("id", "=", id).update({
            quantity_in_stock: type === "Retirada" ? selectVerify.value - value : value + selectVerify.value,
            value: type === "Retirada" ? selectVerify.value - value : value + selectVerify.value
        })
        await Knex("equipment_movements").insert({
            equipment_id: parseInt(id),
            movement_date,
            movement_type: type,
            quantity_in: selectVerify.value > value ? 0 : value,
            quantity_out: selectVerify.value >= value ? value : 0,
            reason,
            user_id: userId
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