import type { Product } from '../../types/products';
import { myApi, Tag } from '../../utils/store/makeApi';

export const productsApi = myApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProduct: build.query<Product, number>({
			query: (id) => ({
				url: `products/${id}`,
				method: 'GET',
			}),
			providesTags: (_res, _err, id) => [{ type: Tag.TODO, id }],
		}),
	}),
});

export const { useFetchProductQuery } = productsApi;
