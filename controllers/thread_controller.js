const Thread = require('../model/thread');

module.exports = {

    create(req, res, next){
        const threadProps = req.body;

        Thread.create(threadProps)  
        console.log('thread saved');
    },

    edit(req, res, next){
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