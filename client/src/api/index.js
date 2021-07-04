import axios from 'axios';

const url = 'http://localhost:5000/question';
const userUrl = 'http://localhost:5000/user';
const profile = JSON.parse(localStorage.getItem("profile"))
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q5MEBleGFtcGxlLmNvbSIsImlkIjoiNjBlMTg5M2ZkZTY4OTg0ZWI4YTU2ZWQ3IiwiaWF0IjoxNjI1MzkzOTU4LCJleHAiOjE2MjUzOTc1NTh9.ydNRB6f5F_YRIP8dxBtkSWbDIdS8FPYdliW4l8tc5Tg"
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost,
    {
        headers:{
            "authorization":`Bearer ${token}`
        }
    }
    );
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost,
{
    headers:{
        "authorization":`Bearer ${token}`
    }
}
);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const signIn = (formData) => axios.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => axios.post(`${userUrl}/signup`, formData);