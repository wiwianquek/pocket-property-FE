# Pocket Property 2.0

Pocket Property 2.0 is designed to simplify the process of finding and calculating property-related metrics for HDB (Housing & Development Board) properties. Whether you're in the market to buy HDB or just looking to get average pricing metrics without going through the hassle of complex calculations, Pocket Property 2.0 has you covered! 

Demo: https://pocket-property.onrender.com/

## Screenshot(s)
 ### Login Page
 User can now create their own personal accounts, where all data will be stored at a user-level. To better protect user data and the data APIs:
 - JWT token session is created when users logs in to protect data APIs.
 - Encryption logic is in place to protect user data. 
 
![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/ae5a5f8d-0985-4077-8a01-0bde5bb78f43)


### Sign Up Page
All accounts created includes security features to protect user data through:
- Hashing of passwords through PBKDF2.
- Base64 encoding. 
  
![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/feb0a8d0-25c0-468f-8a66-6acd228f8596)


### Dashboard

This provides a quick overview for users to see all the notes and saved searches respectively. 

![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/e35d060f-5c34-4721-9fdf-2dc1900110d9)

### Notes

Now there's a notes feature where user is able to create a handy post-it note. This feature allows users to: 
- Add a note. 
- Edit notes.
- Delete a note.
  
![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/1e5e5fff-d72b-4e0f-81cb-085d99771f81)

### Saved Searches
This table provides a quick overview of the searches made in "Search Resale HDB Data", where it helps users to:
- Make useful and quick comparisons.
- Buttons to redirect users to search for current similiar listings based on the "Search Terms" and "Flat Type".

![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/638dea58-e2b3-4df2-98a4-647ce03a8ba1)

![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/e739ce95-a0e9-402b-9689-50dbd73e6e3a)


 ### Search Resale HDB Data
 This feature allows users to be able to search and aggregate the average HDB resale data extracted from data.gov.sg.
 
 > Note: Currently the resale data only includes resale properties sold from Jan 2017 to Sep 2023.

 User is able to:
 - Search for properties by town or street name e.g. Tampines or Tampines Street 11, including filters like Flat Type, Flat Model and Storey Range.
 - Quickly generate average resale prices and average remaining lease term.
 
![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/c39eaea6-cf66-4383-bc9f-367b82a004ce)


![image](https://github.com/wiwianquek/pocket-property-FE/assets/136752154/94348b23-d261-49b2-831c-d09421a9465f)

## Key Challenges/Takeaways
- Formulating aggregation since there are multiple filters involved. Before mapping, I had to understand the type of data I have stored first before I could try to understand. But even after, there were a lot of debugging required, and finding out whether if my aggregation makes sense.
- What I learnt to do is to slowly breakdown one big problem into smaller problems, solving piece by piece, which helps to speed up the debugging and allowing me to be more efficient as well. 

## Technologies Used

- **React.js**: For building the user interface.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Chakra UI**: A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
- **React Router**: For navigation between different components within the app.
- **Express.js**: Backend framework for creating API endpoints.
- **Mongoose**: MongoDB object modeling for Node.js.
- **CORS**: Package for providing a Connect/Express middleware that can be used to enable CORS.
- **Trello** for project management.

## Data Used
- HDB Resale Data from Jan 2017 to Sep 2023*: Extracted from data.gov.sg.

## Getting Started

To get started with Pocket Property:

1. Clone both the repository to your local machine.
2. Install the dependencies:
```bash
    npm install react-icons react-router-dom
    npm install express
    npm install mongoose 
    npm install cors 
    npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```
3. To run the application in development mode:
- Go into the root file (src)
```bash 
npm run dev
```

## Next Steps
Planned future enhancements for Pocket Property include:

- Interactive Map Integration: Allowing users to find properties based on location visually.
- Improve search and loading speed. 
- Generating detailed summaries for HDB and bank loans.
- Mobile compatible.

See more planning in:
- https://trello.com/b/5Isfnkh4/pocket-property-upgraded
- https://www.figma.com/file/yq3d084oPuu5tHCmzI6ddK/Pocket-Property?type=whiteboard&node-id=0-1&t=ywhkd8l3domj8m05-0

