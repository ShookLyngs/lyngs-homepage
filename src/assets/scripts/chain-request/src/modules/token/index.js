
// generate random string
export const generate = (length = 32) => {
  const map    = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ-_$%&',
        random = () => map[Math.floor(Math.random() * length)];
  return [ ...(new Array(length).keys()) ].map(() => random()).join('');
};