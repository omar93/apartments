import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // Set the output directories relative to the root folder
      pages: '../public',  // Output HTML files to the root public folder
      assets: '../public', // Output assets (CSS, JS, etc.) to the root public folder
      fallback: 'index.html'  // Fallback file for SPA (Single Page Application)
    })
  }
};