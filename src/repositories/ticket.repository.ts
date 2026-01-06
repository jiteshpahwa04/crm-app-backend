import { PrismaClient, Ticket } from '@prisma/client';
import CreateUserDTO from '../dtos/createUser.dto';
import CreateTicketDTO from '../dtos/createTicket.dto';
const prisma = new PrismaClient();

class TicketRepository {
  async create(
    ticketDetails: CreateTicketDTO,
    createdBy: string
  ): Promise<Ticket> {
    const user = await prisma.ticket.create({
      data: {
        title: ticketDetails.title,
        description: ticketDetails.description,
        status: ticketDetails.status,
        ticketPriority: ticketDetails.ticketPriority,
        assigneeId: ticketDetails.assigneeId,
        createdBy: createdBy,
        clientName: ticketDetails.clientName,
        reporterId: ticketDetails.reporterId,
      },
    });
    return user;
  }

  async get(ticketId: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    return ticket;
  }

  async getAll(): Promise<Ticket[]> {
    const users = await prisma.ticket.findMany();
    return users;
  }

  async delete() {}

  async update() {}
}

export default TicketRepository;
