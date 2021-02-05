import React from 'react';
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import './App.css';
import Search from './components/search'

// Create Error link for Graphyql error handling
const errorLink = onError(({graphQLErrors})=> {
  if(graphQLErrors){
    graphQLErrors.map(({ message})=> {
      alert(`Graphql Error ${message}`)
      return null
    })
  }
})

// Global Personal Access Token to be added as EVN variable or in the .env file.
const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN

//Github Personal Access Token to be added as EVN variable or 
const link = from([
  errorLink,
  new HttpLink({uri: 'https://api.github.com/graphql',headers: {authorization: `Bearer ${TOKEN}`}}),
])
// Apollo client for graphql queris
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Search></Search>
      </div>
    </ApolloProvider>
  );
}

export default App;
