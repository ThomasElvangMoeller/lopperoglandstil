const config = {};

config.mlabMongoDB = 'mongodb://sysadmin:simonlugterafost123@ds113454.mlab.com:13454/lopperoglandstil';
config.localPort = 8080;
config.testMongoDB = 'mongodb://testmaster:tester123@ds115094.mlab.com:15094/lopperoglandstiltests';

config.transporter = { 
    service: 'gmail',
    auth: {
      user: 'noreply.lopperoglandstil@gmail.com',
      pass: 'simonlugterafost123'
    }
};

config.notifyEmail = 'noreply.lopperoglandstil@gmail.com'

module.exports = config;