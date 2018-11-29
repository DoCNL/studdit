const Comment = require('../model/comment');
const User = require('../model/user');
const Thread = require('../model/thread');

module.exports = {

    edit(req, res, next){
        const comment = req.body.title;
        const newContent = req.body.newContent;
        const author = req.body.author;

        Comment.findOne( { id: id } ) //find the comment
        .then(thread =>{
            if(comment === null){
                res.status(422).send({ Error :'comment does not exist.'})
            }
            if(comment.content !== currentContent){
                comment.set('content', newContent)
                comment.save()
            }
        })
        .catch(next);
    },
    remove(req,res,next){
        Comment.findOne({_id:req.params.id})
        .then((comment) => {
            if(comment === null)
            {
                res.status(422).send({Error: "comment does not exist"})
            }
            else{
                comment.delete()
                .then(()=> Comment.findOne({_id:req.params.id}))
                .then((comment) =>{
                    if(comment === null)
                    {
                        res.status(200).send({ Message :'Comment removed.'})
                    }
                })
                .catch(next)
            }
        })
        .catch(next)
    },

    replyToThread(req, res, next){
        //req should have:
        //  name, password  (as author for the comment)
        //  title           (which thread the comment is a reply to)
        //  content         (plaintext of the comment)
        User.findOne({ name: req.body.name })
            .then((user) => {
            if (user == undefined){
                res.status(422).send({ Error :'User does not exist.'})
            } if (user.password !== req.body.password){
                res.status(401).send({ Error :'Password is incorrect.'})
            } else {
                Thread.findOne({ title: req.body.title })
                    .then((thread) => {
                        //console.log(thread);
                        if (thread.title == undefined){
                            res.status(422).send({ Error :'Thread does not exist.'})
                        } else {
                            const comment = new Comment({
                                author: user,
                                content: req.body.content
                            })
                            thread.comments.push(comment);
                            Promise.all([comment.save(), thread.save()])
                            .then(() => res.status(200).send({ Message :'Comment placed.'}));    
                        }
                    });
            }
        });
    }
    
}