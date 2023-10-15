import jwt from "jsonwebtoken"

const generateToken = (payload: object) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "teste", {
        expiresIn: "2h"
    })
    return token
}

export default generateToken