import * as React from "react";
import { useGlobalState } from "../../hooks/globalState";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ActivityCard({ id, type, title, description }) {
  const { setOpenDetails, setDetailsId } = useGlobalState();

  function handleClick() {
    setDetailsId(id);
    setOpenDetails(true);
  }

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {description.substring(0, 40) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="tertiary"
            size="small"
            onClick={() => {
              handleClick();
            }}
          >
            Ver Detalhes
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
