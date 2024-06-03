import multer from "multer";
import cloudinary from "../services/cloudinary/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const filter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return cb(
      new Error("Only images with jpg, jpeg, png, or gif formats are allowed"),
      false
    );
  }
  cb(null, true);
};

const songFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.match(/\/(mp3|wav)$/)) {
    return cb(new Error("Only mp3 or wav files are allowed"), false);
  }
  cb(null, true);
};

export const multerCloudinaryImage = multer({
  storage: storage,
  fileFilter: filter,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

export const multerCloudinarySong = multer({
  storage: storage,
  // fileFilter: songFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // no larger than 20mb
  },
});
