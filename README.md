# Pocket Property

Pocket Property is an interactive web application designed to simplify the process of finding and calculating property-related metrics for HDB (Housing & Development Board) properties. Whether you're in the market to buy HDB or just looking to get average pricing metrics without going through the hassle of complex calculations, Pocket Property has you covered! 

## Screenshot(s)
 ### Homepage
![Pocket Property Landing Page](https://github.com/wiwianquek/hdb-resale-calculator/assets/136752154/70a4ef3a-b091-492e-9a08-4d45d40045ec)

 ### HDB Resale Data
![image](https://github.com/wiwianquek/hdb-resale-calculator/assets/136752154/39d9ccce-28e5-412a-878b-14b02ccee0b3)

 ### HDB Search History
![image](https://github.com/wiwianquek/hdb-resale-calculator/assets/136752154/2ede5a1b-9503-4119-b74f-8d84f930119c)

 ### Mortgage Calculator
![image](https://github.com/wiwianquek/hdb-resale-calculator/assets/136752154/0f927da3-217d-4b4f-a51c-e7ff64f93578)


*Above is the main landing page of Pocket Property, showcasing the intuitive UI for a seamless user experience.*

## Technologies Used

- **React.js**: For building the user interface.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Chakra UI**: A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
- **Axios**: Promise-based HTTP client for making requests to the backend.
- **React Router**: For navigation between different components within the app.
- **Express.js**: Backend framework for creating API endpoints.
- **Mongoose**: MongoDB object modeling for Node.js.
- **CORS**: Package for providing a Connect/Express middleware that can be used to enable CORS.
- **Airtable**: Integration for storing and retrieving data.
- **Trello** for project management.

## Getting Started

To get started with Pocket Property:

1. Clone the repository to your local machine.
2. Install the dependencies:
```bash
    npm install react-icons react-router-dom
    npm install axios //promise-based HTTP client that you can use to make requests to your server from your React app
    npm install express
    npm install mongoose 
    npm install cors 
    npm install airtable
    npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```
3. To run the application in development mode:
- Go into the root file (src)
```bash 
npm run dev
```
4. To connect to the backend server to retrieve backend api data:
```bash 
node src/backend/server.js
```


## Next Steps
Planned future enhancements for Pocket Property include:

- Interactive Map Integration: Allowing users to find properties based on location visually.
- Filter Container: Providing advanced filtering options for search results.
- Loan Summaries: Generating detailed summaries for HDB and bank loans.

To view the project's progress and planned features, check out our Trello board:
 [Trello Board](https://trello.com/invite/b/3EggqNp8/ATTI4ec0bce708f7fab9c96b6ff67e12648aF0838E62/project-2) 
