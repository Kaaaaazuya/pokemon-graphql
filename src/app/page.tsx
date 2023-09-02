'use client'
import { Provider } from 'urql'

import { client } from '@/graphql/graphql'

const App = () => (
  <Provider value={client}>
    <App />
  </Provider>
)

export default App
