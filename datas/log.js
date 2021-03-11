const fs = require('fs');

var log = {
    info: function (info) { 
        console.log('Info: ' + info);
    },
    warning:function (warning) { 
        console.log('Warning: ' + warning);
    },
    error:function (error) { 
        console.log('Error: ' + error);
    },
    write: (file, data) => {
        fs.appendFile('./logs/' +file+ '.txt', data + '\n', (err) => { 
        if (err)
            console.log(err);
        else
            console.log('Logged.');
        });
    }
};

module.exports = log;