import moment from 'moment';
import { isNotEmpty, isNotExist, isPresent } from './validators';

export const DATE_TIME = 'DATE_TIME';
export const TIME = 'TIME';
export const DATE = 'DATE';
export const CURRENCY = 'CURRENCY';
export const DECIMAL = 'DECIMAL';
export const INTEGER = 'INTEGER';
export const PERCENT = 'PERCENT';
export const TEXT = 'TEXT';

const locales = {
  it: 'it-IT',
  en: 'en-US',
};

const dateFormat = {
  it: 'dd/MM/yyyy',
  en: 'MM/dd/yyyy',
};

const currencies = {
  it: 'EUR',
  en: 'USD',
};

const getLocale = (language) => locales[language] || locales.it;
export const getDateFormat = (language) => dateFormat[language] || dateFormat.it;
const getCurrency = (language) => currencies[language] || currencies.it;

export const convertDateToMoment = (date) => {
  if (isNotEmpty(date)) {
    return moment(date);
  }
  return null;
};

export const convertDate = (date) => {
  if (isNotEmpty(date)) {
    return convertDateToMoment(date).toDate();
  }
  return null;
};

export const formatDateTime = (date, language) => {
  if (isNotExist(date)) return '';
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(convertDate(date));
};

export const formatDateOnly = (date, language) => {
  if (isNotExist(date)) return '';
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(convertDate(date));
};

export const formatYearOnly = (date, language) => {
  if (isNotExist(date)) return '';
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
  }).format(convertDate(date));
};

export const formatTimeOnly = (date, language) => {
  if (isNotExist(date)) return '';
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(convertDate(date));
};

export const formatCurrency = (value, language, currencyCode) => {
  if (isNotExist(value)) return '';
  let currency = currencyCode;
  const locale = getLocale(language);
  if (!isPresent(currencyCode)) {
    currency = getCurrency(language);
  }

  return Number(value).toLocaleString(locale, { style: 'currency', currency });
};

export const formatPercent = (value, language) => {
  if (isNotExist(value)) return '';
  const locale = getLocale(language);
  return Number(value).toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDecimalNumber = (value, digits, language) => {
  if (isNotExist(value)) return '';
  const locale = getLocale(language);
  return Number(value).toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

export const formatDecimal = (value, language) => formatDecimalNumber(value, 2, language);

export const formatInteger = (value, language) => formatDecimalNumber(value, 0, language);

export const formatField = (value, type, language) => {
  if (!isPresent(type)) return value;

  if (type === DATE_TIME) {
    return formatDateTime(value, language);
  }
  if (type === DATE) {
    return formatDateOnly(value, language);
  }
  if (type === TIME) {
    return formatTimeOnly(value, language);
  }
  if (type === CURRENCY) {
    return formatCurrency(value, language);
  }
  if (type === DECIMAL) {
    return formatDecimal(value, language);
  }
  if (type === INTEGER) {
    return formatInteger(value, language);
  }
  if (type === PERCENT) {
    return formatPercent(value, language);
  }

  return value;
};

const formats = {};

export const numericSeparator = (language) => {
  const locale = getLocale(language);
  const format = formats[locale] || {};
  if (format.decimal === undefined) {
    format.thousand = (1111).toLocaleString(locale).replace(/1/g, '');
    format.decimal = (1.1).toLocaleString(locale).replace(/1/g, '');
    formats[locale] = format;
  }
  return format;
};

export const extractDeepLevel = (itemList, field, subField) =>
  // console.log('subField', subField);
  !subField
    ? itemList.map(item => item[field])
    : itemList.map(item => item[field][subField]);
