import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { Product } from "~/models/Product";

type ProductProps = {
  product: Product;
  onClick?: () => void;
  index?: number;
};

export default function ProductCard({ product, onClick, index }: ProductProps) {
  return (
      <Grid
        item
        key={product.id}
        xs={12}
        sm={6}
        md={4}
        onClick={onClick}
        sx={{ cursor: onClick ? "pointer" : "default" }}
      >
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            sx={{ pt: "56.25%" }}
            image={`https://source.unsplash.com/random?sig=${index}`}
            title="Image title"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography>{formatAsPrice(product.price)}</Typography>
          </CardContent>
          <CardActions>
            <AddProductToCart product={product} />
          </CardActions>
        </Card>
      </Grid>
  );
}
