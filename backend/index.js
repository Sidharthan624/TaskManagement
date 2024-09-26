const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDb = require('./config/db')


const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
dotenv.config()
connectDb()
const app = express()

app.use(express.json())
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*'}})
app.use((req, res, next) => {
    req.io = io
    next()
})
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        
    })
    
})
app.use('/api/auth', userRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 5000

server.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
    
})