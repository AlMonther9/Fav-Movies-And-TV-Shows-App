module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'enhancement', 'test', 'chore', 'build', 'perf', 'ci', 'revert', 'prettier', 'lint'],
    ],
    'subject-case': [0, 'never'],
  },
}
