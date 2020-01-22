const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();
const messaging = admin.messaging();
exports.fcmSend = functions.firestore.document('messages/{messageId}').onWrite((change, context) => {

  const message = change.after.data();

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
      icon: "https://placeimg.com/250/250/people"
    }
  };

  messaging.sendToDevice(message.token, payload)
    .then(res => {
      console.log("Sent Successfully", res);
    })
    .catch(err => {
      console.log(err);
    });
});