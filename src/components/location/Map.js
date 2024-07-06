"use client";

import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useFormik } from "formik";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useUpdateUserMutation } from "@/features/authSlice/auth.slice";

const customIcon = L.icon({
  iconUrl: "https://i.ibb.co/sqQRZ8c/map-Marker.png",
  iconSize: [28, 28], // Set the size of the icon
  iconAnchor: [16, 32], // Set the anchor point of the icon
  popupAnchor: [0, -32], // Set the anchor point for the popup
});

const ACCESS_TOKEN = "pk.4e87f380ffe048e236c30e961fe5e3df";

export default function Map() {
  const { data: session } = useSession();
    const [updateUser, {isLoading, isSuccess}] = useUpdateUserMutation();


  const formik = useFormik({
    initialValues: {
      longitude: null,
      latitude: null,
      address: "",
    },
    //validationSchema,
    onSubmit: async (values) => {
      try {
        if (!values.longitude && !values.latitude && !values.address) {
          toast.error("Please select a location");
          return;
        }
        const dataToSendForUpdate = {
            ...session?.user,
            _id: session?.user?.userId,
            location: values
        }
        const res = await updateUser(dataToSendForUpdate);
        if(res.data.success) {
            toast.success(
              `Location is set to ${values.address.suburb}, ${values.address.city_district}`
            );
        } else {
            toast.error("Failed to update location");
            throw new Error("put method failed");
        }
        console.log('to send ', dataToSendForUpdate)

        return;
      } catch (error) {
        console.error("Something went wrong ", error.message);
      }
    },
  });
  const [mapPosition, setMapPosition] = useState([27.7172, 85.324]);
  return (
    <form onSubmit={formik.handleSubmit} className="py-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium my-5">Location</p>
        <Button type="submit" variant="primary">
          Set Location
        </Button>
      </div>
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={{ width: "100%", height: "500px", zIndex: "1" }}
        className="rounded-xl"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapPosition} icon={customIcon}>
          <Popup>A sample marker with a popup.</Popup>
        </Marker>
        <DetectClick setMapPosition={setMapPosition} formik={formik} />
      </MapContainer>
    </form>
  );
}

function DetectClick({ setMapPosition, formik }) {
  useMapEvents({
    click: async (e) => {
      // console.log('clicked', e);
      setMapPosition([e.latlng.lat, e.latlng.lng]);

      // Update latitude and longitude fields in Formik
      formik.setFieldValue("latitude", e.latlng.lat);
      formik.setFieldValue("longitude", e.latlng.lng);

      // Fetch data based on latitude and longitude
      const apiUrl = `https://us1.locationiq.com/v1/reverse?key=${ACCESS_TOKEN}&lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log("api values ", data)

        // Update nearestLandmark field in Formik with fetched data
        formik.setFieldValue("address", data.address);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  return null;
}
