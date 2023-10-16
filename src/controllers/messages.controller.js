
class MessagesController {

    getMessages(req, res){
        return res.render('chat', {});  
    }

}

export const messagesController = new MessagesController();