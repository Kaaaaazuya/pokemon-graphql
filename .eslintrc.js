module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'prettier',
    'next',
  ],
  plugins: ['import', 'unused-imports'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // unused-imports/no-unused-imports で代用
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'type', 'index'],
        'newlines-between': 'always', // import groups の間を1行あける
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true }, // 大文字小文字関係なくアルファベット順
        pathGroups: [
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
  },
}
