const readline = require('readline')
const Room = require('ipfs-pubsub-room')
const IPFS = require('ipfs')

const ipfsConfig = {
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
}

async function main() {
  const ipfs = await IPFS.create(ipfsConfig)
  const room = Room(ipfs, 'room-name')

  room.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
  })

  room.on('peer left', (peer) => {
    console.log('Peer left...', peer)
  })

  room.on('subscribed', () => {
    console.log('Now connected!')
  })

  room.on(`message`, (msg) => {
    const formattedMessage = {
      from: msg.from,
      content: msg.data.toString(),
      topicIds: msg.topicIDs
    }
    console.log(formattedMessage)
  })

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (input) => {
    room.broadcast(input)
  })
}

main()
