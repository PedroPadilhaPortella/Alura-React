import './style.css'

const FormField = (props) => {

  const placeholderModified = `${props.placeholder}...`

  const onType = (event) => {
    props.onChange(event.target.value)
  }

  return (
    <div className={`form-field ${props.type}-form-field`}>
      <label htmlFor="">{props.label}</label>
      <input
        type={props.type} value={props.value} onChange={onType}
        required={props.required} placeholder={placeholderModified}
      />
    </div>
  );
}

export default FormField;
