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
    }
}