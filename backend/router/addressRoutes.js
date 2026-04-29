const express = require("express");
const router = express.Router();

router.get("/detect", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
    );

    const data = await response.json();
    const address = data.address || {};

    const city =
      address.city ||
      address.state_district ||
      address.state ||
      "Unknown";

    let pincode = address.postcode;

    // 🔥 ye missing part tha
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

    res.json({
      city,
      pincode: pincode || "Not available"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching address" });
  }
});

module.exports = router;