import axiosClient from './axiosClient';

const messagesApi = {
  getListMessageUser(idUser) {
    const messages = axiosClient.get(`/messages/${idUser}`);
    return messages;
  },
};

export default messagesApi;
