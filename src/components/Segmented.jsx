// Nhóm nút chọn một (radio) dạng thanh ngang — dùng cho số câu, mức độ…
export default function Segmented({ legend, name, options, value, onChange, disabled }) {
  return (
    <fieldset className="field segmented" disabled={disabled}>
      <legend>{legend}</legend>
      <div className="segmented-track" style={{ '--count': options.length }}>
        {options.map((opt) => (
          <label key={opt.value} className={value === opt.value ? 'is-on' : ''}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
