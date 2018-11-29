const Thread = require('../model/thread');
const User = require('../model/user');

module.exports = {

    create(req, res){    
        User.findOne({ name: req.body.name })
        .then((user) => {
        //console.log(user);
        if (user == undefined){
            res.status(422).send({ Error :'User does not exist.'})
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

    edit(req, res){
            Thread.findOne( { _id: req.body.id } )
            .then(thread =>{
                if(thread === null){
                    res.status(422).send({ Error :'thread does not exist.'})
                } 
                if (thread.content === req.body.content) {
                    res.status(422).send({ Error :'New content is identical to the old content.'})
                }
                else {
                    thread.set('content', req.body.content)
                    thread.save(() => {
                        res.status(200).send({Message :'Thread succesfully edited.'})
                    });
                }
            })
    },
    
    delete(req, res){
            Thread.findById(req.body.id)
            .then(thread =>{
                //console.log(thread);
                if(thread === null){
                    res.status(422).send({ Error :'thread does not exist.'})
                } else {
                    thread.delete()
                    .then(() => res.status(200).send({ Message :'Thread succesfully removed.'}));
                }
            })
    },

    getAllThreadsUnsorted(res){
        Thread.find({}, {comments: 0}, (error, threads) => {
            console.log(threads);
            console.log(error);
            if (threads === null) res.status(422).send({ Error :'No threads exist.'});
            else res.status(200).json({threads}); 
        })
    },

    getThreadById(req, res){
        Thread.findById(req.params.id)
        .populate({
            path: 'comments',
            model: 'comment',
              populate: {
                path: 'user',
                model: 'user'
              },
              populate: {
                path: 'comments',
                model: 'comment'
              }
        })
        .then(thread => {
            if(thread === null){
                res.status(422).send({ Error :'thread does not exist.'})
            } else {
                res.status(422).send({thread});
            }
        });
    }
}