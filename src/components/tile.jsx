function Tile({ img, children, description }) {
  return (
    <div className="flex flex-row gap-4 items-center max-w-[400px]">
      {img ? (
        <img src={img}></img>
      ) : (
        <div className="min-w-26 min-h-26 bg-[var(--secondary)]"></div>
      )}
      <div className="flex flex-col gap-2 items-start">
        <div className="h3">{children}</div>
        <div className="h5">{description}</div>
      </div>
    </div>
  );
}

export default Tile;
