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
   <a href="https://ibb.co/0hnJHRY"><img src="https://i.ibb.co/qkD1T3m/login-page-screen-2.png" alt="login-page-screen-2" border="0"></a>

3. Menu navigation to different pages in the app.
   <a href="https://ibb.co/6H9KBhh"><img src="https://i.ibb.co/9bKxtXX/navigation-menu.png" alt="navigation-menu" border="0"></a>

4. User profile editing (editing Profile Picture, Username,FullName and Password).
   <a href="https://ibb.co/DpcjHhZ"><img src="https://i.ibb.co/16y4t1k/Profile-page.png" alt="Profile-page" border="0"></a>

5. Search individual chats/groups
   <a href="https://ibb.co/j49jtNV"><img src="https://i.ibb.co/VB0k61H/search-chats-screen.png" alt="search-chats-screen" border="0"></a>

6. Search users to add to chat

<a href="https://ibb.co/7vD17Pz"><img src="https://i.ibb.co/SNg3qbx/search-users-to-add-to-chat-screen.png" alt="search-users-to-add-to-chat-screen" border="0"></a>

7. Search messages - when searching the part of the word to be searched is painted in yellow background

- Search individual chat messages

<a href="https://ibb.co/ggpPDm5"><img src="https://i.ibb.co/YjMytPz/user-to-user-search-messages.png" alt="user-to-user-search-messages" border="0"></a>

- Search group messages

<a href="https://ibb.co/s2W675p"><img src="https://i.ibb.co/nbPnp3q/search-messages-group.png" alt="search-messages-group" border="0"></a>

8. User-to-user direct messaging (with emoji's and files!) and user to group messaging (send/receive).

- user-to-user direct messaging

<a href="https://ibb.co/Cw7Zzcw"><img src="https://i.ibb.co/yNy1X9N/direct-one-to-one-messaging-screen.png" alt="direct-one-to-one-messaging-screen" border="0"></a>

- user-to-group messaging

<a href="https://ibb.co/TMZhHn9"><img src="https://i.ibb.co/8gJ8jR1/group-messaging-screen.png" alt="group-messaging-screen" border="0"></a>

<a href="https://ibb.co/YNvhd9t"><img src="https://i.ibb.co/4FBpSyj/group-messaging-screen-2.png" alt="group-messaging-screen-2" border="0"></a>

- emoji picker

<a href="https://ibb.co/KLrCTcT"><img src="https://i.ibb.co/QCKsy7y/emoji-picker-screen.png" alt="emoji-picker-screen" border="0"></a>

- attach file user-to-user messaging

<a href="https://ibb.co/nPKSWPd"><img src="https://i.ibb.co/bbGnfbw/one-to-one-messaging-with-attach-files.png" alt="one-to-one-messaging-with-attach-files" border="0"></a>

- attached file user-to-user messaging

<a href="https://ibb.co/Ct31t6p"><img src="https://i.ibb.co/3s9rsv5/one-to-one-messaging-with-attached-files.png" alt="one-to-one-messaging-with-attached-files" border="0"></a>

- attach file user-to-group messaging

<a href="https://ibb.co/GnzMfX4"><img src="https://i.ibb.co/pbYK6gB/group-messaging-attach-file.png" alt="group-messaging-attach-file" border="0"></a>

- attached file user-to-group messaging

<a href="https://ibb.co/R05spgx"><img src="https://i.ibb.co/SnLMX6h/group-messaging-attached-file.png" alt="group-messaging-attached-file" border="0"></a>

<a href="https://ibb.co/vqz9qW0"><img src="https://i.ibb.co/ZXT9Xrq/group-messaging-attached-file-2.png" alt="group-messaging-attached-file-2" border="0"></a>

9. Group creation and adding/removing users to/from groups.

<a href="https://ibb.co/mT4LQm5"><img src="https://i.ibb.co/8s9WFJg/add-to-group-screen.png" alt="add-to-group-screen" border="0"></a>

10. group updation (editing group name,adding/deleting users) by user creator (who creates the group) also if group creator left the chat the system randomly picks one of the group members to be the creator of the group.

<a href="https://ibb.co/yBK2Q1k"><img src="https://i.ibb.co/dJXZ5qp/group-updation-screen.png" alt="group-updation-screen" border="0"></a>

11. Ability for users to leave a group.

<a href="https://ibb.co/yBK2Q1k"><img src="https://i.ibb.co/dJXZ5qp/group-updation-screen.png" alt="group-updation-screen" border="0"></a>

12. Delete Group (only who create the group allow to delete it)

<a href="https://ibb.co/yBK2Q1k"><img src="https://i.ibb.co/dJXZ5qp/group-updation-screen.png" alt="group-updation-screen" border="0"></a>

13. Viewing list of groups a user is a part of.

<a href="https://ibb.co/PTfkv9x"><img src="https://i.ibb.co/XyvHr3X/chats-page.png" alt="chats-page" border="0"></a>

14. Blocking and unblocking other users.

<a href="https://ibb.co/XVv7Lqr"><img src="https://i.ibb.co/g6BS9xL/block-unblock-users-screen.png" alt="block-unblock-users-screen" border="0"></a>

- blocked users

<a href="https://ibb.co/1ZkD8qZ"><img src="https://i.ibb.co/WnLbgyn/blocked-user-screen.png" alt="blocked-user-screen" border="0"></a>

<a href="https://ibb.co/mJH6r73"><img src="https://i.ibb.co/7vG2xFq/blocked-user-screen-2.png" alt="blocked-user-screen-2" border="0"></a>

15. Viewing the last 20 conversations(this done by checkbox selecting - if checked the system will filter the last 20 conversations that the user interacts with - users are sorted by last message date).

<a href="https://ibb.co/26tQyKL"><img src="https://i.ibb.co/hMWjy8n/view-last-20-conversations-page.png" alt="view-last-20-conversations-page" border="0"></a>

16. Enable/Disable Message Send / Receive Sounds

<a href="https://ibb.co/26tQyKL"><img src="https://i.ibb.co/hMWjy8n/view-last-20-conversations-page.png" alt="view-last-20-conversations-page" border="0"></a>

17. View for notifications

<a href="https://ibb.co/xFjbZgM"><img src="https://i.ibb.co/XYsPH5z/notifications-screen.png" alt="notifications-screen" border="0"></a>

<a href="https://ibb.co/tH2fv76"><img src="https://i.ibb.co/yNkTZwC/notifications-screen-2.png" alt="notifications-screen-2" border="0"></a>

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
