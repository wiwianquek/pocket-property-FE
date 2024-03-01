// Log the BASE_URL to debug
console.log(`Base URL before concatenation: ${BASE_URL}`);

let BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
if (!BASE_URL) {
  console.error('The BASE_URL is not defined. Check your environment variables.');
  // Handle the error appropriately
} else {
  BASE_URL += '/users';
  console.log(`Base URL after concatenation: ${BASE_URL}`);
}

// Now use BASE_URL as before in your API functions


// Add a function to get user details by username or email
export async function getUserByUsername(username) {
  const searchParams = new URLSearchParams({ username });
  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to get user details');
  }
  const users = await response.json();
  return users.length > 0 ? users[0] : null; // Assuming the first user is the one we want
}


//Below are all the ShaoQuan codes for signin/auth and what not, i separated from above for now since i wanted to test for the above to pull data (user_id) into JournalForm.jsx - Vivian 

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const createURL = BASE_URL + '/create-user';
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const searchParams = new URLSearchParams({"email":email});
  const getLoginDetailsURL = BASE_URL + '/login?' + searchParams;
  console.log(getLoginDetailsURL);
  const res = await fetch(getLoginDetailsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid User");
  }
}

export async function storeToken(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const createURL = BASE_URL + '/storeToken';
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Token");
  }
}

export async function loginUser(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const loginURL = BASE_URL + '/login';
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token, userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const logoutURL = BASE_URL + '/logout';
  console.log(logoutURL);
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}


