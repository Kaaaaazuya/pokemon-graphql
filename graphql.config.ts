import type { IGraphQLConfig } from 'graphql-config'

const config: IGraphQLConfig = {
  schema: 'https://beta.pokeapi.co/graphql/v1beta',
  documents: ['src/**/*.tsx'],
}

module.exports = config
