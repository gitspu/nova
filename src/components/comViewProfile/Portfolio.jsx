const Portfolio = ({ portfolioPicture }) => {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="border border-1 border-secondary">
        <img
          src={portfolioPicture}
          alt="portfolio"
          style={{ width: "auto", height: "750px" }}
        />
      </div>
    </div>
  );
};

export default Portfolio;