import { getToken } from "../util/security"; 

let BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';
BASE_URL += '/card';

export async function getCardID() {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  if (!response.ok) {
    throw new Error('Failed to get card');
  }
  return await response.json();
}

export async function createCardID(cardData) {
  const response = await fetch(`${BASE_URL}/create-card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to create ard');
  }
  return await response.json();
}

export async function deleteCard(cardId) {
  const response = await fetch(`${BASE_URL}/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`, // Ensure the token is being used
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete card');
  }
}

export async function getCardWithNotes(cardId) {
  const response = await fetch(`${BASE_URL}/${cardId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`, // Use the actual function to get the token
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get card with notes');
  }
  return await response.json();
}

