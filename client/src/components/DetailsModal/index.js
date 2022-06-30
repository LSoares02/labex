import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Backdrop, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";

import { defaultImages } from "../../helpers/defaultImages";
import { randomNumber } from "../../helpers/helpers";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DetailsModal() {
  const { detailsId, extensionPosts, openDetails, setOpenDetails } =
    useGlobalState();

  const [expanded, setExpanded] = React.useState(false);
  const [defaultImageNumber, setDefaultImageNumber] = React.useState(0);
  const [cardDetails, setCardDetails] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (detailsId)
      setCardDetails(
        extensionPosts.values.filter((post) => post.id === detailsId)[0]
      );
    const index = randomNumber(defaultImages.length);
    setDefaultImageNumber(index);
  }, [detailsId]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openDetails}
    >
      <Card sx={{ width: 600, maxHeight: 700 }}>
        <CardHeader
          action={
            <IconButton
              aria-label="close-details"
              onClick={() => {
                setOpenDetails(false);
                setExpanded(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
          title={cardDetails?.title}
          subheader={cardDetails?.type}
        />
        <CardMedia
          component="img"
          height="194"
          image={
            cardDetails?.image
              ? cardDetails?.image
              : defaultImages[defaultImageNumber]
          }
          alt="Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {cardDetails?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <b>Autores: </b>
              {cardDetails?.authors
                .map((author) => {
                  return author.name;
                })
                .join(", ")}
            </Typography>
            <Typography paragraph>
              <b>Links: </b>
              {cardDetails?.links.map((link) => {
                return (
                  <div key={link}>
                    <a href={link}>{link}</a>
                    <div> </div>
                  </div>
                );
              })}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Backdrop>
  );
}
