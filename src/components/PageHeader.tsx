import { ThemeProvider, Typography, createTheme } from "@mui/material";

const PageHeader = () => {
  return (
    <>
        <Typography
          variant="h1"
          sx={{
            pt: 4,
            pb:4,
            textAlign: "center",
            fontWeight:"400",
          }}
        >
          SIMPLE LIST
          <br />
          <Typography sx={{fontWeight:"100"}}>Task requested by Sharof and Kozim. Created by Suhaimi Masri (mad)</Typography>
        </Typography>
    </>
  );
};

export default PageHeader;
