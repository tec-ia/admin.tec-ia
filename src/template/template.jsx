import Link from "next/link"

export default function Template({ children }) {
    return (
        <>
            <nav className="cmp-navbar mdf-bg-content mdf-borderB-md mdf-border-content">
                <div className="document-content mdf-height-100 mdf-flex mdf-align-center mdf-gap-lg">
                    <Link href="/" className="mdf-item-height mdf-flex mdf-align-center mdf-font-500 mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Videovigilancia</Link>
                    <Link href="/web" className="mdf-item-height mdf-flex mdf-align-center mdf-font-500 mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Desarrollo web</Link>
                </div>
            </nav>

            <div className="document-wrapper mdf-bg-content mdf-margin-sm mdf-paddingY-xx">
                <div className="document-content">
                    {children}
                </div>
            </div>
        </>
    )
}