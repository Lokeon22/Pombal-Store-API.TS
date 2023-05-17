import multer from "multer";
declare const TMP_FOLDER: string;
declare const UPLOADS_FOLDER: string;
declare const MULTER: {
    storage: multer.StorageEngine;
};
export { TMP_FOLDER, UPLOADS_FOLDER, MULTER };
