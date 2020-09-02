exports.notFound = (req, res) => {
  res.status(404).render('404', {path: '', pageTitle: 'App - Error'})
}