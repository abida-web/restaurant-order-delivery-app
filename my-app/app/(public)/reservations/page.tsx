"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react"; // ← Add useEffect
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ReservationModal from "@/components/ReservationModal";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { allReservations } from "@/actions/reservations";

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allReservationsList, setAllReservationsList] = useState([]);
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "",
    reservationTime: "",
    reservationDate: undefined as Date | undefined,
    status: "pending",
    table: "",
  });

  const { data: session } = authClient.useSession();

  // Fetch reservations when session is available
  useEffect(() => {
    if (session) {
      fetchReservations();
    }
  }, [session]); // Re-fetch when session changes

  const handleClick = () => {
    if (!session) {
      toast.message("You need to sign in");
      return;
    }
    setModalOpen(true);
  };

  const fetchReservations = async () => {
    try {
      const reservations = await allReservations();
      setAllReservationsList(reservations);
    } catch (error) {
      toast.error("Failed to fetch reservations");
      console.error(error);
    }
  };

  // Call this after successfully creating a reservation
  const handleReservationCreated = () => {
    fetchReservations(); // Refresh the list
    setModalOpen(false);
    // Reset form if needed
    setReservation({
      name: "",
      phone: "",
      numberOfPeople: "",
      reservationTime: "",
      reservationDate: undefined,
      status: "pending",
      table: "",
    });
  };

  // Don't render the full content if no session
  if (!session) {
    return (
      <div className="px-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Reservations</h1>
          <div className="flex items-center gap-3">
            <Button onClick={handleClick}>
              <Plus /> New Reservation
            </Button>
          </div>
        </div>
        <div className="mt-4 text-gray-500">
          Please sign in to view your reservations.
        </div>
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className=" text-xl sm:text-2xl font-semibold text-amber-500">
            Reserve Your Table
          </h1>
          <p className="text-gray-400 sm:text-sm py-2">
            Book a comfortable dining experience in advance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button size={"sm"} className="my-5" onClick={handleClick}>
                <Plus /> New Reservation
              </Button>
            </DialogTrigger>
            <ReservationModal
              open={modalOpen}
              setOpen={setModalOpen}
              reservation={reservation}
              setReservation={setReservation}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onSuccess={handleReservationCreated} // ← Pass this to refresh after creation
            />
          </Dialog>
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2">
        {allReservationsList.length === 0 ? (
          <p className="text-gray-400 mt-4">
            No reservations yet. Create your first one!
          </p>
        ) : (
          allReservationsList.map((reserv) => (
            <div
              key={reserv.id}
              className="bg-black/10 rounded-lg shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow border border-gray-700"
            >
              <div className="border-b border-gray-700 pb-3 mb-3">
                <h1 className="text-xl font-bold text-gray-100">
                  {reserv.name}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Reservation ID: {reserv.id}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-300 w-32">
                    Phone:
                  </span>
                  <span className="text-gray-400">{reserv.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-300 w-32">
                    People:
                  </span>
                  <span className="text-gray-400">{reserv.numberOfPeople}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-300 w-32">
                    Date:
                  </span>
                  <span className="text-gray-400">
                    {new Date(reserv.reservationDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-300 w-32">
                    Time:
                  </span>
                  <span className="text-gray-400">
                    {reserv.reservationTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-300">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reserv.status === "confirmed"
                        ? "bg-green-900 text-green-200"
                        : reserv.status === "pending"
                          ? "bg-yellow-900 text-yellow-200"
                          : reserv.status === "cancelled"
                            ? "bg-red-900 text-red-200"
                            : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {reserv.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(reserv.createdAt).toLocaleString()}
                </div>
              </div>

              {reserv.notes && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <span className="font-semibold text-gray-300 block mb-1">
                    Notes:
                  </span>
                  <p className="text-gray-400 text-sm bg-gray-900 p-2 rounded border border-gray-700">
                    {reserv.notes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservations;
