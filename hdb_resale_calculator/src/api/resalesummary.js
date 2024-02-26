import { getToken } from "../util/security";

const BASE_URL = 'http://localhost:3000/resalesummary';

export async function saveSearchSummary(entryData) {
  const token = getToken();
  const createURL = `${BASE_URL}/saveSummary`;
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
    throw new Error('Failed to save entry');
  }
}

export async function getSearchSummaryByUserId(userId) {
    try {
      const token = getToken();
      // Include the user ID in the search parameters
      const searchParams = new URLSearchParams({ user: userId });
      const getURL = `${BASE_URL}/summaries`;
      const response = await fetch(getURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching search summary:', error);
      throw error;
    }
  }
  
  

// Update this function in your api/notes.js file
export async function deleteSearchSummary(entryId) {
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

