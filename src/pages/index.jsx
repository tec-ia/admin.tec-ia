import { getItems } from "@/lib/service/items"

import PDFGenerator, { create as getPdf } from "./components/PDFGenerator/PDFGenerator"

import { useState, useEffect } from "react"

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { FilterMatchMode } from 'primereact/api'

export default function IndexPage() {

    // Toogle modal
    const [visible, setVisible] = useState(false)

    // Selected products
    const [selectedProducts, setSelectedProducts] = useState()

    // Filtered results
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
    const [globalFilterValue, setGlobalFilterValue] = useState('')

    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = { ...filters }

        _filters['global'].value = value

        setFilters(_filters)
        setGlobalFilterValue(value)
    }

    const items = getItems()

    return (
        <div>
            <div className="mdf-flex mdf-justify-center mdf-marginB-xl mdf-gap-md">
                <Button onClick={() => setVisible(true)} className="mdf-item-height mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Productos</Button>
                <Button onClick={() => getPdf()} className="mdf-item-height mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Descargar</Button>
            </div>

            <PDFGenerator width={900} height={1100} marginX={40} marginY={35} >
                <div className="mdf-flex mdf-justify-between mdf-gap-xx mdf-marginB-xx">
                    <div className="mdf-flex mdf-gap-xx">
                        <img src="/images/app-dark-icon.svg" alt="Logo Tec-IA" width={120} />
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
                        <p>12 de Febrero de 2023</p>
                        <p>Fecha solicitud</p>
                        <p>22 de Febrero de 2023</p>
                        <p>Fecha vencimiento</p>
                    </div>
                </div>

                <div className="mdf-marginB-xx">
                    <p className="mdf-marginB-sm mdf-font-600">Datos del cliente:</p>
                    <p className="mdf-flex mdf-marginB-sm">Nombre: <input type="text" className="mdf-paddingX-md mdf-width-100" /></p>
                    <p className="mdf-flex mdf-marginB-sm">Teléfono: <input type="tel" className="mdf-paddingX-md mdf-width-100" /></p>
                    <p className="mdf-flex mdf-marginB-sm">Ubicación: <input type="text" className="mdf-paddingX-md mdf-width-100" /></p>
                </div>

                <DataTable value={selectedProducts} >
                    <Column header="Cantidad" body="1" style={{ width: '10%' }} ></Column>
                    <Column field="name" header="Name" style={{ width: '50%' }} ></Column>
                    <Column field="cost" header="Precio" style={{ width: '15%' }} ></Column>
                    <Column field="price" header="Monto" style={{ width: '15%' }} ></Column>
                </DataTable>

                <div className="mdf-marginB-xx mdf-font-right">
                    <p className="mdf-marginB-sm">Monto caculado: $3,020.00</p>
                    <h2>Total: $3,000.00</h2>
                </div>

                <div className="mdf-marginB-xx mdf-font-justify">
                    <p className="mdf-marginB-sm mdf-font-600">Términos y condiciones:</p>
                    <p className="mdf-marginB-sm">La presente cotización tiene como finalidad detallar el monto de los servicios y productos que usted adquiere así como el costo total que se requiere para cubrirlos en su totalidad.</p>
                    <p className="mdf-marginB-sm">Todo trabajo requiere un anticipo del 70% para el inicio de las actividades correspondientes, 15 al avance del proyecto y el resto al finalizar las labores.</p>
                    <p className="mdf-marginB-sm">El presente costo total está sujeto a cambios, siempre con previo aviso, ya que no nos hacemos responsables por actividades o productos no contempladas en este documento.</p>
                    <p className="mdf-marginB-sm">Este presupuesto es válido siempre y cuando la aceptación del cliente se encuentre dentro del periodo establecido al inicio.</p>
                </div>
            </PDFGenerator>

            <Dialog header="Listado de servicios" visible={visible} onHide={() => setVisible(false)} position="top" resizable={false} draggable={false} style={{ width: '95%', maxWidth: '1000px' }}>
                <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ingrese su búsqueda..." className="mdf-item-height mdf-paddingX-lg mdf-rounded-xx mdf-bg-screen mdf-width-80 mdf-marginB-xx" style={{ maxWidth: '500px' }} />
                <DataTable value={items} selectionMode="checkbox" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} removableSort paginator rows={25} filters={filters} showGridlines >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ width: '50%' }} ></Column>
                    <Column field="category" header="Category" sortable style={{ width: '25%' }} ></Column>
                    <Column field="cost" header="Costo" sortable style={{ width: '15%' }} ></Column>
                    <Column field="price" header="Precio" sortable style={{ width: '15%' }} ></Column>
                </DataTable>
            </Dialog>
        </div>
    )

}