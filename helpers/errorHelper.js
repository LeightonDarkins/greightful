module.exports = {
  handleError: (err, res) => {
    if (err) {
      res.status(400).send(err)
    }
  }
}
