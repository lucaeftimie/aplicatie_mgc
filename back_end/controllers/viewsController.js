const pug = require('pug');

const renderHome = (req,res,next) => {

    res.status(200).render('home.pug')

}

module.exports = {renderHome};
