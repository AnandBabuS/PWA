
const getTodo = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    const data = require('./todosData').data
    res.write(JSON.stringify(data))
    res.end();
}

module.exports = getTodo;