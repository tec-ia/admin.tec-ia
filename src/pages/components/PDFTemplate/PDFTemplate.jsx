import PDFGenerator, { saveFile } from "../PDFGenerator/PDFGenerator"
import { Button } from 'primereact/button'

export default function PDFTemplate({ items, totalAmount }) {

    const currencyFormat = (amount) => {
        return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount)
    }

    const finalTotal = (amount) => {
        let tem = parseInt(amount, 10)
        return (tem > 1000) ? Math.trunc(tem / 100) * 100 : tem
    }

    const expirationDate = () => {
        let date = currentDate
        const monts = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        date.setDate(date.getDate() + 14)
        return `${date.getDate()} de ${monts[date.getMonth()]} de ${date.getFullYear()}`
    }

    const expeditionDate = () => {
        let date = currentDate
        const monts = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        return `${date.getDate()} de ${monts[date.getMonth()]} de ${date.getFullYear()}`
    }

    const currentDate = new Date()

    return (
        <>
            <div className="mdf-flex mdf-justify-center mdf-marginB-xl mdf-gap-md" >
                <Button onClick={() => saveFile('Tec-IA-' + currentDate.getTime())} className="mdf-item-height mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Descargar</Button>
            </div>
            <PDFGenerator width={900} height={1100} marginX={40} marginY={35} >
                <div className="mdf-flex mdf-justify-between mdf-gap-xx mdf-marginB-xx">
                    <div className="mdf-flex mdf-gap-xx">
                        <img src="/images/app-dark-icon.svg" alt="Logo Tec-IA" className="mdf-marginT-md" width={120} height={120} />
                        <div>
                            <h2 className="mdf-marginB-sm">Agencia Tec-IA</h2>
                            <p>Ing. José Enrique Zempoaltecatl Moyotl</p>
                            <p>Tel. (+52) 221 340 1464</p>
                            <p>Correo: contacto@tec-ia.com</p>
                            <p>Sitio web: www.tec-ia.com</p>
                        </div>
                    </div>
                    <div className="mdf-font-right">
                        <h2 className="mdf-marginB-sm">Detalle de cotización</h2>
                        <p>{expeditionDate()}</p>
                        <p>Fecha solicitud</p>
                        <p>{expirationDate()}</p>
                        <p>Fecha vencimiento</p>
                    </div>
                </div>

                <div className="mdf-marginB-xx">
                    <p className="mdf-marginB-sm mdf-font-600">Datos del cliente:</p>
                    <p className="mdf-flex mdf-marginB-sm">Nombre: <input type="text" className="mdf-paddingX-md mdf-width-100" /></p>
                    <p className="mdf-flex mdf-marginB-sm">Teléfono: <input type="tel" className="mdf-paddingX-md mdf-width-100" /></p>
                    <p className="mdf-flex mdf-marginB-sm">Ubicación: <input type="text" className="mdf-paddingX-md mdf-width-100" /></p>
                </div>

                <table className="mdf-width-100 mdf-font-left mdf-border-collapse mdf-marginB-xx">
                    <thead>
                        <tr className="mdf-borderY-md mdf-border-content">
                            <th className="mdf-paddingX-sm mdf-paddingY-md mdf-font-600">Cantidad</th>
                            <th className="mdf-paddingX-sm mdf-paddingY-md mdf-width-70 mdf-font-600">Concepto</th>
                            <th className="mdf-paddingX-sm mdf-paddingY-md mdf-font-600">Precio</th>
                            <th className="mdf-paddingX-sm mdf-paddingY-md mdf-font-600">Monto</th>
                        </tr>
                    </thead>
                    <tbody className="mdf-borderB-md mdf-border-content">
                        {items?.map((item) => (
                            <tr>
                                <td className="mdf-paddingX-sm mdf-paddingY-sm mdf-font-center">{item.quantity}</td>
                                <td className="mdf-paddingX-sm mdf-paddingY-sm mdf-width-70">{item.name}</td>
                                <td className="mdf-paddingX-sm mdf-paddingY-sm mdf-font-right">${currencyFormat(item.price)}</td>
                                <td className="mdf-paddingX-sm mdf-paddingY-sm mdf-font-right">${currencyFormat(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mdf-marginB-xx mdf-font-right">
                    <p className="mdf-marginB-sm">Monto caculado: ${currencyFormat(totalAmount)}</p>
                    <h2>Total: ${currencyFormat(finalTotal(totalAmount))}</h2>
                </div>

                <div className="mdf-font-justify mdf-marginB-xx">
                    <p className="mdf-marginB-sm mdf-font-600">Términos y condiciones:</p>
                    <p className="mdf-marginB-sm">1. La presente cotización tiene como finalidad detallar los servicios y/o productos que usted adquiere, así como el monto final que se requiere para cubrirlos en su totalidad.</p>
                    <p className="mdf-marginB-sm">2. Todo trabajo requiere un anticipo del 70% para el inicio de las actividades correspondientes, 15% al avance del proyecto y el resto al finalizar las labores.</p>
                    <p className="mdf-marginB-sm">3. El presente costo total está sujeto a cambios (siempre con previo aviso), ya que no nos hacemos responsables por actividades o productos no contempladas en este documento.</p>
                    <p className="mdf-marginB-sm">4. Este presupuesto es válido siempre y cuando la aceptación del cliente se encuentre dentro del periodo establecido.</p>
                </div>

                <div className="mdf-font-right">
                    <small>Clave de cotización: Tec-IA-{currentDate.getTime()}</small>
                </div>
            </PDFGenerator>
        </>
    )
}