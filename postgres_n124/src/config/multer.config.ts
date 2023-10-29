import path from 'path'
import multer from 'multer'
import { Request } from 'express'
const storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, path.resolve('uploads'))
    },
    filename: function (req: Request, file, cb) {

        cb(
            null,
            `${file.originalname
            }`,
        )
    },
})

const upload = multer({ storage: storage })
export default upload