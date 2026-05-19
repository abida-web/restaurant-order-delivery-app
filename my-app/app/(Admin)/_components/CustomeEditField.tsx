import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  hidden?: boolean;
  name: string;
  defaultValue?: string | number | readonly string[];
}
const CustomeEditField = ({ type = "text", hidden = false, ...props }) => {
  return (
    <Field>
      {props.label && <Label htmlFor={props.label}>{props.label}</Label>}
      <Input type={type} hidden={hidden} {...props} />
    </Field>
  );
};

export default CustomeEditField;
