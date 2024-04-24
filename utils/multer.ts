import multer from "multer";

const multerImage = multer({
    storage: multer.diskStorage({}), // store in memory as buffer
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, false);
            return cb(
                new Error("Only images with jpg, jpeg, png or gif format are allowed")
            );
        }
        cb(null, true);
    },
});

export default multerImage;