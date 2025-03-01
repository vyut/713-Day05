import { organizer } from './../../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";
import type { Event, PageEvent } from "../models/event";

const prisma = new PrismaClient();

export function getEventByCategory(category: string) {
  return prisma.event.findMany({
    where: { category }
  });
}

export function getAllEvents() {
  return prisma.event.findMany();
}

export function getEventById(id: number) {
  return prisma.event.findUnique({
    where: { id },
    omit: {
      organizerId: true
    }
  });
}

export function getAllEventsWithOrganizer() {
  return prisma.event.findMany({
    select: {
      id: true,
      category: true,
      organizerId: false,
      organizer: {
        select: {
          name: true
        }
      },
      participants: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

export function getEventByIdWithOrganizer(id: number) {
  return prisma.event.findUnique({
    where: { id }
  });
}
export function addEvent(newEvent: Event) {
  return prisma.event.create({
    data: {
      category: newEvent.category || "",
      title: newEvent.title || "",
      description: newEvent.description || "",
      location: newEvent.location || "",
      date: newEvent.date || "",
      time: newEvent.time || "",
      petsAllowed: newEvent.petsAllowed || false
    },
    omit: {
      organizerId: true
    }
  });
}

export async function getAllEventsWithOrganizerPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const where = {
    title: { contains: keyword }
  }
  const events = await prisma.event.findMany({
    where,
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      select: {
        id: true,
        title: true,
        category: true,
        organizerId: false,
        organizer: {
          select: {
            name: true
          }
        }
      }    
  });
  const count = await prisma.event.count({ where });
    return { count, events } as PageEvent;
}

export function countEvent() {
  return prisma.event.count();
}