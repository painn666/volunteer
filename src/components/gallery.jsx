function Gallery({ children, description, images, sizeOfGalery = 4 }) {
  const API_URL = process.env.NEXT_PUBLIC_URL;
  return (
    <div className="flex flex-col gap-6">
      <div className="h1">{children}</div>
      <div className="h2">{description}</div>
      <div className={`grid grid-cols-4 gap-8`}>
        {images.map((image, index) => (
          <img
            className="aspect-square"
            key={index}
            src={API_URL + image.url}
            alt={`Gallery image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
