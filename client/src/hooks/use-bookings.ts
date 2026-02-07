import { useMutation } from "@tanstack/react-query";
import { api, type InsertBooking } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create booking");
      }

      return res.json();
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Booking Request Sent!",
        description: "We have received your booking details.",
        className: "bg-green-500 text-white border-none",
      });

      // Format message for WhatsApp
      const text = `*New Booking Request*%0A%0A*Name:* ${variables.name}%0A*Date:* ${variables.date}%0A*Time:* ${variables.time}%0A*Guests:* ${variables.guests}%0A*Phone:* ${variables.phone}%0A*Email:* ${variables.email}%0A*Message:* ${variables.message || "None"}`;
      
      // Open WhatsApp
      window.open(`https://wa.me/8552997625?text=${text}`, "_blank");
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
