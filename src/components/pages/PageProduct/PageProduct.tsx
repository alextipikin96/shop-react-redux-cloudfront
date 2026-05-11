import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAvailableProduct } from "~/queries/products";
import { useParams } from "react-router";
import ProductCard from "../PageProducts/components/ProductCard";
import Spinner from "~/components/Spinner";

export default function PageProduct() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useAvailableProduct(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Grid py={3} justifyContent="center" container spacing={4}>
      <ProductCard product={product} />
    </Grid>
  );
}
