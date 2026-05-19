"use client";
import { driverDetails } from "@/actions/drivers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const DriverModal = ({ driverId }: { driverId: string }) => {
  const [orders, setOrders] = useState<any[]>([]);

  const handleDetails = async () => {
    const details = await driverDetails(driverId);
    setOrders(details);
  };

  useEffect(() => {
    handleDetails();
  }, [driverId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
          View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Driver details</DialogTitle>
          <div>
            <div key={orders.id}>
              <p>
                <span className=" text-gray-400">Driver Name :</span>
                {orders?.name}
              </p>
              <p>
                <span className=" text-gray-400">Role : </span>
                {orders.role}
              </p>
              <p>
                <span className=" text-gray-400">Phone : </span>
                {orders.phone}
              </p>
              <p>
                <span className=" text-gray-400">Orders : </span>
                {orders.driverOrders?.length}
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.driverOrders?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <span>#{item.id.slice(0, 10)}</span>
                      </TableCell>
                      <TableCell>AFG {item.totalAmount}</TableCell>
                      <TableCell className="text-right">
                        {item.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DriverModal;
