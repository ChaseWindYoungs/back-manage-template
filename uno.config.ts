// uno.config.ts
/**
 * ? 参考网站： https://unocss.dev/interactive/
 */
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
  ],
})