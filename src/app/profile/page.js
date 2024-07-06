"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { haversineDistance } from "@/lib/haversine";
import Container from "@/components/header/Container";
import Image from "next/image";
import unknownImage from "@/../../public/assets/images/unknownUser.png";
import Map from "@/components/location/Map";

const Profile = () => {
  const { data: session } = useSession();

  // console.log("data in profile page ", session?.user?.name);
  // const foo = haversineDistance(
  //   { lat: 27.734626994572988, lon: 85.29855907015232 },
  //   { lat: 27.72734759207572, lon: 85.3044330602845 }
  // );
  // console.log("the distance is ", foo.toFixed(2), " Km");
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center gap-y-2">
          <Image
            className="rounded-full"
            src={session?.user?.image || unknownImage}
            alt="Profile picture"
            width={100}
            height={100}
          />
          <p className="text-3xl font-medium">{session?.user?.name || "N/A"}</p>
          <p className="text-sm text-slate-500">
            {session?.user?.email || "N/A"}
          </p>
        </div>
        <Map />
      </Container>
    </div>
  );
};

export default Profile;
