import { Request, Response, Router } from 'express';
import createError from 'http-errors';
import "../__globals"

const router = Router();

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(
  (
    err: Error,
    req: Request,
    res: Response
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
);

export default router;
