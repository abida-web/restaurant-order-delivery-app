"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { updateDriverStatus } from "@/actions/drivers";
import DriverModal from "../../_components/DriverModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import CustomEditGroupButtons from "../../_components/CustomEditGroupButtons";
import CustomeEditField from "../../_components/CustomeEditField";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/admin/drivers");
      const data = await res.json();
      setDrivers(data.data || data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const filtered = drivers.filter(
    (driver: any) =>
      driver.name?.toLowerCase().includes(search.toLowerCase()) ||
      driver.phone?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRemoveDriver = async (driverId: string) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;

    try {
      const result = await authClient.admin.removeUser({
        userId: driverId,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to delete driver");
      } else {
        toast.success("Driver deleted successfully");
        fetchDrivers();
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete driver");
    }
  };

  return (
    <div className="h-full flex flex-col px-2 pt-20 sm:pt-10 sm:px-4 md:px-6">
      {/* Header Section - No overflow */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Link href="/add" className="w-full sm:w-auto">
          <Button className="flex text-white gap-2 items-center font-bold bg-amber-400 w-full sm:w-fit px-3 py-1 rounded-lg">
            <Plus size={20} />
            Add Driver
          </Button>
        </Link>
        <Input
          value={search}
          className="w-full sm:w-auto sm:min-w-[300px] px-5 py-5"
          placeholder="Search name or phone"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Section - Only this overflows */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableCaption>A list of your drivers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Total Orders
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Active Orders
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Joined Date
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((driver: any) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {driver.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {driver.phone}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <select
                      className={`px-2 py-1 rounded-full text-xs border ${
                        driver.status === "active"
                          ? "bg-green-500/20 text-green-500 border-green-500/50"
                          : driver.status === "inactive"
                            ? "bg-gray-500/20 text-gray-500 border-gray-500/50"
                            : "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                      }`}
                      onChange={async (e) => {
                        await updateDriverStatus(driver.id, e.target.value);
                        await fetchDrivers();
                      }}
                      defaultValue={driver.status || "active"}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="busy">Busy</option>
                    </select>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {driver.driverOrders?.length || 0}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {driver.driverOrders?.filter(
                      (order: any) =>
                        order.status === "out_for_delivery" ||
                        order.status === "ready",
                    ).length || 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell whitespace-nowrap">
                    {new Date(driver.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                          type="button"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-50">
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Dialog>
                            <form className="w-full">
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start px-2"
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-sm">
                                <DialogHeader>
                                  <DialogTitle>Edit profile</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your driver here. Click save
                                    when you&apos;re done.
                                  </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                  <CustomeEditField
                                    hidden
                                    name="id"
                                    defaultValue={driver.id}
                                  />
                                  <CustomeEditField
                                    label="Name"
                                    name="name"
                                    defaultValue={driver.name}
                                  />

                                  <CustomeEditField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    defaultValue={driver.email}
                                  />

                                  <CustomeEditField
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    defaultValue={driver.phone}
                                  />
                                </FieldGroup>
                                <CustomEditGroupButtons type="submit" />
                              </DialogContent>
                            </form>
                          </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <DriverModal driverId={driver.id} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleRemoveDriver(driver.id)}
                        >
                          Delete Driver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
