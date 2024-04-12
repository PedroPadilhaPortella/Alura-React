import './style.css';

interface FormFieldProps {
  label: string;
  type: 'text' | 'number' | 'date' | 'password' | 'email' | 'color';
  value: string;
  placeholder: string;
  required: boolean;
  onChange: (value: string) => void;
}

const FormField = (props: FormFieldProps) => {

  const placeholderModified = `${props.placeholder}...`

  const onType = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
  }

  return (
    <div className={`form-field ${props.type}-form-field`}>
      <label htmlFor="">{props.label}</label>
      <input
        type={props.type} 
        value={props.value} 
        placeholder={placeholderModified}
        required={props.required} 
        onChange={onType}
      />
    </div>
  );
}

export default FormField;
