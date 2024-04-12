import './style.css';

interface DropdownProps {
  label: string;
  value: string;
  required: boolean;
  items: string[];
  onChange: (value: string) => void;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className="dropdown">
      <label>{props.label}</label>
      <select 
        value={props.value} 
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      >
        <option value=""></option>
        {
          props.items.map((item) => {
            return <option key={item}>{item}</option>
          })
        }
      </select>
    </div>
  );
}

export default Dropdown;