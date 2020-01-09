import Room from 'ipfs-pubsub-room'
import IPFS from 'ipfs'

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
  return { room }
}

export default main
