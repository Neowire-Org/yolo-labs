import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { bech32 } from 'bech32';
import * as blake from 'blakejs';


const AssetFingerPrint = () => {

    const [policyId, setPolicyId] = useState<string>("")
    const [assetId, setAssetId] = useState<string>("")
    const [assetFingerPrint, setAssetFingerPrint] = useState<string>("")

    useEffect(() => {
        //load from local storage
        const storedPolicyId = localStorage.getItem("policyid")
        if (storedPolicyId) {
            setPolicyId(storedPolicyId)
        }
    }, [])

    const policyIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPolicyId(event.target.value)
        localStorage.setItem("policyid", event.target.value)
    }
    const policyIdBlur = (_: React.FocusEvent<HTMLInputElement>) => {
        if(policyId.length> 0 && assetId.length > 0) {
            setAssetFingerPrint(assetFingerprint(policyId, assetId))
        }
    }

    const assetIdChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssetId(event.target.value)
    }    
    const assetIdBlur = (_: React.FocusEvent<HTMLInputElement>) => {
        if(policyId.length> 0 && assetId.length > 0) {
            setAssetFingerPrint(assetFingerprint(policyId, assetId))
        }
    }    
    
    function hexToUint8Array(hex: string): Uint8Array {
      const length = hex.length;
      const array = new Uint8Array(length / 2);
      for (let i = 0; i < length; i += 2) {
        array[i / 2] = parseInt(hex.substring(i, i + 2), 16);
      }
      return array;
    }
    
    function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
      const result = new Uint8Array(a.length + b.length);
      result.set(a);
      result.set(b, a.length);
      return result;
    }
    
    function assetFingerprint(policyId: string, assetId: string): string {
      // Convert policyId and assetId from hex to Uint8Array
      const policyIdBytes = hexToUint8Array(policyId);
      const assetIdBytes = hexToUint8Array(assetId);
    
      // Concatenate policyId and assetId
      const policyAssetBytes = concatUint8Arrays(policyIdBytes, assetIdBytes);
    
      // Calculate the Blake2b-224 hash
      const hash = blake.blake2b(policyAssetBytes, new Uint8Array(), 28);
    
      // Encode using Bech32 with 'asset' as the human-readable part (hrp)
      const encoded = bech32.encode('asset', bech32.toWords(hash));
    
      return encoded;
    }

    

    return (<>
        <h1>Calculate Asset Fingerprint</h1>
        <TextField
            id="hex-string"
            label="Policy Id"
            variant="outlined"
            value={policyId}
            onChange={policyIdChanged}
            onBlur={policyIdBlur}
            fullWidth
        />
        <TextField
            id="string"
            label="Asset Id"
            variant="outlined"
            margin="normal"
            value={assetId}
            onChange={assetIdChanged}
            onBlur={assetIdBlur}
            fullWidth
        />

    <TextField
            id="string"
            label="Asset Id"
            variant="outlined"
            margin="normal"
            value={assetFingerPrint}
            fullWidth
            InputProps={{
                readOnly: true,
              }}
        />

    </>)
}

export default AssetFingerPrint