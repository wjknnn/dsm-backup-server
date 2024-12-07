export const getCurrentTime = (local?: boolean) => {
  const timeZone = 'Asia/Seoul';
  const currentTime = local
    ? new Date().toLocaleString('en-US', { timeZone })
    : new Date().toUTCString();

  return currentTime;
};
