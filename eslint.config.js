// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    unocss: true,
  },
  // Sort local files
  {
    files: ['locales/**.json'],
    rules: {
      'jsonc/sort-keys': 'error',
    },
  },
)
