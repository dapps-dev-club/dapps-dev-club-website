module.exports = {
  onRouteUpdate: ({ location }) => {
    console.log('onRouteUpdate', location.pathname);
  },
};