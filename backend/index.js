const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')

const db = require('./db/databaseConnection')

const app = express()

dotenv.config({path: ".env"})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)

const port = process.env.PORT || 3000
app.listen(port, async () => {
    try {        
        console.log(`Server running at port:${port}`)   
        await db.authenticate();
        console.log('Connection has been established successfully.');     
    } catch (error) {
        console.log("server unable to connect", error)
    }    
})