
class SessionController {
  githubCallback(req, res) {
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.redirect('/');
  }

  show(req, res){
    return res.send(JSON.stringify(req.session));
  }
}

export const sessionController = new SessionController();
