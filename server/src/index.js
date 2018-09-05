import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'

import { typeDefs } from './schema'
import { resolvers, NEW_MESSAGE } from './resolvers'
import { pubsub } from './pubsub'

const app = express()
const PORT = 4000

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
	console.log(`Apollo Server is running on http://localhost:${ PORT }/graphql`)
})

// PUBLISH new message
let id = 2
setInterval( () => {
	pubsub.publish(NEW_MESSAGE, {
		newMessage: { id, message: new Date().toString() }
	})
	id++;
}, 1000 )