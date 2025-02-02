import { useProductDispatch} from "../pages/ProductContext";
import Link from "next/link";

// displays the details of products in filterList
export default function List({ list }) {
  const dispatch = useProductDispatch();

  return (
    <ul className="products-list">
      {list.map((product) => {
        return (
            <Link className="product-link" key={product.id} href='/product' onClick={
              () => dispatch(
                {
                  type: 'SET_PRODUCT',
                  payload: product,
                }
              )}>
              <li>
                <div className="thumbnail-div"><img src={product.thumbnail} /></div>
                <p>{product.title}</p>
                <p>Price: ${product.price}</p>
              </li>
            </Link>
        )
      })
      }
    </ul>
  )
}