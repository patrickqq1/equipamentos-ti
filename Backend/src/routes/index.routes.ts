import express from "express"
import register from "../controller/users/register"
import login from "../controller/users/login"
import addItem from "../controller/equipments/addItem"
import { jwtVerify } from "../middlewares/jwtVerification"
import getItens from "../controller/equipments/getItens"
import editItem from "../controller/equipments/editItem"
import getUsers from "../controller/users/getItens"
import updateItem from "../controller/users/updateUsers"
import { getMovHistoryByid, getMovItens } from "../controller/equipments/getMovHistory"

const routes = express.Router()

routes.post("/api/register/user", register)
routes.post("/api/login", login)
routes.use(jwtVerify)
routes.post("/api/add/equipament", addItem)
routes.put("/api/edit/equipament/:id", editItem)
routes.get("/api/get/equipament", getItens)
routes.get("/api/get/users", getUsers)
routes.put("/api/update/users", updateItem)
routes.get("/api/get/movhistory", getMovItens)
routes.get("/api/get/movhistorybyid/:id", getMovHistoryByid)

export default routes