import express from "express"
import register from "../controller/users/register"
import login from "../controller/users/login"
import addItem from "../controller/equipments/addItem"
import { jwtVerify } from "../middlewares/jwtVerification"
import getItens from "../controller/equipments/getItens"
import movItem from "../controller/equipments/movItem"
import editItem from "../controller/equipments/editItem"
import { getMovHistory, getMovHistoryById } from "../controller/equipments/getMovHistory"
import getUsers from "../controller/users/getItens"
import updateItem from "../controller/users/updateUsers"

const routes = express.Router()

routes.post("/api/register/user", register)
routes.post("/api/login", login)
routes.use(jwtVerify)
routes.post("/api/add/equipament", addItem)
routes.put("/api/edit/equipament/:id", editItem)
routes.get("/api/get/equipament", getItens)
routes.put("/api/add/equipament_mov/:id", movItem)
routes.get("/api/get/equipament_mov/", getMovHistory)
routes.get("/api/get/equipament_mov/byid/:id", getMovHistoryById)
routes.get("/api/get/users", getUsers)
routes.put("/api/update/users/:id", updateItem)

export default routes