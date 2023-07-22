import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'ivin97',
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {},
  },
});
