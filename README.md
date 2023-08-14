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
   <a href="https://ibb.co/Y708PMh"><img src="https://i.ibb.co/KjK7bkW/register-page.png" alt="register-page" border="0"></a>

2. User authentication through a login page.
   <a href="https://ibb.co/Tr9nWZ6"><img src="https://i.ibb.co/pnYshgc/login-page.png" alt="login-page" border="0"></a>

3. Menu navigation to different pages in the app.
   <a href="https://ibb.co/vdMBZYd"><img src="https://i.ibb.co/JpSd5Qp/navigation-menu.png" alt="navigation-menu" border="0"></a>

4. User profile editing (editing Profile Picture, Username,FullName,Password and Status).
   <a href="https://ibb.co/0hBc335"><img src="https://i.ibb.co/ChJzFFL/Profile-page.png" alt="Profile-page" border="0"></a>

5. Search individual chats/groups
   <a href="https://ibb.co/6gpjjdR"><img src="https://i.ibb.co/XSdccwZ/search-chats-screen.png" alt="search-chats-screen" border="0"></a>

6. Search users to add to chat

<a href="https://ibb.co/wMVw6dc"><img src="https://i.ibb.co/syn63gW/search-users-to-add-to-chat-screen.png" alt="search-users-to-add-to-chat-screen" border="0"></a>

6. User-to-user direct messaging (with emoji's) and user to group messaging (send/receive).

- user-to-user direct messaging

<a href="https://ibb.co/fr8Xh6W"><img src="https://i.ibb.co/F8shSZ1/direct-one-to-one-messaging-screen.png" alt="direct-one-to-one-messaging-screen" border="0"></a>

- user-to-group messaging

<a href="https://ibb.co/mJm5XXG"><img src="https://i.ibb.co/F69400K/group-messaging-screen.png" alt="group-messaging-screen" border="0"></a>

<a href="https://ibb.co/bHzJ8WT"><img src="https://i.ibb.co/7g246YP/group-messaging-screen-2.png" alt="group-messaging-screen-2" border="0"></a>

- emoji picker

<a href="https://ibb.co/4KJFGts"><img src="https://i.ibb.co/PFtrnjT/emoji-picker-screen.png" alt="emoji-picker-screen" border="0"></a>

7. Group creation and adding/removing users to/from groups.

<a href="https://ibb.co/kBXvBhC"><img src="https://i.ibb.co/RbcdbCw/add-to-group-screen.png" alt="add-to-group-screen" border="0"></a>

8. group updation (editing group name,adding/deleting users) by user creator (who creates the group) also if group creator left the chat the system randomly picks one of the group members to be the creator of the group.

<a href="https://ibb.co/WBGLPtJ"><img src="https://i.ibb.co/HGBjxd8/group-updation-screen.png" alt="group-updation-screen" border="0"></a>

9. Ability for users to leave a group.

<a href="https://ibb.co/WBGLPtJ"><img src="https://i.ibb.co/HGBjxd8/group-updation-screen.png" alt="group-updation-screen" border="0"></a>

10. Viewing list of groups a user is a part of.

<a href="https://ibb.co/DGRRsnf"><img src="https://i.ibb.co/f8xxB7d/chats-page.png" alt="chats-page" border="0"></a>

11. Blocking and unblocking other users.

<a href="https://ibb.co/2kXz0Z9"><img src="https://i.ibb.co/d5nNsmT/block-unblock-users-screen.png" alt="block-unblock-users-screen" border="0"></a>

- blocked users

<a href="https://ibb.co/QFY8MZY"><img src="https://i.ibb.co/cc2bQP2/blocked-user-screen.png" alt="blocked-user-screen" border="0"></a>

<a href="https://ibb.co/CHt6xDy"><img src="https://i.ibb.co/ZMJSy7r/blocked-user-screen-2.png" alt="blocked-user-screen-2" border="0"></a>

12. Viewing the last 20 conversations(this done by checkbox selecting - if checked the system will filter the last 20 conversations that the user interacts with - users are sorted by last message date).

<a href="https://ibb.co/rxpnbY9"><img src="https://i.ibb.co/JvpXxVZ/view-last-20-conversations-page.png" alt="view-last-20-conversations-page" border="0"></a>

13. View for notifications

<a href="https://ibb.co/F4NH9LC"><img src="https://i.ibb.co/d41mSwx/notifications-screen.png" alt="notifications-screen" border="0"></a>

<a href="https://ibb.co/7QjMwnv"><img src="https://i.ibb.co/T1YjV4c/notifications-screen-2.png" alt="notifications-screen-2" border="0"></a>

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
