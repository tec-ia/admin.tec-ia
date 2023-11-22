import Template from '@/template/template'

import 'primeicons/primeicons.css'

import '@/styles/globals.css'
import '@/styles/modifiers.css'
import '@/styles/components.css'
import '@/styles/primereact.css'

export default function App({ Component, pageProps }) {
    return (
        <Template>
            <Component {...pageProps} />
        </Template>
    )
}
