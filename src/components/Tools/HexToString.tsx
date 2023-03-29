import { TextField } from "@mui/material"
import { useState } from "react"


const HexToString = () => {

    const [hexString, setHexString] = useState<string>("")
    const [string, setString] = useState<string>("")

    const hexStringChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHexString(event.target.value)
    }
    const hexStringBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setString(convertHexUtf8ToString(hexString))
    }
    const convertHexUtf8ToString = (hex: string) => {
        return decodeURIComponent(
            hex.replace(/(..)/g, '%$1')
        );
    }

    const convertStringToHexUtf8 = (str: string) => {
        return str.split('').map(function (v) {
            return v.charCodeAt(0).toString(16)
        }).join('')
    }

    return (<>
        <h1>Hex to String</h1>
        <p>Converts a hex string to a string.</p>
        <p>Example: 48656c6c6f20576f726c64</p>
        <p>Result: Hello World</p>
        <TextField
            id="hex-string"
            label="Hex String"
            variant="outlined"
            value={hexString}
            onChange={hexStringChanged}
            onBlur={hexStringBlur}
            multiline
            fullWidth
        />
        <TextField
            id="string"
            label="String"
            variant="outlined"
            margin="normal"
            value={string}
            multiline
            fullWidth
        />

    </>)
}

export default HexToString