export const inspect =
  (info: string) =>
  <T>(val: T): T => {
    console.log(info, val);
    return val;
  };
