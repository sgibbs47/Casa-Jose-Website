import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ReservationInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// ============================================
// MENU HOOKS
// ============================================

export function useMenu() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path);
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// RESERVATION HOOKS
// ============================================

export function useCreateReservation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ReservationInput) => {
      // Validate input before sending using the shared schema
      const validated = api.reservations.create.input.parse(data);
      
      const res = await fetch(api.reservations.create.path, {
        method: api.reservations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.reservations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create reservation");
      }

      return api.reservations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed",
        description: "We look forward to hosting you.",
        className: "bg-primary text-primary-foreground border-none",
      });
      // In a real app, you might invalidate an admin dashboard query here
      // queryClient.invalidateQueries({ queryKey: [api.reservations.list.path] });
    },
    onError: (error) => {
      toast({
        title: "Reservation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
