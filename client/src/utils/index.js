export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const formattedDate = (dateStr) => {
  let dateObj = new Date(dateStr);
  let day = dateObj.getDate().toString().padStart(2, "0");
  let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  let year = dateObj.getFullYear();
  let formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};
