import * as notesAPI from '../api/notes';
import { getToken } from "../util/security";

export async function createNotesEntry(entryData) {
  // Get the token from local storage
  const token = getToken();
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  // Pass the token to the API call function
  return await notesAPI.createNotesEntry(entryData, token);
}

export async function getNotesEntryById(entryId) {
  // Get the token from local storage
  const token = getToken();
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  // Pass the token to the API call function
  return await notesAPI.getNotesEntryById(entryId, token);
}

// Update by id
export async function updateNotesEntryById(entryId, entryData) {
  // Get the token from local storage
  const token = getToken();
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  // Pass the token to the API call function
  return await notesAPI.updateNotesEntry(entryId, entryData, token);
}

// Delete by id
export async function deleteNotesEntryById(entryId) {
  // Get the token from local storage
  const token = getToken();
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  // Pass the token to the API call function
  return await notesAPI.deleteNotesEntry(entryId, token);
}
