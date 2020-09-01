const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')
const request=require('postman-request')
const app=express()
const port=process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sai Sriram Vemparala'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sai Sriram Vemparala'

    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is some helpful text',
        title:'Help page',
        name:'Sai Sriram Vemparala'

    })

})

app.get('',(req,res)=>{
   res.send('<h1>Weather</h1>')

} )                       //req-shortfrom for request,it is an object 

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    //res.send({
        // location:'India',
        // forecast:'50 degrees',
        // address:req.query.address

        geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
            if (error) {
                return res.send({ error:error })
            }
    
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
        
                 })
            })
       })
   })        
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        
        products:[]
    })
})
//app.com
//app.com/help
//app.com/about                                           //contain the information about incoming request to the server.
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Sriram Vemparala',
        errorMessage:'Help artilce not found.'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Sriram Vemparala',
        errorMessage:'Page not found'
    })

})



app.listen(port,()=>{
    console.log('Server is up on port '+port)
})