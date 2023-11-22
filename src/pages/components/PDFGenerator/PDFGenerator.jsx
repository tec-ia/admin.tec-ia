export function create() {
    console.log("Se está generando el PDF")
}

export default function PDFGenerator({ children, width = 0, marginX = 0, marginY = 0 }) {
    return (
        <div style={{overflow: 'auto'}}>
            <div id="pdf_generator_content" style={{ width, paddingLeft: marginX, paddingRight: marginX, paddingTop: marginY, margin: 'auto', border: 'solid 1px #eee' }}>
                {children}
            </div>
        </div>
    )
}