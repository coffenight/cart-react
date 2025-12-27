import { useEffect, useState, createContext } from "react";
import CartFooter from "../CartFooter/CartFooter";
import CartHeader from "../CartHeader/CartHeader";
import Product from "../Product/Product";
import Button from "../Button/Button";
// import data from "./../../data";
import { serverPath } from "../../helpers/variables";

export const AppContext = createContext(null);

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [total, setTotal] = useState(null);
	const [fetchData, setFetchData] = useState(false);

	useEffect(() => {
		fetch( `${serverPath}/products`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCart(data);
			});
	}, [fetchData]);

	useEffect(() => {
		if (cart) {
			setTotal({
				price: cart.reduce((prev, curr) => {
					return prev + curr.priceTotal;
				}, 0),
				count: cart.reduce((prev, curr) => {
					return prev + curr.count;
				}, 0),
			});
		}
	}, [cart]);

	const deleteProduct = (id) => {
		// setCart((prev) => {
		// 	return prev.filter((product) => {
		// 		return id !== product.id;
		// 	});
		// });
		fetch(`${serverPath}/products/${id}`, {
			method: "DELETE",
		}).then((res) => {
			if (res.ok === true) {
				setFetchData((prev) => {
					return !prev;
				});
			}
		});
	};

	const increase = (id) => {
		// setCart((cart) => {
		// 	return cart.map((product) => {
		// 		if (id === product.id) {
		// 			return {
		// 				...product,
		// 				count: ++product.count,
		// 				priceTotal: product.count * product.price,
		// 			};
		// 		}
		// 		return product;
		// 	});
		// });

		const product = cart.find((product) => id === product.id);

		const data = {
			...product,
			count: ++product.count,
			priceTotal: product.count * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "aplication/json" },
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok === true) {
				setFetchData((prev) => {
					return !prev;
				});
			}
		});
	};

	const decrease = (id) => {
		// setCart((cart) => {
		// 	return cart.map((product) => {
		// 		if (id === product.id) {
		// 			return {
		// 				...product,
		// 				count: product.count - 1 > 1 ? product.count - 1 : 1,
		// 				priceTotal:
		// 					product.count - 1 > 1
		// 						? --product.count * product.price
		// 						: 1 * product.price,
		// 			};
		// 		}
		// 		return product;
		// 	});
		// });
		const product = cart.find((product) => id === product.id);

		const data = {
			...product,
			count: product.count - 1 > 1 ? product.count - 1 : 1,
			priceTotal: product.count - 1 > 1 ? --product.count * product.price : 1 * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "aplication/json" },
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok === true) {
				setFetchData((prev) => {
					return !prev;
				});
			}
		});
	};

	const changeValue = (id, value) => {
		// setCart((cart) => {
		// 	return cart.map((product) => {
		// 		if (product.id === id) {
		// 			return {
		// 				...product,
		// 				count: value,
		// 				priceTotal: value * product.price,
		// 			};
		// 		}
		// 		return product;
		// 	});
		// });
		const product = cart.find((product) => id === product.id);

		const data = {
			...product,
			count: value,
			priceTotal: value * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "aplication/json" },
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok === true) {
				setFetchData((prev) => {
					return !prev;
				});
			}
		});
	};

	const addProduct = () => {
		const titles = ["Apple MacBook Air 13", "Apple-Watch", "Mac Pro"];
		const imgs = ["macbook.jpg", "apple-watch.jpg", "mac-pro.jpg"];
		const prices = [50000, 10000, 56000, 18524];

		const randomValue = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)];
		};

		const price = randomValue(prices);

		const data = {
			img: randomValue(imgs),
			title: randomValue(titles),
			count: 1,
			price: price,
			priceTotal: price,
		};

		fetch(`${serverPath}/products/`, {
			method: "POST",
			headers: { "Content-Type": "aplication/json" },
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.ok === true) {
				setFetchData((prev) => {
					return !prev;
				});
			}
		});
	};

	const products = () => {
		return cart.map((product) => {
			return (
				<Product
					product={product}
					key={product.id}
				/>
			);
		});
	};

	// const products = cart.map((product) => {
	// 	return (
	// 		<Product
	// 			product={product}
	// 			key={product.id}
	// 			deleteProduct={deleteProduct}
	// 			increase={increase}
	// 			decrease={decrease}
	// 			changeValue={changeValue}
	// 		/>
	// 	);
	// });

	return (
		<AppContext.Provider value={{ deleteProduct, increase, decrease, changeValue, addProduct }}>
			<section className="cart">
				<CartHeader />
				{cart && products()}
				{total && <CartFooter total={total} />}
			</section>
			<section className="button-wrapper">
				<Button title="Add Product" />
			</section>
		</AppContext.Provider>
	);
};

export default Cart;
