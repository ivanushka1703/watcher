const times = {
  morning: {
    from: 3,
    to: 11,
  },
  day: {
    from: 11,
    to: 18,
  },
  evening: {
    from: 18,
    to: 23,
  },
  night: {
    from: 23,
    to: 3,
  },
};

const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  const time = Object.keys(times).find(t => {
    const interval = times[t as keyof typeof times];

    return currentHour >= interval.from && currentHour < interval.to;
  }, []);

  return time || 'day';
};

export default getTimeOfDay;
