import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
          main: blue[500]
        },
        success: {
          main: '#4caf50'
        }
      },
      typography: {
        fontSize: 14,
        h3: {
          fontWeight: 700,
          fontSize: '2.2rem'
        },
        h4: {
          fontWeight: 700,
          fontSize: '1.75rem'
        },
        h5: {
          fontWeight: 500
        },
        h6: {
          fontWeight: 500
        }
      }
})

export default theme