import React from "react";
import { useLocation } from "react-router-dom";
import Insidecard from "../productcard/Insidecard";

function ProductPage() {
  const { state } = useLocation();

  const product = state?.product;

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product not found</h2>;
  }

  return <Insidecard product={product} />;
}

export default ProductPage;