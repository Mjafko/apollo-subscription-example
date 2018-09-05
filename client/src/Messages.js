import React, { Component } from 'react'
import gql from 'graphql-tag'


const NEW_MESSAGE = gql`
	subscription {
		newMessage {
			id,
			message
		}
	}
`

class Messages extends Component {
	componentDidMount = () => {
		this.props.subscribeToMore({
			document: NEW_MESSAGE,
			updateQuery: ( prev, { subscriptionData }) => {
				console.log("HELOOO", prev)
				if(!subscriptionData.data) return prev

				return {
					messages: [
						...prev.messages,
						subscriptionData.data.newMessage
					]
				}
			}
		})
	}

	render() {
		return (
			<ul>
				{
					this.props.messages.map( message => (
						<li key={ message.id }>{ message.message }</li>
					))
				}
			</ul>
		)
	}
}

export default Messages