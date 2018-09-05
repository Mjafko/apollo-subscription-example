import { gql } from 'apollo-server-express'

const typeDefs = gql`
	type Query {
		messages: [ Message ]
	}
	
	type Subscription {
		newMessage: Message
	}
	
	type Message {
		id: Int
		message: String
	}
`

export { typeDefs }