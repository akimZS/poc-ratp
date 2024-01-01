import createError from 'http-errors'
import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

const PORT = process.env.API_PORT || 3000

const app = express()

// view engine setup

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Root page.')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(
  (
    err: { message: any; status: any },
    req: { app: { get: (arg0: string) => string } },
    res: {
      locals: { message: any; error: any }
      status: (arg0: any) => void
      render: (arg0: string) => void
    },
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  }
)


app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
})

module.exports = app
