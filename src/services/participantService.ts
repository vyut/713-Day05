import type { Participant } from "../models/participant";
import * as repo from "../repository/participantRepositoryPrisma";

export function getAllParticipants() {
  return repo.getAllParticipants();
}

export function getParticipantById(id: number) {
  return repo.getParticipantById(id);
}

export function getParticipantByIdWithEvents(id: number) {
  return repo.getParticipantByIdWithEvents(id);
}

export function getAllParticipantsWithEvents() {
  return repo.getAllParticipantsWithEvents();
}

export function getParticipantByIdWithEventsAndOrganizer(id: number) {
  return repo.getParticipantByIdWithEventsAndOrganizer(id);
}

export async function getAllParticipantsWithPagination(keyword: string, pageSize: number, pageNo: number) {
  const pageParticipants = await repo.getAllParticipantsPagination(keyword, pageSize, pageNo);
  return pageParticipants;
}

export function count() {
  return repo.countParticipant();
}

export function addParticipant(newParticipant: Participant) {
  return repo.addParticipant(newParticipant);
}

export function updateParticipant(id: number, updatedParticipant: Participant) {
  return repo.updateParticipant(id, updatedParticipant);
}

export function deleteParticipant(id: number) {
  return repo.deleteParticipant(id);
}