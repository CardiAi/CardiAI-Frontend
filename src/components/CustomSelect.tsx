import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FormControl } from "./ui/form";
import { Button } from "./ui/button";
interface IValues {
  value: string;
  label: string;
}
interface IProps {
  field: {
    onChange: () => void;
    value: string;
  };
  disabled: boolean;
  className?: string;
  values: IValues[];
  placeholder: string;
}

function CustomSelect({
  disabled,
  field,
  className,
  values,
  placeholder,
}: IProps) {
  return (
    <Select
      disabled={disabled}
      onValueChange={field.onChange}
      defaultValue={field.value}
    >
      <FormControl>
        <SelectTrigger className={className}>
          <SelectValue
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {values.map((value) => (
          <SelectItem key={value.value} value={value.value}>
            {value.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
