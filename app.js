const express=require("express");
const https=require("https");//defaultly come with node module.
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
  // res.send("Server is up and running");// we can't put two res.send in one app.get
})

app.post("/",function(req,res){

  const query=req.body.cityName;
  const apiKey="5fda6e7867ae27948f84e6a2c5535363"
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode)

    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon;
      const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"


      res.write("<p>the weather is currently  "+"<b>"+description+"</b></p>");
      res.write("<h1>The temperature in "+query+" is "+temp+"  degree celsius</h1>");
      res.write("<img src="+imageUrl+">");
      console.log("post request received");
      res.send();
    })
  })
})

//control+c to exit




app.listen(3000,function(){
  console.log("Server is running....");
})
