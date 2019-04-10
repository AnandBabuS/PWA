
    var webpush = require('web-push')

    var publicVapidKey = 'BJWmtq1ALx9QrWg9F2PQb-iUevNjY1n6XrFnQeVAL4AofLFPIWagKaQUBB3F1nY92Xd_mZZia7pv5_GVLfGjtkA'
    var privateVapidKey = '0QNFsuIOXMNpLLluOlu3p-4YCDhmZEgmhoVppxTpdzw'

    webpush.setVapidDetails('mailto:test@yahoo.com', publicVapidKey, privateVapidKey)

    const subscribers = {}

    const addSubscribers = ( subscription, user ) => {
        console.log(subscription, user)
        subscribers[user] = (subscription)
    }

    const sendNotification = ({ assignee, todo }) => {
        console.log(subscribers)
        for(subscriber in subscribers){
            if(assignee === subscriber){
                const payload = JSON.stringify({ title: "New notification", assignee, todo })
                webpush.sendNotification(subscribers[subscriber], payload);
            }
        }
    }

    module.exports = { addSubscribers, sendNotification}