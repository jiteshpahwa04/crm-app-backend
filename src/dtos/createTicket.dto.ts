import { TicketStatus } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateTicketDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  status?: TicketStatus;

  @IsNumber()
  ticketPriority: number;

  @IsString()
  @IsNotEmpty()
  assigneeId?: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  reporterId: string;

  constructor(
    title: string,
    ticketPriority: number,
    clientName: string,
    reporterId: string,
    description?: string,
    status?: TicketStatus
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.ticketPriority = ticketPriority;
    this.clientName = clientName;
    this.reporterId = reporterId;
  }
}
