function CustomCheckbox({ label, state, callback }) {
  return (
    <div className="gap-2 flex items-center">
      <input onChange={callback} checked={state} type="checkbox"></input>
      <label>{label}</label>
    </div>
  );
}

export default CustomCheckbox;
