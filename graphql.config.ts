import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const codegenConfig: CodegenConfig = {
  // `schema`, `documents` は GraphQL Config 側にあるので不要
};

const config: IGraphQLConfig = {
  schema: "https://beta.pokeapi.co/graphql/v1beta",
  documents: ["src/**/*.tsx"],
  extensions: {
    codegen: codegenConfig,
  },
};

module.exports = config;
