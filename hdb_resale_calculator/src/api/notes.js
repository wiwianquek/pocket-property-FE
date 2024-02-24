import { getToken } from "../util/security";

const BASE_URL = 'http://localhost:3000/notes';

export async function createNotesEntry(entryData) {
  const token = getToken();
  const createURL = `${BASE_URL}/create-notes`;
  const response = await fetch(createURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(entryData),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to create notes entry');
  }
}
export async function getNotesEntry(queryParams) {
  const token = getToken();
  const searchParams = new URLSearchParams(queryParams);
  const getURL = `${BASE_URL}?${searchParams}`;
  const response = await fetch(getURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
  });

  if (response.ok) {
    return response.json();
  } else {
    // It's good to log the response to understand the error details
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to get notes entry');
  }
}

export async function getNotesEntryById(entryId) {
  const token = getToken();
  const getURL = `${BASE_URL}/${entryId}`; // RESTful convention for fetching a resource by ID
  const response = await fetch(getURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to get journal entry');
  }
}

export async function getNotesEntryByUserId() {
  const token = getToken();
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to get notes entries');
  }
}

export async function updateNotesEntry(entryId, entryData) {
  const token = getToken();
  const updateURL = `${BASE_URL}/${entryId}`;
  const response = await fetch(updateURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Use the token variable, not a function call
    },
    body: JSON.stringify(entryData),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to update notes entry');
  }
}



// Update this function in your api/notes.js file
export async function deleteNotesEntry(entryId) {
  const token = getToken();
  const deleteURL = `${BASE_URL}/${entryId}`;
  const response = await fetch(deleteURL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
  });

  if (response.ok) {
    // Do not attempt to parse JSON for a 204 No Content response
    return;
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to delete notes entry');
  }
}

