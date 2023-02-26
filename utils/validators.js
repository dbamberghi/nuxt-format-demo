export const isPresent = (value) => value !== undefined && value !== null
  && String(value).trim().length > 0;

export const isNotEmpty = (value) => value !== undefined && value !== null;

export const isNotExist = (value) => value === undefined || value === null;

export const isArrayNotEmpty = (value) => {
  if (value === undefined || value === null) return false;

  return value.length > 0;
};
