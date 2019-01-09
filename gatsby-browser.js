module.exports = {
  onRouteUpdate: ({ location }) => {
    console.log('onRouteUpdate', location.pathname);
    if (typeof window.AutopilotAnywhere.visit === 'function') {
      window.AutopilotAnywhere.visit();
    };
  },
};