import { type Rates } from '@/types/property';

export const getRateDisplay = (rates: Rates) => {
  if (rates.monthly) {
    return { text: `$${rates.monthly}`, time: '/mo', value: rates.monthly };
  } else if (rates.weekly) {
    return { text: `$${rates.weekly}`, time: '/wk', value: rates.weekly };
  } else {
    return { text: `$${rates.nightly}`, time: '/night', value: rates.nightly };
  }
};
