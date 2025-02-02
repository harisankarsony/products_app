import "@/styles/globals.css";
import ProductProvider from './ProductContext';

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  )
}
