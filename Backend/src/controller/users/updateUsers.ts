import { Request, Response } from "express";
import { Knex } from "../../database";

const updateItem = async (request: Request, response: Response) => {
    const { id } = request.params
    const idUser = request.id
    const { username, is_admin } = request.body
    const [select] = await Knex("users").select("is_admin").where("id", "=", idUser)
    if(!select.is_admin){
        return response.status(401).json({message:"User is not adm!"})
    }
    try {
        await Knex("users").update({
            username,
            is_admin
        }).where("id", "=", id)
        return response.status(200).json({
            message: "Ajustado com sucesso!"
        })
    } catch (error) {
        console.log('Erro ao atualizar', error);
        return response.status(500).json({
            message: 'Erro ao atualizar ' + error
        });
    }
}

export default updateItem