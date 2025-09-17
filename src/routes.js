import { Router } from "express"
import UserController from "./app/controllers/UserController.js"
import SessionController from "./app/controllers/SessionController.js"
import ProductController from "./app/controllers/ProductController.js"
import multer from "multer"
import multerConfig from "./config/multer.js"

const upload = multer(multerConfig)
const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionController.store)

routes.post("/products", upload.single("file"), ProductController.store)

export default routes
