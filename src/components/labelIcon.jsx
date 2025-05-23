function LabelIcon({ img, children }) {
  return (
    <div className="flex items-center gap-2 ">
      <img src={img} alt="typeOfAid"></img>
      <span>{children}</span>
    </div>
  );
}

export default LabelIcon;
