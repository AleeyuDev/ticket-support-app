"use client";
import React from "react";
import { useActionState, useEffect } from "react";
import { createTicket } from "@/actions/ticket.actions";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

const NewTicketForm = () => {
  const [state, formAction] = useActionState(createTicket, {
    success: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Ticket submitted !");
      router.push("/tickets");
    }
  }, [state.success, router]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Submit a support Ticket
      </h1>
      {state.message && !state.success && (
        <p className="text-red-500  mb-4 text-center">{state.message}</p>
      )}
      <form action={formAction} className="space-y-4 text-gray-700">
        <label htmlFor="subject">subject</label>
        <input
          type="text"
          name="subject"
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Subject"
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full border
           border-gray-200 p-3 rounded
           focus:outline-none focus:ring-2
            focus:ring-orange-400"
          name="description"
          placeholder="Description your issue"
          rows={4}
        />
        <select
          className="w-full   border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          name="priority"
          defaultValue="Low">
          <option value="Low">Low Priority </option>
          <option value="Medium">Medium Priority </option>
          <option value="High">High Priority </option>
        </select>
        <button
          className="w-full cursor-pointer   rounded bg-orange-600 text-white p-3 hover:bg-orange-700 transition disabled:opacity-50"
          type="submit">
          Submit
        </button>
      </form>

      {/* server action  run on server you can submit it direct */}
    </div>
  );
};

export default NewTicketForm;
