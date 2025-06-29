"use client";

import { closeTicket } from "@/actions/ticket.actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
export const dynamic = "force-dynamic";

// ...existing code...


const CloseTicketButton = ({
  ticketId,
  isClosed,
}: {
  ticketId: number;
  isClosed: boolean;
}) => {
  const intialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(closeTicket, intialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  if (isClosed) return null;

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="ticketId" value={ticketId} />
        <button
          type="submit"
          className="bg-red-500 text-white px-3 py-3 w-full rounded  hover:bg-red-700 transition cursor-pointer ">
          Close Ticket
        </button>
      </form>
    </>
  );
};

export default CloseTicketButton;
