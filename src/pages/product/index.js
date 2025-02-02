import { useProduct } from "../ProductContext";

export default function Product() {
    const currentProduct = useProduct().currentProduct;  
    console.log(currentProduct);
    
    return (
        <>
        <div className="product-main-div">
            <div className="product-image-div">
                <img src={currentProduct.images[0]}/>
            </div>
            <div className="product-details-div">
                <p><h1>{currentProduct.title}</h1></p>
                <p>{currentProduct.description}</p>
                <p><b>SKU:</b> {currentProduct.sku}</p>
                <p><b>Price:</b> ${currentProduct.price}</p>
                <p><b>Rating:</b> <b style={(currentProduct.rating > 3.0) ? { color: 'green' } : { color: 'red' }}>{currentProduct.rating}</b></p>
                <p><b style={(currentProduct.availabilityStatus === 'In Stock') ? { color: 'green' } : { color: 'red' }}>{currentProduct.availabilityStatus}</b></p>
                <p><b style={(currentProduct.returnPolicy === 'No return policy') ? { color: 'red' } : { color: 'green' }}>{currentProduct.returnPolicy}</b></p>
            </div>
        </div>
        </>
    )
    
}