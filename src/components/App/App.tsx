import { useEffect, useState } from 'react'
import {
  AppBar,
  createTheme,
  IconButton,
  styled,
  Theme,
  ThemeProvider,
  Toolbar,
} from '@mui/material'


import Home from '../Home/Home'
import { Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import HexToString from '../Tools/HexToString'
import Fernet from '../Tools/Fernet'
import AssetFingerPrint from '../Tools/AssetFingerPrint'


const color_primary = "#333"
const color_secondary = "#d9e7ed"
const color_link = "#005f86"
const color_white = "#fff"
const color_light = "#ddd"
const color_dark = "#333"


function App() {
  const [darkMode, setDarkMode] = useState(false)


  const [theme] = useState<Theme>(createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: color_primary,
      },
      secondary: {
        main: color_secondary,
      },
      background: {
        default: darkMode ? color_dark : color_light,
        paper: darkMode ? color_dark : color_light
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: color_primary,
            color: darkMode ? color_light : color_dark
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small'
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            color: darkMode ? color_secondary : color_primary,
            backgroundColor: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              color: darkMode ? color_primary : color_secondary,
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: color_primary,
            color: color_white
          },
        },
      }
    }
  }))

  const RootContainer = styled('div')({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  })

  const Title = styled('h1')({
    flexGrow: 1,
    fontVariantCaps: 'small-caps',
    color: color_white
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <RootContainer>
          <AppBar position="static" style={{ height: "64px" }}>
            <Toolbar>
            <img src="logo192.png"
                alt="Logo"
                style={{
                  height: "48px", // Adjust the height as needed
                  marginRight: "16px", // Add some spacing between the logo and the title
                }}
              />
              <Title>Yolo Labs</Title>
            </Toolbar>        
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hex-to-string" element={<HexToString />} />
            <Route path="/fernet" element={<Fernet />} />
            <Route path="/asset-fingerprint" element={<AssetFingerPrint />} />
          </Routes>
        </RootContainer>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
