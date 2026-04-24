import Grid from "@mui/material/Grid";
import { useAvailableProducts } from "~/queries/products";
import { useNavigate } from "react-router";
import ProductCard from "./ProductCard";
import Spinner from "~/components/Spinner";

export default function Products() {
  const { data = [], isLoading } = useAvailableProducts();
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={4}>
      {data.map(({ count, ...product }, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onClick={() => navigate(`/products/${product.id}`)}
        />
      ))}
    </Grid>
  );
}
