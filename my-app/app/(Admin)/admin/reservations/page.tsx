"use client";

import { useEffect, useMemo, useState } from "react";
import CustomeInput from "../../_components/CustomeInput";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { allTables } from "@/actions/tables";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { assignTable, updateReservationStatuse } from "@/actions/reservations";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomSelect from "../../_components/CustomSelect";
import CustomeRadioGroup from "../../_components/CustomeRadioGroup";

interface ReservationProp {
  id: string;
  name: string;
  phone: string;
  numberOfPeople: string;
  reservationDate: string;
  reservationTime: string;
  status: string;
  tableId: string;
}

interface TableProp {
  id: string;
  tableNumber: string;
  capacity: number;
}

const AdminReservations = () => {
  const [search, setSearch] = useState("");
  const [allReservations, setAllReservations] = useState<ReservationProp[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationProp | null>(null);
  const [tables, setTables] = useState<TableProp[]>([]);
  const [selectStatus, setSelectStatus] = useState("");

  const fetchReservations = async () => {
    const res = await fetch("/api/admin/reservations");
    const data = await res.json();
    setAllReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchTables = async () => {
    const tabless = await allTables();
    setTables(tabless);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleViewDetails = (reservation: ReservationProp) => {
    setSelectedReservation(reservation);
  };

  const handleAssignTable = async (reservationId: string, tableId: string) => {
    const result = await assignTable(reservationId, tableId);
    if (result.success) {
      toast.success("Table assigned successfully");
      fetchReservations();
      if (selectedReservation) {
        setSelectedReservation({ ...selectedReservation, tableId });
      }
    } else {
      toast.error("Failed to assign table");
    }
  };

  const handleUpdateStatus = async (reservationId: string, status: string) => {
    const result = await updateReservationStatuse(reservationId, status);
    if (result.success) {
      toast.success("confirmed successfully");
      fetchReservations();
      if (selectedReservation) {
        setSelectedReservation({ ...selectedReservation, status });
      }
    } else {
      toast.error("Failed to confirm reservation");
    }
  };

  const filtered = useMemo(() => {
    return allReservations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = selectStatus === "" || item.status === selectStatus;
      return matchesSearch && matchesStatus;
    });
  }, [selectStatus, search, allReservations]);
  return (
    <div>
      <div className="flex items-center gap-4">
        <CustomeInput
          type="text"
          placeholder="Search by name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CustomSelect
          data={allReservations}
          value={selectStatus}
          onValueChange={setSelectStatus}
          placeholder="Select a status"
          label="Status"
        />
        {filtered && <Button onClick={() => setSelectStatus("")}>Clear</Button>}
      </div>

      <Table className="mt-5">
        <TableCaption>A list of your reservations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((res) => (
            <TableRow key={res.id}>
              <TableCell>{res.name}</TableCell>
              <TableCell>{res.phone}</TableCell>
              <TableCell>{res.numberOfPeople}</TableCell>
              <TableCell>{res.reservationDate}</TableCell>
              <TableCell>{res.reservationTime}</TableCell>
              <TableCell>{res.status}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewDetails(res)}
                    >
                      Details
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reservation Details</DialogTitle>
                    </DialogHeader>
                    {selectedReservation && (
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Name
                            </p>
                            <p className="text-lg">
                              {selectedReservation.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Phone
                            </p>
                            <p className="text-lg">
                              {selectedReservation.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Number of Guests
                            </p>
                            <p className="text-lg">
                              {selectedReservation.numberOfPeople}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Date
                            </p>
                            <p className="text-lg">
                              {selectedReservation.reservationDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Time
                            </p>
                            <p className="text-lg">
                              {selectedReservation.reservationTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Status
                            </p>
                            <p className="text-lg">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  selectedReservation.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : selectedReservation.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {selectedReservation.status}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-500 mb-2 block">
                            Assign Table
                          </label>
                          <CustomSelect
                            data={tables}
                            value={selectedReservation.tableId}
                            onValueChange={(tableId) =>
                              handleAssignTable(selectedReservation.id, tableId)
                            }
                            placeholder="Select a Table"
                            label="Tables"
                          />

                          <h1 className=" py-5 text-gray-500">Status</h1>
                          <FieldGroup className="gap-3">
                            <Field orientation="horizontal">
                              <RadioGroup
                                value={selectedReservation.status}
                                onValueChange={(status) =>
                                  handleUpdateStatus(
                                    selectedReservation.id,
                                    status,
                                  )
                                }
                              >
                                <CustomeRadioGroup
                                  value="pending"
                                  id="status-pending"
                                  label="Pending"
                                />

                                <CustomeRadioGroup
                                  value="confirmed"
                                  id="status-confirmed"
                                  label="Confirmed"
                                />

                                <CustomeRadioGroup
                                  value="completed"
                                  id="status-completed"
                                  label="Completed"
                                />

                                <CustomeRadioGroup
                                  value="cancelled"
                                  id="status-cancelled"
                                  label="Cancelled"
                                />
                              </RadioGroup>
                            </Field>
                          </FieldGroup>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminReservations;
