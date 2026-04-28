import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { useNavigate } from "react-router";
import ProductCard from "./ProductCard";

export default function Products() {
  const { data = [], isLoading } = useAvailableProducts();
  const navigate = useNavigate();
  if (isLoading) {
    return <Typography>Loading...</Typography>;
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
