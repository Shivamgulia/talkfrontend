export const Delay = async (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, seconds * 1000);
  });
};
