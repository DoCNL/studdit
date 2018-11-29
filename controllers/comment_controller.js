const Comment = require('../src/comment');

module.exports = {

    create(req, res, next){
        const commentProps = req.body;

        Comment.create(commentProps)  
        console.log('comment saved');
    },

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
    
}