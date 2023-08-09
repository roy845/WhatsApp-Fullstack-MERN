# Messenger App (Whatsapp-like)

A real-time messaging application built with Socket.io for instant data push from server to client.
This project is build with ReactJs,NodeJS,MongoDB,Express,JWT.

## Tech Stack

<b>Backend:</b> Node.js with Express
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">
<img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

<b>Real-Time Data Transfer:</b> Socket.io

 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/600px-Socket-io.svg.png?20200308235956" width="124px" height="124px">

<b>Frontend:</b> React
<img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">
<b>Database:</b> MongoDB
<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">

## Core Principle

The essence of a real-time messaging app like this one lies in its ability to immediately "push" new data (in this case, messages) from the server to the client. This ensures instantaneous delivery and updating without waiting for the client to request new data. We achieve this using Socket.io library.

## Features

1. New user registration through a register page
   <img src="https://imgtr.ee/images/2023/08/09/24f4464121f457e5abfb7848f743e673.png" alt="24f4464121f457e5abfb7848f743e673.png" width="800px" height = "400px">

2. User authentication through a login page.
   <img src="https://imgtr.ee/images/2023/08/09/3e7192ce37c6d3cc5745c6dba6ff8693.png" alt="3e7192ce37c6d3cc5745c6dba6ff8693.png" width="800px" height = "400px">

3. Menu navigation to different pages in the app.
   <img src="https://imgtr.ee/images/2023/08/09/004c5c78d43cb63f2f43031431d8cc8a.png" alt="004c5c78d43cb63f2f43031431d8cc8a.png" width="100%">
4. User profile editing (editing Profile Picture, Username,FullName,Password and Status).
   <img src="https://imgtr.ee/images/2023/08/09/72598977378ba2bd3f1422db224ef91f.png" alt="72598977378ba2bd3f1422db224ef91f.png" width="800px" height = "400px">

5. Search individual chats/groups
   <img src="https://imgtr.ee/images/2023/08/09/edb7607eac7d715714a8710eeb3ff82c.png" alt="edb7607eac7d715714a8710eeb3ff82c.png" width="800px" height = "400px">

6. User-to-user direct messaging (with emoji's) and user to group messaging (send/receive).

- user-to-user direct messaging
  <img src="https://imgtr.ee/images/2023/08/09/c79e6b8a92157de36107899a8ece1fa1.png" alt="c79e6b8a92157de36107899a8ece1fa1.png" width="800px" height = "400px">

- user-to-group messaging
  <img src="https://imgtr.ee/images/2023/08/09/3def816116653fbe43d7331735e33890.png" alt="3def816116653fbe43d7331735e33890.png" width="800px" height = "400px">

- emoji picker direct messaging
  <img src="https://imgtr.ee/images/2023/08/09/fd517a75eff419c7a6e4535da4d90454.png" alt="fd517a75eff419c7a6e4535da4d90454.png" width="800px" height = "400px">

- emoji picker group messaging
  <img src="https://imgtr.ee/images/2023/08/09/9dd02135966650acc91cb557b9b4cd82.png" alt="9dd02135966650acc91cb557b9b4cd82.png" width="800px" height = "400px">

7. Group creation and adding/removing users to/from groups.
   <img src="https://imgtr.ee/images/2023/08/09/4d8539cd049a28893d8c4c39a9faf2ff.png" alt="4d8539cd049a28893d8c4c39a9faf2ff.png" width="800px" height = "400px">
   <img src="https://imgtr.ee/images/2023/08/09/d8917041db66b63a9f767c08475107fe.png" alt="d8917041db66b63a9f767c08475107fe.png" width="800px" height = "400px">

8. group updation (editing group name,profile picture,adding/deleting users,deleting group) by user creator (who creates the group) also if group creator left the chat the system randomly picks one of the group members to be the creator of the group.
   <img src="https://imgtr.ee/images/2023/08/09/68a5b6003d15d7fa1598c5b4c63955da.png" alt="68a5b6003d15d7fa1598c5b4c63955da.png" width="800px" height = "400px">
   <img src="https://imgtr.ee/images/2023/08/09/739b949596356c9f08dcb3b59b7370a2.png" alt="739b949596356c9f08dcb3b59b7370a2.png" width="800px" height = "400px">
   <img src="https://imgtr.ee/images/2023/08/09/414452fd321109e211781c5d1e3d24b9.png" alt="414452fd321109e211781c5d1e3d24b9.png" width="800px" height = "400px">
9. Ability for users to leave a group.
   <img src="https://imgtr.ee/images/2023/08/09/566dea02418776e185f8d4e1f0cfca81.png" alt="566dea02418776e185f8d4e1f0cfca81.png" width="800px" height = "400px">
10. Viewing list of groups a user is a part of.
    <img src="https://imgtr.ee/images/2023/08/09/84132c8a05000aa7c93c52e6867da568.png" alt="84132c8a05000aa7c93c52e6867da568.png" width="800px" height = "400px">
11. Blocking and unblocking other users.

- Settings
  <img src="https://imgtr.ee/images/2023/08/09/560eb822e57f3b6dac6e91f3e049c067.png" alt="560eb822e57f3b6dac6e91f3e049c067.png" width="800px" height = "400px">

- Account Privacy
  <img src="https://imgtr.ee/images/2023/08/09/eec0669e0b836ba14a9a5edfe322f9c5.png" alt="eec0669e0b836ba14a9a5edfe322f9c5.png" width="800px" height = "400px">

- Blocked Users
  <img src="https://imgtr.ee/images/2023/08/09/10283365926c17ff69fa683d415e8dd8.png" alt="10283365926c17ff69fa683d415e8dd8.png" width="800px" height = "400px">

- Add Users To Block
  <img src="https://imgtr.ee/images/2023/08/09/58ffbe64ac172e41eeeb21a4420d7d64.png" alt="58ffbe64ac172e41eeeb21a4420d7d64.png" width="800px" height = "400px">

12. Viewing the last 20 conversations(this done by checkbox selecting - if checked the system will filter the last 20 conversations that the user interacts with - users are sorted by last message date).
    <img src="https://imgtr.ee/images/2023/08/09/6fd85fff03f89039c3f11320528f6192.png" alt="6fd85fff03f89039c3f11320528f6192.png" width="800px" height = "400px">

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

### Socket

<b>Install the dependencies and start the socket</b>

1. Open a new terminal in VSCODE.

2. Navigate to the socket directory: cd socket.

3. Install dependencies: npm/yarn install.

4. Run the socket: npm/yarn start.
