import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { toast } from "sonner";
import CustomeInput from "@/app/(Admin)/_components/CustomeInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

interface Reservation {
  name: string;
  phone: string;
  numberOfPeople: string;
  table: string;
  status: string;
  reservationDate: Date;
  reservationTime: string;
  notes: string;
}

interface ReservationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reservation: Reservation;
  setReservation: (reservation: Reservation) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ReservationModal = ({
  open,
  setOpen,
  reservation,
  setReservation,
  isLoading,
  setIsLoading,
}: ReservationProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false); // Separate state for date picker

  const handleSubmitReservations = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Format the data correctly for DATE and TIME types
    const formattedReservation = {
      name: reservation.name,
      phone: reservation.phone,
      numberOfPeople: parseInt(reservation.numberOfPeople),
      reservationDate: reservation.reservationDate?.toISOString(),
      reservationTime: reservation.reservationTime || "00:00:00",
      status: reservation.status,
      notes: reservation.notes,
    };

    setIsLoading(true);
    const res = await fetch("/api/admin/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedReservation),
    });

    if (res.ok) {
      toast.success("Reservation is set");
      setReservation({
        name: "",
        phone: "",
        numberOfPeople: "",
        reservationTime: "",
        reservationDate: undefined as unknown as Date,
        status: "",
        table: "",
        notes: "",
      });
      setIsLoading(false);
      setOpen(false); // Close the modal
    } else {
      const error = await res.json();
      toast.error(error.error || "Reservation failed. try again");
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Reservation</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmitReservations} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CustomeInput
            type="text"
            placeholder="Name"
            value={reservation.name}
            onChange={(e) =>
              setReservation({ ...reservation, name: e.target.value })
            }
          />

          <CustomeInput
            type="text"
            placeholder="Phone"
            value={reservation.phone}
            onChange={(e) =>
              setReservation({ ...reservation, phone: e.target.value })
            }
          />

          <CustomeInput
            placeholder="Number of Guests"
            type="text"
            value={reservation.numberOfPeople}
            onChange={(e) =>
              setReservation({
                ...reservation,
                numberOfPeople: e.target.value,
              })
            }
          />
          <CustomeInput
            placeholder="Additional notes"
            type="text"
            value={reservation.notes}
            onChange={(e) =>
              setReservation({
                ...reservation,
                notes: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-full justify-between font-normal mt-2"
                >
                  {reservation.reservationDate
                    ? format(reservation.reservationDate, "PPP")
                    : "Select date"}
                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={reservation.reservationDate}
                  captionLayout="dropdown"
                  defaultMonth={reservation.reservationDate || new Date()}
                  onSelect={(date) => {
                    setReservation({
                      ...reservation,
                      reservationDate: date,
                    });
                    setDatePickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
            <Input
              type="time"
              id="time-picker-optional"
              step="1"
              value={reservation.reservationTime}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  reservationTime: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-amber-400 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Reservation"
          )}
        </Button>
      </form>
    </DialogContent>
  );
};

export default ReservationModal;
