
export const haversineDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; // Radius of the Earth in kilometers
    const dLatitude = toRad(coord2.latitude - coord1.latitude);
    const dLongitude = toRad(coord2.longitude - coord1.longitude);
    const latitude1 = toRad(coord1.latitude);
    const latitude2 = toRad(coord2.latitude);
  
    const a =
      Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
      Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2) * Math.cos(latitude1) * Math.cos(latitude2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  