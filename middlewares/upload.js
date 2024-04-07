import multer from "multer";
import path from "path";

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    createBrotliCompress(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});
