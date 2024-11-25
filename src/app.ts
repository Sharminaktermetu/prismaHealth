import express, { Application, urlencoded } from 'express'
import cors from 'cors'
import { userRoute } from './app/modules/User/user.routes'
import { adminRoute } from './app/modules/Admin/admin.routes'
const app:Application = express()

app.use(cors())
app.use(express.json())
app.use (express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send({
        message:'Server is running'
    })
})


app.use('/api/v1/user', userRoute)
app.use('/api/v1/user', adminRoute)

export default app