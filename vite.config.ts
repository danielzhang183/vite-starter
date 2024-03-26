/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import postcssNested from 'postcss-nested'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        './src/composables',
        './src/stores',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: 'src/components.d.ts',
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: 'assets/js/[name]-[hash].js',
    //     chunkFileNames: 'assets/js/[name]-[hash].js',
    //     assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
    //   },
    // },
  },
})
