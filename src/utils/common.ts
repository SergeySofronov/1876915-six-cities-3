export const capitalizeFirstLetter = (line: string) => line?.replace(/^./i, (char) => char.toUpperCase());

export const pluralize = (word: string, count: number) => count > 1 ? `${word}s` : word;

export const testEmailExpr = (email: string) => new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
  .test(email);
export const testPasswordExpr = (password: string) => new RegExp(/[a-zA-Z0-9]+/gi).test(password);

