import { Container } from "@mui/material";
import { Link } from "react-router-dom";



export type HomeProps = {

}

function Home(props: HomeProps) {


  return (
    <>
      <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "calc(100vh-64px)",
      }} >
        <Link to="/hex-to-string"><h2>Hex to String</h2></Link>
        <Link to="/fernet"><h2>Fernet</h2></Link>
        <Link to="/asset-fingerprint"><h2>Asset Fingerprint</h2></Link>
      </Container>
    </>
  );
}

export default Home