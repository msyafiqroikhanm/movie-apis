const ImportController = require('../controllers/import.controller');
const router = require('express').Router();
const multer = require('multer');
const storage = require('../helpers/multerStorage.helper');
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'application/pdf' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      cb(null, true);
    } else {
      cb({
        code: 400,
        status: 'Bad Request',
        message: 'Format file harus berupa .jpeg atau pdf atau xlsx',
      });
    }
  },
});

router.post('/', upload.single('file'), ImportController.import);

module.exports = router;
