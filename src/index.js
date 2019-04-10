import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import LogonPanel from "./LogonPanel"
import workOn from "./assets/workOn.jpg";
import Todos from "./Todos";

import "./styles.css";

var registration = null;
if ("navigator" in window) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js").then(function(registrationObj) {
      console.log("Service Worker Registered");
      registration = registrationObj;
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BJWmtq1ALx9QrWg9F2PQb-iUevNjY1n6XrFnQeVAL4AofLFPIWagKaQUBB3F1nY92Xd_mZZia7pv5_GVLfGjtkA'
        )
      };

      return registration.pushManager.subscribe(subscribeOptions);
    }).then(function(pushSubscriptionObj) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscriptionObj));
      pushSubscription = pushSubscriptionObj;
    });
  }
}

function askPermission(user) {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    } else if(permissionResult === 'granted') {
      console.log(user)
      fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify({ pushSubscription, user }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res) => {

      })
    }

  });
}

var pushSubscription = null;
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      user: ''
    }

    this.selectUser = this.selectUser.bind(this)
  }

  selectUser(data){
    const user = data.value
    this.setState({ user: data.value })
    askPermission(user)
  }

  render(){
    const { user } = this.state
    return (
      <div className="App">
        <button style={{ width: "100%", height: "20px" }} id="headerButton">Add App to desktop</button>
        <Image url={workOn} />
      { !user ? <LogonPanel selectUser={this.selectUser}/> : <Todos /> }
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

let deferredPrompt;
document.getElementById("headerButton").style.display = "none";
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  console.log(e)
  e.preventDefault();
  // Stash the event so it can be triggered later.
  
  deferredPrompt = e;
  document.getElementById("headerButton").style.display = "block";
});

document.getElementById("headerButton").addEventListener("click", (event) => {
  console.log(deferredPrompt)
  deferredPrompt.prompt();
})

const updateOnlineStatus = () => {
  var bgdata = window.localStorage.getItem("offlineData")
  console.log(bgdata)
  window.localStorage.setItem("offlineData", '')
  if(bgdata){
    fetch("/addTodo", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: bgdata
    })
  }
}

window.addEventListener('online',  updateOnlineStatus);



  

