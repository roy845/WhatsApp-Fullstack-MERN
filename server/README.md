# Messenger App (Whatsapp-like)

A real-time messaging application built with Socket.io for instant data push from server to client.
This project is build with ReactJs,NodeJS,MongoDB,Express,JWT and Firebase.

## Tech Stack

- <b>Backend:</b> Node.js with Express

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">

<img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

**JWT (JSON Web Tokens)**

<img src = "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width = "60px" height = "60px">

- <b>Real-Time Data Transfer:</b> Socket.io

 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/600px-Socket-io.svg.png?20200308235956" width="124px" height="124px">

- <b>Frontend:</b> React and Material UI

<img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">

**Chakra UI**
<img src="https://i.ibb.co/4Sg46gN/chakra-ui-logo.png" width="124px" height="124px">

- **IDE**

**VSCODE**
<img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

<b>Database:</b> MongoDB

<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">

**Firebase**
<img src = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-firebase-icon.png" width = "60px" height = "60px">

## Core Principle

The essence of a real-time messaging app like this one lies in its ability to immediately "push" new data (in this case, messages) from the server to the client. This ensures instantaneous delivery and updating without waiting for the client to request new data. We achieve this using Socket.io library.

## Features

1. New user registration through a register page
   <img src="https://i.ibb.co/djPx3Br/register-page.png" width="800px" height = "400px" alt="register-page">

2. User authentication through a login page.
   <img src="https://i.ibb.co/7tBYBgG/login-page.png" width="800px" height = "400px" alt="login-page">

3. Menu navigation to different pages in the app.
   <img src="https://i.ibb.co/4tXJDZb/navigation-menu.png" width="800px" height = "400px" alt="navigation-menu">

4. User profile editing (editing Profile Picture, Username,FullName,Password and Status).
   <img src="https://i.ibb.co/wWX5WgB/Profile-page.png" width="800px" height = "400px" alt="Profile-page">

5. Search individual chats/groups
   <img src="https://i.ibb.co/wK6tshv/search-chats-screen.png" height = "100%" alt="search-chats-screen">

6. Search users to add to chat

<img src="https://i.ibb.co/FntGQ0n/search-users-to-add-to-chat-screen.png" width="800px" height = "400px" alt="search-users-to-add-to-chat-screen">

6. User-to-user direct messaging (with emoji's) and user to group messaging (send/receive).

- user-to-user direct messaging

<img src="https://i.ibb.co/1Q02py4/direct-one-to-one-messaging-screen.png" width="800px" height = "400px" alt="direct-one-to-one-messaging-screen">

- user-to-group messaging

<img src="https://i.ibb.co/7QrS5rD/group-messaging-screen.png" width="800px" height = "400px" alt="group-messaging-screen">

<img src="https://i.ibb.co/4PXyCVs/group-messaging-screen-2.png" width="800px" height = "400px" alt="group-messaging-screen-2">

- emoji picker

<img src="https://i.ibb.co/pK0d6wm/emoji-picker-screen.png" width="800px" height = "400px" alt="emoji-picker-screen">

7. Group creation and adding/removing users to/from groups.

<img src="https://i.ibb.co/S3S9Rpy/add-to-group-screen.png" width="800px" height = "400px" alt="add-to-group-screen">

8. group updation (editing group name,adding/deleting users) by user creator (who creates the group) also if group creator left the chat the system randomly picks one of the group members to be the creator of the group.

<img src="https://i.ibb.co/80pGTyQ/group-updation-screen.png" width="800px" height = "400px" alt="group-updation-screen">

9. Ability for users to leave a group.

<img src="https://i.ibb.co/80pGTyQ/group-updation-screen.png" width="800px" height = "400px" alt="group-updation-screen">

10. Viewing list of groups a user is a part of.

<img src="https://i.ibb.co/K6r0xQP/chats-page.png" width="800px" height = "400px" alt="chats-page">

11. Blocking and unblocking other users.

<img src="https://i.ibb.co/fHMhK4N/block-unblock-users-screen.png" width="800px" height = "400px" alt="block-unblock-users-screen">

- blocked users

<img src="https://i.ibb.co/7JtLkxp/blocked-user-screen.png" width="800px" height = "400px" alt="blocked-user-screen">

<img src="https://i.ibb.co/wSF9sRW/blocked-user-screen-2.png" width="800px" height = "400px" alt="blocked-user-screen-2">

12. Viewing the last 20 conversations(this done by checkbox selecting - if checked the system will filter the last 20 conversations that the user interacts with - users are sorted by last message date).

<img src="https://i.ibb.co/xh0bPGm/view-last-20-conversations-page.png" width="800px" height = "400px" alt="view-last-20-conversations-page">

13. View for notifications

<img src="https://i.ibb.co/Rz8jT0b/notifications-screen.png" width="800px" height = "400px" alt="notifications-screen">

<img src="https://i.ibb.co/VNxfY3P/notifications-screen-2.png" width="800px" height = "400px" alt="notifications-screen-2">

### Installation and Setup

<b>Clone the repository git clone</b> https://github.com/roy845/WhatsApp-Fullstack-MERN.git

### Client

<b>Install the dependencies and start the client</b>

1. Open a new terminal in VSCODE.

2. Navigate to the client directory: cd client.

3. Install dependencies: npm/yarn install.

4. Run the client: npm/yarn start.

### Server

<b>Install the dependencies and start the server</b>

1. Open a new terminal in VSCODE.

2. Navigate to the server directory: cd server.

3. Install dependencies: npm/yarn install.

4. Create a .env file in the root server directory.

In the .env file, set the following variables:

PORT: The port number on which the server will run (e.g., PORT=8800).

MONGO_DB_URI: The MongoDB connection URI for connecting to the database (e.g., MONGODB_URI=mongodb://localhost:27017/mydatabase).

JWT_SECRET_KEY:This key used for authentication and authorization. Here is how you can generate this key:

Open a terminal.

Type the following command and press Enter to generate a random JWT secret key

require('crypto').randomBytes(32).toString('hex')

Copy the generated secret key.

Open the .env file in the server directory.

Set the JWT_SECRET_KEY variable by pasting the generated secret key.

For example:

JWT_SECRET_KEY=generated_secret_key

5. Save the .env file.

6. Run the server: node server.js.
