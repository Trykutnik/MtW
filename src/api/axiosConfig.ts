import axios, { AxiosError, AxiosResponse } from 'axios';

import { API_KEY, BASE_URL } from './urls';

export const axiosApiInstance: any = axios.create({
	baseURL: BASE_URL,
	headers: {
		'X-API-KEY': API_KEY,
	},
});

// export const newsService: any = axios.create({
// 	baseURL: URL_NEWS,
// 	headers: {
// 		// Authorization: API_KEY,
// 	},
// });

type UserInfo = {
	id?: number;
	title: string;
	body: string;
	userId: number;
};

type PostInfo = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

// export const useJsonPlaceholderService = () => {
// 	const { get, post } = axiosApiInstance;
//
// 	return {
// 		getAllUsers: async (): Promise<UserInfo[]> =>
// 			await get(`${BASE_URL}/users`),
// 		getAllPosts: async (): Promise<PostInfo[]> =>
// 			await get(`${BASE_URL}/posts`),
// 		getLimitPostsWithPage: async (
// 			limit: number,
// 			page: number,
// 		): Promise<any> =>
// 			await get(`${BASE_URL}/posts?_limit=${limit}&_page=${page}`),
// 		createUser: async (data: UserInfo): Promise<UserInfo> =>
// 			await post(`${BASE_URL}/users`, data),
// 	};
// };

class Api {
	async getData(url: string, params?: any) {
		return await axiosApiInstance
			.get(url, {
				// headers: {
				// 	customHeader: 'My custom header',
				// 	date: new Date(),
				// 	authorization: 'Bearer qweqweqweqwe',
				// },
				params,
			})
			.then(this.handleResponse)
			.catch(this.handleError);
	}
	async post(url: string, params?: any) {
		return await axiosApiInstance
			.post(url, params)
			.then(this.handleResponse)
			.catch(this.handleError);
	}
	async patch(url: string, params?: any) {
		return await axiosApiInstance
			.patch(url, params)
			.then(this.handleResponse)
			.catch(this.handleError);
	}
	async put(url: string, params?: any) {
		return await axiosApiInstance
			.put(url, params)
			.then(this.handleResponse)
			.catch(this.handleError);
	}
	async delete(url: string, params?: any) {
		return await axiosApiInstance
			.delete(url, params)
			.then(this.handleResponse)
			.catch(this.handleError);
	}

	private handleResponse(response: AxiosResponse) {
		return {
			status: response.status,
			info: response.data,
			headers: response.headers,
		};
	}
	private handleError(err: AxiosError) {
		return {
			status: err.response?.status,
			data: err.message,
		};
	}
}

export default new Api();
