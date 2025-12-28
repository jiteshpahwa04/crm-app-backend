import express, { type Request, type Response } from 'express'
import { SERVER_CONFIG } from './config/server.config'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'pong',
  })
})

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`)
})
