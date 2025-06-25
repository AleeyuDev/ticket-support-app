
import Link from "next/link"


import {FaTicketAlt} from"react-icons/fa"


const HomePage = () => {
  return (
    <main className="flex flex-col md:p-16 text-center justify-center items-center min-h-screen px-4">
      <FaTicketAlt
        className="mx-auto md:  text-shadow-orange-600 animate-pulse "
        size={60}
      />

      <h1 className=" md:text-5xl font-bold mb-4 text-orange-500 text-4xl">
        Welcome to Quick Ticket
      </h1>

      <p className="text-lg text-gray-590 mb-8">
        Fast and simple support ticket management system.
      </p>

      <div className=" flex flex-col md:flex-grow gap-4 justify-center  animate-slide opacity-0">
        <Link
          href="/tickets/new"
          className="bg-orange-600   text-white px-6 py-3 rounded shadow hover:bg-orange-700 transition">
          Submit a Ticket
        </Link>
        <Link
          href="/tickets/view/1"
          className="bg-orange-100   text-gray-700 px-6 py-3 rounded shadow hover:bg-orange-200 transition">
          View Tickets
        </Link>
      </div>
    </main>
  );
}

export default HomePage