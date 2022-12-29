import { createTheme } from "@mui/material";


export const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        paper: "#fff",
      },  
      primary: {
        main: '#007FFF',
      },                                                                                 
    },
  });
  
export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: "#222",
      },
      primary: {
        main: '#e5e5e5',
      },
    },
});