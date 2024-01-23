const router = require('express').Router();
const multer = require('multer');
const storage = require('../helpers/multerStorage.helper');
const MovieController = require('../controllers/movie.controller');
const ValidateMiddleware = require('../middlewares/validate.middleware');
const { check } = require('express-validator');
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png'
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

router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getDetail);
router.post(
  '/',
  upload.single('image'),
  [
    check('title', 'Title harus diisi').notEmpty(),
    check('rating', 'Rating harus diisi').isFloat(),
    check('description', 'Deskripsi wajib diisi').notEmpty(),
  ],
  ValidateMiddleware.result,
  MovieController.create,
);
router.patch('/:id', upload.single('image'), MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router;
