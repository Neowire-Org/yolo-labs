import { Button, TextField } from "@mui/material"
import { useState } from "react"
import Fernet from 'fernet-web'


const HexToString = () => {

    const [encryptionKey, setEncryptionKey] = useState<string>("")
    const [string, setString] = useState<string>("")

    const encryptionKeyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEncryptionKey(event.target.value)
    }

    const stringChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setString(event.target.value)
    }

    const encrypt = async () => {
        const fernet = await Fernet.create(encryptionKey)
        const message = await fernet.encrypt(string)
        setString(message)
    }

    const decrypt = async () => {
        const fernet = await Fernet.create(encryptionKey)
        const message = await fernet.decrypt(string)
        setString(message)
    }


    return (<>
        <h1>Fernet Encrypt/Decrypt</h1>
        <p>Encrypts or Decrypts a string using Fernet Encryption</p>
        <TextField
            id="encryption-key"
            label="Encryption Key"
            variant="outlined"
            value={encryptionKey}
            onChange={encryptionKeyChanged}
            multiline
            fullWidth
        />
        <Button variant="contained" onClick={encrypt}>Encrypt</Button>
        <Button variant="contained" onClick={decrypt}>Decrypt</Button>
        <TextField
            id="string"
            label="String"
            variant="outlined"
            margin="normal"
            value={string}
            onChange={stringChanged}
            multiline
            fullWidth
            rows={10}       
        />

    </>)
}

export default HexToString