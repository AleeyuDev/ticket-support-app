import { getCurrentUser } from "@/lib/current-user";
import NewTicketForm from "./ticket-form";
import { redirect } from "next/navigation";

const NewTicketPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <NewTicketForm />
    </div>
  );
};

export default NewTicketPage;
