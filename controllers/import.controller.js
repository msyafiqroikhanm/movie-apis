const ResponseFormatter = require('../helpers/responseFormatter.helper');
const { importService } = require('../services/import.service');

class ImportController {
  static async import(req, res, next) {
    try {
      const data = await importService(req.file);
      return ResponseFormatter.success200(res, 'OK', data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImportController;
