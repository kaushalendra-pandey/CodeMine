import axios from 'axios';

const url = 'http://localhost:5000/question';
const userUrl = 'http://localhost:5000/user';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const signIn = (formData) => axios.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => axios.post(`${userUrl}/signup`, formData);