import React, { useState } from "react";
import {
	useAddProductMutation,
	useDeleteProductMutation,
	useGetGoodsQuery,
} from "./redux/store/services/goodsApi";

const App = () => {
	const [count, setCount] = useState("");
	const [product, setProduct] = useState("");
	const { data = [], isLoading } = useGetGoodsQuery(count);
	const [addProduct, { isError }] = useAddProductMutation();
	const [deleteProduct] = useDeleteProductMutation();

	const addProductHandler = async () => {
		if (product) {
			await addProduct({ name: product }).unwrap();
			setProduct("");
		}
	};

	const deleteProductHandler = async (id) => {
		await deleteProduct(id).unwrap();
	};

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div>
			<div>
				<input
					type="text"
					value={product}
					onChange={(e) => setProduct(e.target.value)}
				/>

				<button onClick={addProductHandler}>Add product</button>
			</div>

			<select value={count} onChange={(e) => setCount(e.target.value)}>
				<option value="">all</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
			<ul>
				{data.map((item) => (
					<li
						key={item.id}
						onClick={() => deleteProductHandler(item.id)}
					>
						{item.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
