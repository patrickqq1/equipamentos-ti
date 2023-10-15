import { Request, Response } from "express";
import { Knex } from "../../database";

const getUsers = async (request: Request, response: Response) => {
    const id = request.id
    const [select] = await Knex("users").select("is_admin").where("id", "=", id)
    if(!select.is_admin){
        return response.status(401).json({message:"User is not adm!"})
    }
  Knex("users")
    .select("*")
    .then((result) =>
      response.status(200).json({
        data: result,
      })
    )
    .catch((err) =>
      response.status(500).json({
        error: err,
      })
    );
};

export default getUsers