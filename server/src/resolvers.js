import { pubsub } from './pubsub'

const NEW_MESSAGE = 'NEW_MESSAGE'

const resolvers = {
	Query: {
		messages: () => [
			{ id: 0, message: 'Hello world' },
			{ id: 1, message: 'Hello from server' }
		]
	},
	Subscription: {
		newMessage: {
			subscribe: () => pubsub.asyncIterator(NEW_MESSAGE)
		}
	}
}

export { resolvers, NEW_MESSAGE }