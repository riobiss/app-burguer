import { fileURLToPath } from "url"
import { dirname, extname, resolve } from "path"
import multer from "multer"
import { v4 } from "uuid"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"), // pasta onde os arquivos serão salvos
    filename: (req, file, callback) => {
      callback(null, v4() + extname(file.originalname)) // nome do arquivo será um id único + extensão do arquivo original
    },
  }),
}
