import { Router } from "express"

import UserController from "./app/controllers/UserController.js"
import SessionController from "./app/controllers/SessionController.js"
import ProductController from "./app/controllers/ProductController.js"
import CategoryController from "./app/controllers/CategoryController.js"
import OrderController from "./app/controllers/OrderController.js"

import multer from "multer"
import multerConfig from "./config/multer.js"
import authMiddlewares from "./app/middlewares/auth.js"

const upload = multer(multerConfig)
const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionController.store)

routes.use(authMiddlewares) // vai ser chamado nas rotas abaixo

routes.post("/products", upload.single("file"), ProductController.store)
routes.get("/products", ProductController.index)
routes.put("/products/:id", upload.single("file"), ProductController.update)

routes.post("/categories", CategoryController.store)
routes.get("/categories", CategoryController.index)

routes.post("/orders", OrderController.store)
routes.put("/orders/:id", OrderController.update)
routes.get("/orders", OrderController.index)

export default routes
