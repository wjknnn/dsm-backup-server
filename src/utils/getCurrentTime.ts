export const getCurrentTime = () => {
  const timeZone = 'Asia/Seoul';
  const currentTime = new Date().toLocaleString('en-US', { timeZone });

  return currentTime;
};
