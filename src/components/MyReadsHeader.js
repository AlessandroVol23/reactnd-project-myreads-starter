import { Grid } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";


function MyReadsHeader({ search }) {
  return (
    <Grid
      direction="row"
      xs={12}
      item
      container
      style={{
        backgroundColor: "#33b5e5",
        color: "white",
        fontSize: 30,
        textAlign: "center",
        padding: 50,
      }}
    >
      <Grid xs={8} item>
        <Link to="/">
          <Typography variant="h2">MyReads</Typography>
        </Link>
      </Grid>
      {search && (
        <Grid xs={4} alignItems="flex-end" container item justify="flex-end">
          <Link
            to={{
              pathname: "/search",
            }}
          >
            <SearchIcon fontSize={"large"} />
          </Link>
        </Grid>
      )}
    </Grid>
  );
}

MyReadsHeader.propTypes = {
  search: PropTypes.bool
};

export default MyReadsHeader;
