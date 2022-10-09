const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/ChatApp')
const chatSchema = mongoose.Schema({
    input: String,
});

const Chat = mongoose.model('Chat',chatSchema);

app.get('/',function(req,res){
    Chat.find(function(err,found){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('chat',{foundItems: found});
        }
    });
});

app.post('/',function(req,res){
    const newChat = new Chat({
        input: req.body.input,
    });
    newChat.save(function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect('/'); 
        }
    });
    // console.log(req.body.input);

});




app.listen(PORT,function(){
    console.log('app is listening on http://localhost' + 3000);
});