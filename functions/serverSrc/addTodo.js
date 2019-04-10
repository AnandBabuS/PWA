
var { sendNotification } = require("./pushNotify")

const addData = (req, res) => {
    require("./todosData").addData({ assignee: req.body.assignee, todo: req.body.todo });
    res.statusCode = 200;
    res.end()
    sendNotification({ assignee: req.body.assignee, todo: req.body.todo })
}

module.exports = addData