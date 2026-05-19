// components/custom-select.tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface CustomSelectProps<T> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  data: T[];
  className?: string; // Add className prop
  getItemValue?: (item: T) => string;
  getItemLabel?: (item: T) => string;
}

function CustomSelect<T extends Record<string, any>>({
  value,
  onValueChange,
  placeholder = "Select an option",
  label,
  data,
  className, // Accept className
  getItemValue = (item) =>
    item.id?.toString() || item.role || item.value?.toString() || "",
  getItemLabel = (item) =>
    item.name ||
    item.label ||
    item.title ||
    item.role ||
    item.tableNumber ||
    String(item),
}: CustomSelectProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {data.map((item, index) => {
            const itemValue = getItemValue(item);
            const itemLabel = getItemLabel(item);
            return (
              <SelectItem key={itemValue || index} value={itemValue}>
                {itemLabel}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
