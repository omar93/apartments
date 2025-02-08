import adapter from '@sveltejs/adapter-static';
import path from 'path';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    prerender: {
      entries: []
    }
  }
};