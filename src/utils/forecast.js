const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6296e87068b6e1d7103491287198a306&query='+latitude+',' +longitude+'&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, response.body.current.weather_descriptions[0]+". Currently it is " + response.body.current.temperature +" "+"degrees out. It feels like "+ response.body.current.feelslike+" "+"degrees out. The humidity is "+response.body.current.humidity+"%.")
        }
    })
}

module.exports = forecast