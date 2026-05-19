import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
interface RadioProps {
  value: string;
  id: string;
  label: string;
  htmlFor?: string;
}
const CustomeRadioGroup = ({ value, id, label, htmlFor }: RadioProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={htmlFor}>{label}</Label>
    </div>
  );
};

export default CustomeRadioGroup;
