const Thread = require('../model/thread');
const User = require('../model/user');

module.exports = {

    create(req, res, next){    
        User.findOne({
            name: req.body.name
        })
        .then((user) => {
        console.log(user);
        if (user == undefined){
            res.status(422).send({ Error :'User does not exist.'})
        } if (user.password !== req.body.password){
            res.status(401).send({ Error :'Password is incorrect.'})
        } else {
            Thread.findOne({ title: req.body.title })
            .then((thread) => {
            if (thread == undefined){
                const thread = new Thread({
                    "title": req.body.title,
                    "content": req.body.content,
                    "author": user,
                    "upVotes": 0,
                    "downVotes": 0
                })
                user.threads.push(thread)
                thread.save()
                Promise.all([user.save(), thread.save])
                .then(() => res.status(200).send({Message: "Thread created succesfully"}))
                .catch((error) => res.status(401).json(error));
            } else {
                res.status(422).send({ Error :'Threadtitle already in use.'});
            }
            });
        }
    });
    },

    edit(req, res, next){
        User.findOne({
            name: req.body.name
        })
        .then((user) => {
        console.log(user);
        if (user == undefined){
            res.status(422).send({ Error :'User does not exist.'})
        } if (user.password !== req.body.password){
            res.status(401).send({ Error :'Password is incorrect.'})
        } else { 

        } });

        //add logic below into the else{}
        const title = req.body.title;
        const newContent = req.body.newContent;
        const author = req.body.author;

        Thread.findOne( { title: title } ) //find the thread
        .then(thread =>{
            if(thread === null){
                res.status(422).send({ Error :'thread does not exist.'})
            }
            if(thread.content !== currentContent){
                thread.set('content', newContent)
                thread.save()
            }
        })
        .catch(next);
    },
    
    delete(req, res, next){
        const title = req.body.title;
        const newContent = req.body.newContent;
        const author = req.body.author;

        Thread.findOne({_id:req.params.id}) //find the thread
        .then(thread =>{
            if(thread === null){
                res.status(422).send({ Error :'thread does not exist.'})
            }
            else{
                thread.delete()
                .then(()=> thread.findOne({_id:req.params.id}))
                .then((thread) =>{
                    if(thread === null)
                    {
                        res.status(200).send({ Message :'thread removed.'})
                    }
                })
                .catch(next)
            }
        })
        .catch(next)
    }
}