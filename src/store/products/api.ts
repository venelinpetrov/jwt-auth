import type { Product } from '../../types/products';
import { myApi } from '../../utils/store/makeApi';

export const productsApi = myApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProduct: build.query<Product, number>({
			query: (id) => ({
				url: `products/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useFetchProductQuery, useLazyFetchProductQuery } = productsApi;
