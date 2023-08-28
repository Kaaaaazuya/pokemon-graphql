import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://beta.pokeapi.co/graphql/v1beta',
  documents: ['src/**/*.tsx'],
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [
        {
          // Custom Scalar の branded type 定義
          add: {
            content: `export type DateString = string & { readonly __brand: unique symbol }`,
          },
        },
      ],
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        scalars: {
          Date: 'DateString',
        },
        enumsAsTypes: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: [''],
  },
}

export default config
