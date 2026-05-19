import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface CustomEditGroupButtonsProps {
  type?: "submit" | "button";
  onClick?: () => void;
}

const CustomEditGroupButtons: React.FC<CustomEditGroupButtonsProps> = ({
  type = "submit",
  onClick,
}) => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline" type="button">
          Cancel
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button type={type} onClick={onClick}>
          Save
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};

export default CustomEditGroupButtons;
