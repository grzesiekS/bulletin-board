export const currentDateFunc = () => {
  const newDate = new Date();

  return `${newDate.toLocaleDateString('en-GB')}`;
};
