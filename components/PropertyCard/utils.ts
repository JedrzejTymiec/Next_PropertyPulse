import { Rates } from './types';

export const getRateDisplay = (rates: Rates) => {
  if (rates.monthly) {
    return `$${rates.monthly}/mo`;
  } else if (rates.weekly) {
    return `$${rates.weekly}/wk`;
  } else {
    return `$${rates.nightly}/night`;
  }
};
