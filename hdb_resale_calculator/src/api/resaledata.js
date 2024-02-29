import { getToken } from "../util/security";

const BASE_URL = 'http://localhost:3000/resaledata';

export async function getResaleDataForUser() {
  const token = getToken();
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch resale data for user');
  }
}

export async function searchResaleData(queryParams) {
  const token = getToken();

  // Convert array parameters into separate query params
  const searchParams = new URLSearchParams();
  Object.keys(queryParams).forEach(key => {
    if (Array.isArray(queryParams[key])) {
      queryParams[key].forEach(value => searchParams.append(key, value));
    } else {
      searchParams.append(key, queryParams[key]);
    }
  });

  // Replace '+' with '%20' for space encoding consistency
  const queryString = searchParams.toString().replace(/\+/g, '%20');
  const searchURL = `${BASE_URL}/search?${queryString}`;

  const response = await fetch(searchURL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to search resale data');
  }
}


export async function deleteResaleDataEntry(entryId) {
  const token = getToken();
  const deleteURL = `${BASE_URL}/${entryId}`;
  const response = await fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete resale data entry');
  }
}


