export function isUser(req, res, next) {
  if (req.session?.user.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' });
}

export function isAdminOPremium(req, res, next) {
  if (req.session?.user.isAdmin || req.session?.user?.premium) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
}

export function isAdmin(req, res, next) {
  if (req.session?.user.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
}
