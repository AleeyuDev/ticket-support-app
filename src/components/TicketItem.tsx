import type { Ticket } from "@prisma/client";
import Link from "next/link";
import { getPriorityClass } from "@/utils/ui";

type TicketItemsProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemsProps) => {
  const isClosed = ticket.status === "Closed";
  return (
    <>
      <div
        key={ticket.id}
        className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6  ${
          isClosed ? "opacity-50" : " "
        }`}>
        <div>
          {/* right  side  */}

          <h2 className=" text-xl font-semibold text-orange-600">
            {ticket.subject}
          </h2>
        </div>
        {/* right side  */}
        <div className=" text-right space-y-4 ">
          <div className=" text-sm text-gray-500">
            Priority:{" "}
            <span className={getPriorityClass(ticket.priority)}>
              {ticket.priority}
            </span>
          </div>
          <Link
            href={` /tickets/${ticket.id} `}
            className={`inline-block mt-2  text-sm px-3 py-1 rounded transition text-center ${
              isClosed
                ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none "
                : " bg-orange-500 hover:bg-orange-700"
            }`}>
            View Tickets
          </Link>
        </div>
      </div>
    </>
  );
};

export default TicketItem;
