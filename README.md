# Personal Portfolio Website

This project is a comprehensive personal portfolio website designed to showcase skills, projects, educational background, and professional experience. It features a modern, responsive design and includes functionalities for blog posts, project details, and an administrative dashboard for content management.

## Features

- **Dynamic Portfolio:** Showcase your projects with detailed descriptions, images, and links.
- **Interactive Blog:** Publish and manage blog posts with rich content.
- **Resume & Skills Section:** Highlight your professional journey, education, and technical skills.
- **Contact Form:** Allow visitors to easily get in touch.
- **Admin Dashboard:** Secure area for managing projects, blog posts, and user profiles.
- **User Authentication:** Secure login and registration for administrators.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **Theme Toggle:** Switch between light and dark themes.

## Technologies Used

### Client (Frontend)
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Vite:** A fast build tool for modern web projects.
- **React Router DOM:** For declarative routing in React applications.

### Server (Backend)
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript:** For type-safe backend development.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** For secure authentication.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (running locally or accessible via a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd website
    ```

2.  **Install Client Dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

3.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    cd ..
    ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

- `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/portfolio` or your MongoDB Atlas URI).
- `JWT_SECRET`: A strong, random string used for signing JWTs. You can generate one using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- `PORT`: The port the server will run on (e.g., `5000`).

## Running the Application

1.  **Start the Server:**
    Open a new terminal, navigate to the `server` directory, and run:
    ```bash
    cd server
    npm run dev
    ```
    The server will typically run on `http://localhost:5000` (or the port you specified in `.env`).

2.  **Start the Client:**
    Open another new terminal, navigate to the `client` directory, and run:
    ```bash
    cd client
    npm run dev
    ```
    The client will typically run on `http://localhost:5173`.

Your personal portfolio website should now be accessible in your web browser.

## Project Structure

- `client/`: Contains the frontend React application.
- `server/`: Contains the backend Node.js/Express.js application.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.