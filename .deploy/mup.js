module.exports = {
  servers: {
    one: {
      host: '194.135.93.30',
      username: 'root',
      pem: '~/.ssh/galago',
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'pelorus',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'pelorus.ws',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
