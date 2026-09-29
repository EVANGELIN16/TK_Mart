import { defineConfig } from '@playwright/experimental-ct-react'

export default defineConfig({
  testDir: './tests/components',
  use: {
    viewport: { width: 1280, height: 720 }
  },
  ctTemplateDir: 'playwright'
})
