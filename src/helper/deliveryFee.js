import { haversineDistance } from "@/lib/haversine";

export const calculateDeliveryFee = async (userId, storeLocation) => {
  try {
    const res = await fetch(`api/users/${userId}`);
    if(!res.ok) {
        console.error("something went wrong");
        return null;
    }
    const data = await res.json();
    const userLocation = {latitude: data?.data?.location?.latitude, longitude: data?.data?.location?.longitude};

    const distance = haversineDistance(userLocation, storeLocation).toFixed(2);
    
    const feeRanges = [
        { min: 0, max: 4, fee: 100 },
        { min: 4, max: 6, fee: 200 },
        { min: 6, max: 10, fee: 300 },
        { min: 10, max: Infinity, fee: 400 },
      ];
    
      for (const range of feeRanges) {
        if (distance > range.min && distance <= range.max) {
          return range.fee;
        }
      }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
