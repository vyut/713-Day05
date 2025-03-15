import { organizer } from './../../node_modules/.prisma/client/index.d';
import { event } from './../../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";
import type { Participant, PageParticipant } from "../models/participant";

const prisma = new PrismaClient();

export function getAllParticipants() {
  return prisma.participant.findMany();
}

export function getParticipantById(id: number) {
  return prisma.participant.findUnique({
    where: { id }
  });
}

export function getParticipantByEmail(email: string) {
  return prisma.participant.findFirst({
    where: { email }
  });
}

export function getAllParticipantsWithEvents() {
  return prisma.participant.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      events: {
        select: {
          id: true,
          category: true,
          title: true,
          description: true,
          location: true,
          date: true,
          time: true,
          petsAllowed: true
        }
      }
    }
  });
}

export function getParticipantByIdWithEvents(id: number) {
  return prisma.participant.findUnique({
    where: { id }
  });
}

export function getParticipantByIdWithEventsAndOrganizer(id: number) {
  return prisma.participant.findUnique({
    where: { id },
    include: {
      events: {
        select: {
          id: true,
          category: true,
          title: true,
          description: true,
          location: true,
          date: true,
          time: true,
          petsAllowed: true,
          organizer: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
}

export function addParticipant(newParticipant: Participant) {
  return prisma.participant.create({
    data: {
      name: newParticipant.name,
      email: newParticipant.email
    }
  });
}

export function updateParticipant(id: number, updatedParticipant: Participant) {
  return prisma.participant.update({
    where: { id },
    data: {
      name: updatedParticipant.name,
      email: updatedParticipant.email
    }
  });
}

export function deleteParticipant(id: number) {
  return prisma.participant.delete({
    where: { id }
  });
}

export async function getAllParticipantsPagination(keyword: string, pageSize: number, pageNo: number) {
  const where = {
    OR: [
      { name: { contains: keyword } },
      { email: { contains: keyword } }
    ]
  }
  const participants = await prisma.participant.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,

    select: {
      id: true,
      name: true,
      email: true
    }
  });
  const count = await prisma.participant.count({ where });
  console.log('count', count);
  console.log('participants', participants);
  return { count, participants } as PageParticipant;
}

export function countParticipant() {
  return prisma.participant.count();
}