const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));

app.use(express.static('assests'));

//MiddleWare
app.use(express.urlencoded());

// //MiddleWare1
// app.use(function(req,res,next){
//     req.myName = "Shaik";
//     // console.log("MW1 is called");
//     next();
// });

// //MiddleWare2
// app.use(function(req,res,next){
//     console.log("Form MW2:- ", req.myName);
//     // console.log("MW2 is called");
//     next();
// });


var contactList = [
    {
        name: "Shaik",
        phone: "11111"
    },
    {
        name: "Avaies",
        phone: "22222"
    },
    {
        name: "Someone",
        phone: "33333"
    }
];


app.get('/',function(req,res){
    // console.log("Form get:- ", req.myName);
    return res.render('home',{ 
        //this part is called context
        title :"My contact List",
        contact_list: contactList
    });

});


// Contact.find({},function(err,contacts){
    //     if(err){
    //         console.log("Error in fetching contacts");
    //         return ;
    //     }
    //     return res.render('home',{
    //         title :"My contact List",
    //         contact_list: contacts
    //     });
    // });


//string params
app.get('/delete/contact/:phone',function(req,res){
    console.log(req.params);
    // let phone = req.param.phone;
});


//query params
app.get('/delete/contact/',function(req,res){
    //get the id from query in the url
    let id = req.query.id;
    console.log(id);

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting an object from database");
            return  ; 
        }
        return res.redirect('back');
    });

    // console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
});





app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Eroor in creaing a contact");
            return ;
        }
        console.log("*******",newContact);
        return res.redirect('back');
    });

});


app.get('/practice',function(req,res){
    res.render('practice',{
        title:"Palying with EJS"
    });
});

// app.get('/',function(req,res){
//     res.send('<h1> Cool, it is running! or is it? </h1>');
// });

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server ",err);
        return  ;
    }
    console.log("Yup! Express is running at port ",port);
});



