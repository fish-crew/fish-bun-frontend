export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return isNaN(d) ? 0 : d;
};

export const calcaulateDistanceWithUnit = (lat1, lng1, lat2, lng2) => {
  const distance = calculateDistance(lat1, lng1, lat2, lng2);
  return distance < 1 ? distanceInM(distance) : distanceInKm(distance);
};

const deg2rad = (deg) => deg * (Math.PI / 180);
const distanceInKm = (distance) => distance.toFixed(1) + "km";
const distanceInM = (distance) => Math.round(distance * 1000) + "m";

export const formatDate = (date) => {
  const formattedDate = new Date(date)
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .split(".");
  return `${formattedDate[0]}년 ${formattedDate[1]}월 ${formattedDate[2]}일`;
};
