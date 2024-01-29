// scpService.js

const Client = require('ssh2').Client;
const scp = require('scp2');

function transferFileToRemote(blob:any, fileName:any) {
    const conn = new Client();

    const remoteServer = {
        host: '10.100.116.10',
        port: 22,
        username: 'stg_salane66738',
        password: '****', // Consider using SSH key authentication for better security
    };

    conn.on('ready', function () {
        scp.send(fileName, {
            file: blob,
            user: remoteServer.username,
            host: remoteServer.host,
            port: remoteServer.port,
            password: remoteServer.password,
            path: '/home/stg_salane66738/dfrf', // Update to the remote directory path
        }, function (err:any) {
            if (err) {
                console.error(err);
            } else {
                console.log('File transferred successfully to remote server');
            }

            conn.end();
        });
    }).connect(remoteServer);
}

module.exports = { transferFileToRemote };
