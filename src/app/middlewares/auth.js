import jwt from "jsonwebtoken"
import authConfig from "../../config/auth.js"
export default (req, res, next) => {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).json({ error: "Token not provided" })
  }
  const token = authToken.split(" ")[1] //toda vez que encontrar espaço ele cria dois arrays separados

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error() //se tem erro cai no catch
      }
      req.userId = decoded.id

      return next()
    })
  } catch (err) {
    res.status(401).json({ error: "Token is invalid" })
  }
}
