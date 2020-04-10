export const identity = (x) => x;

export const noOp = () => {};

export const getSecondsSinceEpoch = () => {
  const now = new Date();
  const secondsSinceEpoch = Math.round(now.getTime() / 1000);

  return secondsSinceEpoch;
};
