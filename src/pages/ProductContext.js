import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext(null);
const ProductDispatchContext = createContext(null);

const initialProductState ={
    currentProduct: {}
};

export default function ProductProvider({ children }) {
    const [product, dispatch] = useReducer(productReducer, initialProductState);
    
    return (
        <ProductContext.Provider value={product}>
            <ProductDispatchContext.Provider value={dispatch}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}

export function useProductDispatch() {
    return useContext(ProductDispatchContext);
}

function productReducer(product, action) {
    switch (action.type) {
        case 'SET_PRODUCT': {
            return { currentProduct: action.payload };
        }
    }
}