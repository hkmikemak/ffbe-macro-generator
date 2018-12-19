export const deepFreeze = (o: object) => {
  Object.freeze(o);
  if (o !== undefined) {
    Object.getOwnPropertyNames(o).forEach((propName) => {
      if (
        o[propName] !== null &&
        (typeof o[propName] === "object" || typeof o[propName] === "function") &&
        !Object.isFrozen(o[propName])
      ) {
        deepFreeze(o[propName]);
      }
    });
  }
  return o;
};
