// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.


var ws = new WebSocket("ws://localhost:5000" + "/messages/1");

ws.onopen = function(event) {
    console.log("Successfully connected");
};

ws.onmessage = function(event) {
    console.log(event.data);
    var data = "<div>" + event.data + "</div>"
    $('#chat').append(data);
};

ws.onclose= function() {
    console.log("Successfully closed connection");
    ws.close();
};

// Send text to all users through the server
function sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
        type: "message",
        text: $('#sendText').val(),
        channel: 1,
        date: Date.now()
    };

    try {
        // Send the msg object as a JSON-formatted string.
        ws.send(JSON.stringify(msg));
    } catch (err) {
        console.debug(err);
    }

    $('#sendText').val("");

};
