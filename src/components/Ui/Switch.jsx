const Switch = ({ id, name, onChange, value, checked, label }) => {
  return (
    <label htmlFor={id} className="checkbox-label">
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <span className="slider round"></span>
      {label}
    </label>
  );
};

export default Switch;
