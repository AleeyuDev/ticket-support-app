import { getCurrentUser } from "@/lib/current-user";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <nav className="bg-white border-b   py-4 border-gray-200 px-7 flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl font-bold text-orange-500">
          QuickTicket
        </Link>
      </div>
      <div className="flex items-center space-x-4 ">
        {user ? (
          <>
            <Link
              href="/tickets/new"
              className="hover:underline text-gray-700
               transition ">
              New Ticket
            </Link>
            <Link
              href="/tickets"
              className="hover:underline text-gray-700
               transition ">
              My Tickets
            </Link>

            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hover:underline text-gray-700
               transition ">
              Login
            </Link>
            <Link
              href="/register"
              className=" bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 
               transition ">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
