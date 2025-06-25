"use server"
// import  *  as Sentry from "@sentry/nextjs"
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
// import  {logEvent}  from "@/utils/sentry"
import { getCurrentUser } from "@/lib/current-user";
 




// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTicket = async (
    prevState: { success: boolean, message: string },
    formData: FormData,
):
    Promise<{ success: boolean, message: string }> => {
    

    
    try {


        const user = await getCurrentUser();
        console.log(user)


        if (!user) {
            // logEvent( 'UnAuthorization  ticket creation attempt', 'ticket', {}, 'warning');

            return {success: false , message: ' You must be logged in, to create a ticket'}
        }
    
        const subject = formData.get("subject") as string
        const description = formData.get("description") as string
        const priority = formData.get("priority") as string
    
        // console.log(subject, description, priority)
    
        if (!subject || !description || !priority) {
    
            // Sentry.captureMessage("Validation Error: Missing tickets fields", "warning")
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // logEvent("Validation Error:  Missing  ticket data fields" , 'ticket', {subject,description ,priority}, 'warning')
        
            
            return { success: false, message: "All fields are required" }
            
        }


        // create ticket 
        const ticket = await prisma.ticket.create({
            data: {   
                subject, 
                description, 
                priority,
                user: {
                    // Replace 'userId' with the actual user id variable or value
                    connect: { id: user.id } // Example: connect to user with id '1'
                },

                
            }
        });
        // return { success: true, message: "ticket submitted!" }
    

        //    alert sentry
        // Sentry.addBreadcrumb({
        //     category: "ticket",
        //     message: `Ticket created: ${ticket.id}`,
        //     level: 'info'
        // })

        

// logEvent(`Ticket created  successfully : ${  ticket.id}  'ticket',${ticketId: ticket.id}, 'info' `)
        // Sentry.captureMessage(`Ticket was created successfully ${ticket.id}`)
        revalidatePath('/ticket')
        return {success:  true , message: `Ticket created successfully ${ticket.id}`}
    
    
    } catch (error) {

        // logEvent(`an error occurred while creating  the  Ticket` , 'ticket',{formData: Object.fromEntries(formData.entries()),'error',error} )
        console.log( error )
        // Sentry.captureException(error, as Error, {extra:{formData: Object.fromEntries(formData.entries())}}  )

        return { success: false, message: "  an error occurred while creating  the  Ticket " }
}
}




export const getTickets = async () => {
    
    try {
        const user = await getCurrentUser();
        if(!user){
            // logEvent( unAuthorized access to tickets list, 'ticket', {}, 'warning')
    return [];
        }
        
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: user.id // Assuming you have a userId field in the ticket model
            },
            orderBy: {createdAt:  'desc'}
        })
    //   logEvent('Fetched  ticket list  ', {count : tickets.length}, 'info')
          return tickets
    } catch (error) {
        console.log(error)
        // console.log('Error fetching tickets ', 'tickets' ,{} ,'error', error)

        // logEvent('Error fetching tickets ', 'tickets' ,{} ,'error', error )
        return [];
    }
    
}



export const getTicketById = async (id: 'string'| number) => { 


    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) }
            
        });


        if (!ticket) {

            // logEvent("Ticket not found ", "ticket", { ticketId: id })
            console.log("Ticket not found ", "ticket", { ticketId: id} )
            
        }
        return ticket;
        
    } catch (error) {


        // logEvent('Error fetching tickets details ', 'ticket', { ticketId: id }
            
        //   ,"error" , error
        // )
        console.log(error, 'Error fetching tickets details ', 'ticket', { ticketId: id })

        return null;



        
    }



}


// close Ticket



export const closeTicket = async (
    prevState: { success: boolean; message: string },
    formData: FormData):
    Promise<{ success: boolean, message: string }> => {
    const ticketId = Number(formData.get('ticketId'))



    if (!ticketId) {

        return{success: false, message: 'Ticket ID is required'}
    }
    


    const user = await getCurrentUser();
    if (!user) {
        return { success: false, message: "unauthorized" };
    }

    const ticket = await prisma.ticket.findUnique({
        where:{id: ticketId }
    })
    if (!ticket || ticket.userId !== user.id) {
        return  {success: false, message: " you are not authorized to close this ticket"}
    }


    await prisma.ticket.update({
        where: { id: ticketId },
        data: {status: "Closed"}
        
    })
    revalidatePath('/tickets');
    revalidatePath(`/tickets/${ticketId}`);

    return {success: true, message:'Ticket closed successfully'}
}

