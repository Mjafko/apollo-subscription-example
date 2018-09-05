import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Messages from './Messages'

const GET_MESSAGES = gql`
	query {
		messages {
			id,
			message
		}
	}
`



const App = () => (
	<Query query={ GET_MESSAGES }>
		{
			({ data, loading, subscribeToMore }) => {
				if(!data) {
					return null
				}
				if(loading) {
					return <p>Loading...</p>
				}
				return(
					<Messages
						messages={ data.messages }
						subscribeToMore={ subscribeToMore }
					/>
				)
			}
		}
	</Query>
)

export default App
