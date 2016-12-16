module.exports = {
  getDate: () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return `${day}/${month}/${year}`;
  }
}
