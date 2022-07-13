export const resetTimeout = (timeoutRef) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
};
