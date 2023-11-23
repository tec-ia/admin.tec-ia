import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf"

export async function create() {
    const component = document.querySelector('#pdf_generator_content')
    const pdf = new jsPDF("portrait", "pt", "a4")

    const data = await html2canvas(component, { scale: 2 })

    alert("Se está generando el PDF...")

    const img = data.toDataURL("image/png")
    const imgProperties = pdf.getImageProperties(img)

    alert("Generando documento, espere...")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)

    pdf.save(fileClv + "-PRESUPUESTO.pdf")
}

export default function PDFGenerator({ children, width = 0, marginX = 0, marginY = 0 }) {
    return (
        <div style={{ overflow: 'auto' }}>
            <div id="pdf_generator_content" style={{ width, paddingLeft: marginX, paddingRight: marginX, paddingTop: marginY, paddingBottom: marginY, margin: 'auto', border: 'solid 1px #eee' }}>
                {children}
            </div>
        </div>
    )
}