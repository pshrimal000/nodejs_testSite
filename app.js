const express=require("express");
const bodyParser=require("body-parser");
const request =require("request");
const app=express();

const https=require("https")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const emailId=req.body.emailId;
    console.log(firstName+" "+lastName+" "+emailId);

    const data={
        members:[
            {
                email_address:emailId,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/8099646d34";
    const options={
        method:"POST",
        auth:"Ashutosh:91cf339c0bfb9bca05d221788269368a-us8"
    }
    
    const request= https.request(url, options,function(response){
        response.on("data",function(data){
        //console.log(JSON.parse(data));
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        })
    })

//    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT||3000,function(){
    console.log("server started on 3000!");
});



//API Key
//91cf339c0bfb9bca05d221788269368a-us8

//List ID
//8099646d34 