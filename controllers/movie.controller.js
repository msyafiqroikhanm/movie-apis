const ResponseFormatter = require('../helpers/responseFormatter.helper');

class MovieController {
  static async getAll(req, res, next) {
    try {
      res.url = `${req.method} ${req.originalUrl}`;
      res.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      const data = { content: [{ ad: 'ad' }] };

      return ResponseFormatter.success200(res, data.message, data.content);
    } catch (error) {
      next(error);
    }
  }

  // static async getDetail(req, res, next) {
  //   try {
  //     res.url = `${req.method} ${req.originalUrl}`;
  //     res.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  //     const data = await locationType.selectLocationType(req.params.id);
  //     if (!data.success) {
  //       return ResponseFormatter.error404(res, 'Data Not Found', data.message);
  //     }

  //     return ResponseFormatter.success200(res, data.message, data.content);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async create(req, res, next) {
    try {
      res.url = `${req.method} ${req.originalUrl}`;
      res.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      const data = {};

      return ResponseFormatter.success201(res, data.message, data.content);
    } catch (error) {
      next(error);
    }
  }

  // static async update(req, res, next) {
  //   try {
  //     res.url = `${req.method} ${req.originalUrl}`;
  //     res.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  //     const data = await locationType.updateLocationType(req.params.id, req.body);
  //     if (!data.success) {
  //       return ResponseFormatter.error404(res, 'Data Not Found', data.message);
  //     }

  //     return ResponseFormatter.success200(res, data.message, data.content);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async delete(req, res, next) {
  //   try {
  //     res.url = `${req.method} ${req.originalUrl}`;
  //     res.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  //     const data = await locationType.deleteLocationType(req.params.id);
  //     if (!data.success) {
  //       return ResponseFormatter.error404(res, 'Data Not Found', data.message);
  //     }

  //     return ResponseFormatter.success200(res, data.message, data.content);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = MovieController;
