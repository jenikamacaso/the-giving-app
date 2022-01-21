import "../assets/scss/_main.scss";
import SSRProvider from 'react-bootstrap/SSRProvider';

const App = ({ Component, pageProps }) => {
    return (
        <SSRProvider>
            <Component className="App" {...pageProps} />
        </SSRProvider>
    )
}

export default App