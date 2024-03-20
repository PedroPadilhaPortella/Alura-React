import './style.css'

const TextField = (props) => {

  const placeholderModified = `${props.placeholder}...`

  const onType = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <div className="text-field">
      <label htmlFor="">{props.label}</label>
      <input
        type="text" value={props.value} onChange={onType}
        required={props.required} placeholder={placeholderModified}
      />
    </div>
  );
}

export default TextField;
