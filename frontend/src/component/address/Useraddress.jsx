import React, { useEffect, useState } from "react";
import styles from "../../styles/address/useraddress.module.css";

function Useraddress() {
  const [location, setLocation] = useState({
    city: "Detecting...",
    pincode: ""
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
          );

          const data = await res.json();
          const address = data.address;

          const city =
            address.city ||
            address.state_district ||
            address.state ||
            "Unknown";

          let pincode = address.postcode;

          if (!pincode) {
            const res2 = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${city}&limit=1`
            );

            const data2 = await res2.json();

            if (data2[0]?.display_name) {
              const match = data2[0].display_name.match(/\b\d{6}\b/);
              if (match) {
                pincode = match[0];
              }
            }
          }

          setLocation({
            city,
            pincode: pincode || "Not available"
          });

        } catch (error) {
          setLocation({
            city: "Error",
            pincode: ""
          });
        }
      },
      () => {
        setLocation({
          city: "Permission denied",
          pincode: ""
        });
      },
      {
        enableHighAccuracy: true
      }
    );
  }, []);

  return (
    <div className={styles.container}>
    🏠 {location.city} - {location.pincode}
    </div>
  );
}

export default Useraddress;