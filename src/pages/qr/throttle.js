function throttle(targetFn, delay) {
  let timeout;
  let lastRan;

  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      targetFn.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeout);
      const timeSinceLastInvoke = Date.now() - lastRan;
      timeout = setTimeout(function() {
        targetFn.apply(context, args);
        lastRan = Date.now();
      }, delay - timeSinceLastInvoke);
    }
  }
}

export default throttle;
