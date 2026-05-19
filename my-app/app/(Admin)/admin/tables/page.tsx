"use client";

import { allTables, createTable, editTable } from "@/actions/tables";
import { useEffect, useState } from "react";
import CustomeInput from "../../_components/CustomeInput";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomeEditField from "../../_components/CustomeEditField";
import CustomEditGroupButtons from "../../_components/CustomEditGroupButtons";

// Types
interface TableFormData {
  tableNumber: string;
  capacity: string;
  location: string;
  status: string;
}
interface TableProp {
  id: string;
  tableNumber: string;
  capacity: number;
  location: string;
  status: string;
  reservations: Array<{
    id: string;
    name: string;
    phone: string;
    tableId: string | null;
    userId: string | null;
    numberOfPeople: number;
    reservationDate: string;
    reservationTime: string;
    status: "pending" | "confirmed" | "completed" | "cancelled" | string;
    notes: string | null;
    createdAt: string | Date;
  }>;
}

const Tables = () => {
  const [tableForm, setTableForm] = useState<TableFormData>({
    tableNumber: "",
    capacity: "",
    location: "",
    status: "reserved ",
  });

  const [tables, setTables] = useState<TableProp[]>([]);

  const fetchTables = async (): Promise<void> => {
    const tabless = await allTables();
    setTables(tabless);
  };

  const handleCreate = async (): Promise<void> => {
    const table = await createTable(tableForm);
    if (table.success) {
      toast.success("Table added successfully");
      setTableForm({
        tableNumber: "",
        capacity: "",
        location: "",
        status: " ",
      });
      fetchTables(); // You should also refresh the list after creating
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  async function handleEditTable(formData: FormData): Promise<void> {
    const result = await editTable(formData);
    if (result.success) {
      toast.success("Table updated");
      fetchTables();
    } else {
      toast.error(result.error || "Failed to update Table");
    }
  }

  return (
    <div>
      <Card className="p-5">
        <h1 className="py-5 text-2xl">Create a new Table</h1>
        <div className="grid grid-cols-2 gap-5">
          <CustomeInput
            type="text"
            placeholder="TableNumber"
            value={tableForm.tableNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTableForm({
                ...tableForm,
                tableNumber: e.target.value,
              })
            }
          />
          <CustomeInput
            type="text"
            placeholder="Capacity"
            value={tableForm.capacity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTableForm({
                ...tableForm,
                capacity: e.target.value,
              })
            }
          />
          <CustomeInput
            type="text"
            placeholder="Location"
            value={tableForm.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTableForm({
                ...tableForm,
                location: e.target.value,
              })
            }
          />
          <Button className="bg-amber-500 text-white" onClick={handleCreate}>
            Submit
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {tables.map((table: TableProp) => (
          <Card
            key={table.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Table {table.tableNumber}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{table.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      table.status === "available"
                        ? "bg-green-500 animate-pulse"
                        : table.status === "reserved"
                          ? "bg-yellow-500"
                          : table.status === "occupied"
                            ? "bg-red-500"
                            : "bg-gray-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium capitalize ${
                      table.status === "available"
                        ? "text-green-600"
                        : table.status === "reserved"
                          ? "text-yellow-600"
                          : table.status === "occupied"
                            ? "text-red-600"
                            : "text-gray-600"
                    }`}
                  >
                    {table.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacity</span>
                  </div>
                  <span className="font-semibold">{table.capacity} guests</span>
                </div>
                <Accordion type="single" collapsible className="max-w-lg">
                  <AccordionItem value="details">
                    <AccordionTrigger>Table details</AccordionTrigger>
                    <AccordionContent>
                      {table.reservations.map((res) => (
                        <div
                          key={res.id}
                          className=" flex flex-col gap-1 border p-3 rounded-sm mt-3"
                        >
                          <div>
                            <span className=" text-gray-400">Name : </span>
                            <span>{res.name}</span>
                          </div>
                          <div>
                            <span className=" text-gray-400">Phone : </span>
                            <span>{res.phone}</span>
                          </div>
                          <div>
                            <span className=" text-gray-400">Date : </span>
                            <span>{res.reservationDate}</span>
                          </div>
                          <div>
                            <span className=" text-gray-400">Time : </span>
                            <span>{res.reservationTime}</span>
                          </div>
                          <div>
                            <span className=" text-gray-400">Guests : </span>
                            <span>{res.numberOfPeople}</span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Menu Item</DialogTitle>
                    </DialogHeader>
                    <form action={handleEditTable}>
                      <FieldGroup className="space-y-4">
                        <CustomeEditField
                          hidden={true}
                          id="id"
                          name="id"
                          defaultValue={table.id}
                        />

                        <CustomeEditField
                          id="tableNumber"
                          name="tableNumber"
                          label="Table Num"
                          defaultValue={table.tableNumber}
                          type="text"
                        />

                        <CustomeEditField
                          id="location"
                          name="location"
                          label="Location"
                          defaultValue={table.location}
                          type="text"
                        />

                        <CustomeEditField
                          id="capacity"
                          name="capacity"
                          label="Capacity"
                          defaultValue={table.capacity.toString()}
                          type="number"
                          min="1"
                        />
                        <CustomEditGroupButtons type="submit" />
                      </FieldGroup>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tables;
