const ResponseFormatter = require('../helpers/responseFormatter.helper');
const {
  importService,
  randomDateService,
  rollbackDateService,
  randomDateByCustomerService,
} = require('../services/import.service');

class MovieController {
  static async import(req, res, next) {
    try {
      const data = await importService(req.file);
      return ResponseFormatter.success200(res, 'OK', data);
    } catch (error) {
      next(error);
    }
  }

  static async random(req, res, next) {
    try {
      const data = await randomDateByCustomerService();
      return ResponseFormatter.success200(res, 'OK', data);
    } catch (error) {
      next(error);
    }
  }

  static async rollbackDate(req, res, next) {
    try {
      const data = await rollbackDateService();
      return ResponseFormatter.success200(res, 'OK', data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
