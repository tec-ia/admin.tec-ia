import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf"

export async function saveFile(name) {
    const component = document.querySelector('#pdf_generator_content')
    const pdf = new jsPDF('portrait', 'px', 'a4', true)

    const data = await html2canvas(component, { scale: 2 })
    const img = data.toDataURL("image/png")
    const imgProps = pdf.getImageProperties(img)

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = pageWidth
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width

    const totalPages = Math.ceil(imgHeight / pageHeight)

    for (let i = 0; i < totalPages; i++) {
        (i > 0) ? pdf.addPage('a4', 'portrait') : null
        pdf.addImage(img, 'PNG', 0, (pageHeight * i * -1), imgWidth, imgHeight, 'NONE' + i, 'NONE', 0)
    }

    //pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight)

    pdf.save(name + '.pdf')
}

export default function PDFGenerator({ children, width = 0, marginX = 0, marginY = 0 }) {
    return (
        <div style={{ overflow: 'auto' }}>
            <div id="pdf_generator_content" style={{ width, paddingLeft: marginX, paddingRight: marginX, paddingTop: marginY, paddingBottom: marginY, margin: 'auto' }}>
                {children}
            </div>
        </div>
    )
}