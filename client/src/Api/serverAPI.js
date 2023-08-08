import axios from "axios";
const BASE_URL = "http://localhost:8800/";

const API_URLS = {
  login: `${BASE_URL}api/auth/login`,
  register: `${BASE_URL}api/auth/register`,
  getUsers: `${BASE_URL}api/users/getUsers/`,
  updateUser: `${BASE_URL}api/users/updateUser/`,
  getConversation: `${BASE_URL}api/conversations/getConversation`,
  getGroupConversation: `${BASE_URL}api/conversations/getGroupConversation`,
  newMessage: `${BASE_URL}api/messages/newMessage`,
  getMessages: `${BASE_URL}api/messages/getMessages/`,
  newMessageGroup: `${BASE_URL}api/messages/newMessageGroup`,
  getMessagesGroup: `${BASE_URL}api/messages/getMessagesGroup/`,
  setConversation: `${BASE_URL}api/conversations/setConversation`,
  setGroupConversation: `${BASE_URL}api/conversations/setGroupConversation`,
  getUnblockedUsers: `${BASE_URL}api/users/getUnblockedUsers/`,
  getBlockedUsers: `${BASE_URL}api/users/getBlockedUsers/`,
  blockUser: `${BASE_URL}api/users/blockUser/`,
  unBlockUser: `${BASE_URL}api/users/unBlockUser/`,
  createGroup: `${BASE_URL}api/groups/createGroup`,
  getGroups: `${BASE_URL}api/groups/getGroups/`,
};

export const login = (UserName, Password) => {
  try {
    return axios.post(API_URLS.login, { UserName, Password });
  } catch (error) {
    throw error;
  }
};

export const register = (FirstName, LastName, UserName, Password) => {
  try {
    return axios.post(API_URLS.register, {
      FirstName,
      LastName,
      UserName,
      Password,
    });
  } catch (error) {
    throw error;
  }
};

export const getUsers = (userId) => {
  try {
    return axios.get(`${API_URLS.getUsers}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const updateUser = (id, updatedUser) => {
  try {
    return axios.put(`${API_URLS.updateUser}${id}`, updatedUser);
  } catch (error) {
    throw error;
  }
};

export const getConversation = (data) => {
  try {
    return axios.post(API_URLS.getConversation, data);
  } catch (error) {
    throw error;
  }
};

export const getGroupConversation = (data) => {
  try {
    return axios.post(API_URLS.getGroupConversation, data);
  } catch (error) {
    throw error;
  }
};

export const setGroupConversation = (data) => {
  try {
    return axios.post(API_URLS.setGroupConversation, data);
  } catch (error) {
    throw error;
  }
};
export const setConversation = (data) => {
  try {
    return axios.post(API_URLS.setConversation, data);
  } catch (error) {
    throw error;
  }
};

export const newMessageGroup = (data) => {
  try {
    return axios.post(API_URLS.newMessageGroup, data);
  } catch (error) {
    throw error;
  }
};

export const getMessagesGroup = (conversationId) => {
  try {
    return axios.get(`${API_URLS.getMessagesGroup}${conversationId}`);
  } catch (error) {
    throw error;
  }
};
export const newMessage = (data) => {
  try {
    return axios.post(API_URLS.newMessage, data);
  } catch (error) {
    throw error;
  }
};

export const getMessages = (conversationId) => {
  try {
    return axios.get(`${API_URLS.getMessages}${conversationId}`);
  } catch (error) {
    throw error;
  }
};

export const getBlockedUsers = (userId) => {
  try {
    return axios.get(`${API_URLS.getBlockedUsers}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const getUnblockedUsers = (userId) => {
  try {
    return axios.get(`${API_URLS.getUnblockedUsers}${userId}`);
  } catch (error) {
    throw error;
  }
};

export const unBlockUser = (userId, blockedUserId) => {
  try {
    return axios.post(`${API_URLS.unBlockUser}${userId}/${blockedUserId}`);
  } catch (error) {
    throw error;
  }
};
export const blockUser = (userId, blockedUserId) => {
  try {
    return axios.post(`${API_URLS.blockUser}${userId}/${blockedUserId}`);
  } catch (error) {
    throw error;
  }
};

export const createGroup = (groupName, usersToAdd) => {
  try {
    return axios.post(`${API_URLS.createGroup}`, {
      groupName,
      usersToAdd,
    });
  } catch (error) {
    throw error;
  }
};

export const getGroups = (userId) => {
  try {
    return axios.get(`${API_URLS.getGroups}${userId}`);
  } catch (error) {
    throw error;
  }
};

export default API_URLS;
