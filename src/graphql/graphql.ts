'use client'
import { Client, cacheExchange, fetchExchange } from '@urql/core'

export const client = new Client({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  suspense: true,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: 'cache-and-network',
})
