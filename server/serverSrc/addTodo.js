
var { sendNotification } = require("./pushNotify")

const addData = (req, res) => {
    console.log("----------- started to add data")
    require("./todosData").addData({ assignee: req.body.assignee, todo: req.body.todo });
    res.statusCode = 200;
    res.end()
    console.log("----------- started to send notification")
    sendNotification({ assignee: req.body.assignee, todo: req.body.todo })
}

module.exports = addData