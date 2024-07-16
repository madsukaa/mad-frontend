import { Grid, ThemeProvider, createTheme } from "@mui/material";
import PageHeader from "./components/PageHeader";
import FormCard from "./components/FormCard";
import TableList from "./components/TableList";

const fontResponsive = createTheme();

fontResponsive.typography.h1 = {
  fontSize: "2.0rem",
  "@media (min-width:600px)": {
    fontSize: "4.0rem",
  },
  [fontResponsive.breakpoints.up("md")]: {
    fontSize: "6.0rem",
  },
  fontFamily: "montserrat",
};

fontResponsive.typography.h6 = {
  fontFamily: "montserrat",
  fontSize: "0.8rem",
  fontWeight: "700",
  "@media (min-width:600px)": {
    fontSize: "1.0rem",
  },
  [fontResponsive.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};

export interface Employee {
  fname: string;
  lname: string;
  position: string;
  seniority: string;
}

export const senioritys = ["Less than a year", "2 - 3 years", "more than 4 years"];
export const pos = ["Junior","Mid", "Senior", "Technical guru"];

function App() {
  return (
    <>
    <ThemeProvider theme={fontResponsive}>
      <Grid
        container
        justifyContent="center"
        direction="row"
        sx={{ width: "100%", minWidth: "320px", p: 3 }}
      >
        <Grid item xs={12}>
          <PageHeader />
        </Grid>
        <Grid item xs sx={{ p: 2 }}>
          <FormCard />
        </Grid>
        <Grid item xs={12} md={8} sx={{ p: 2 }}>
          <TableList />
        </Grid>
      </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
