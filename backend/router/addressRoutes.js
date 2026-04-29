const express = require("express");
const router = express.Router();

router.post("/detect", async (req, res) => {
  try {
    const { lat, lon } = req.body;

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

    const pincode = address.postcode || "Not available";

    res.json({ city, pincode });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;