// import { Button } from "react-bootstrap";

const Portfolio = ( {portfolioPicture} ) => {
  return (
    <div style={{ height: "100%" }}>
      {/* <a
        href="https://www.smartmathpro.com/wp-content/uploads/2025/10/Template-Portfolio-Education.webp"
        target="_blank"
      > */}
      {/* <Button variant="primary">Like</Button> */}
      <div className="border border-1 border-secondary">
        <img
          src={portfolioPicture}
          alt="portfolio"
          style={{ width: "780px", height: "auto" }}
        />
      </div>
      {/* </a> */}
    </div>
  );
};

export default Portfolio;
