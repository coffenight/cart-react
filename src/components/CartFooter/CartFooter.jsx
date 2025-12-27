import './style.scss';

const CartFooter = ({ total }) => {
	const { count, price } = total;
	const priceFormatter = new Intl.NumberFormat();

    return (
		<footer className="cart-footer">
			<div className="cart-footer__count">{count} ед.</div>
			<div className="cart-footer__price">{priceFormatter.format(price)} руб.</div>
		</footer>
	);
}
 
export default CartFooter;