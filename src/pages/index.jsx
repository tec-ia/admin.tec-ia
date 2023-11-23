import ItemService from "@/lib/service/items"

import PDFTemplate from "./components/PDFTemplate/PDFTemplate"

import { useState } from "react"
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'

export default function IndexPage() {

    // Toogle modal
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

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

    // Final currency format
    const currencyFormat = (amount) => {
        return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount)
    }

    //Getter for items
    const items = ItemService.getItems()

    // Selected products
    const [selectedProducts, setSelectedProducts] = useState()
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalInvestment, setTotalInvestment] = useState(0)

    const cleanListedProducts = (list) => (
        list?.map((item) => ({
            category: item.category,
            url: item.url,
            name: item.name,
            cost: item.cost,
            price: item.price,
        }))
    )

    const prepareForSale = (products) => {

        let totalAmount = 0
        let totalInvestment = 0

        let list = []

        list = products.map((item) => {

            let quantity = item.quantity ? parseInt(item.quantity, 10) : 1
            let amount = quantity * item.price

            totalAmount = totalAmount + amount
            totalInvestment = totalInvestment + item.cost

            return {
                quantity: quantity,
                amount: amount,
                category: item.category,
                url: item.url,
                name: item.name,
                cost: item.cost,
                price: item.price,
            }

        })

        setTotalAmount(totalAmount)
        setTotalInvestment(totalInvestment)
        setSelectedProducts(list)

    }

    const onSelectedProducts = (products) => {
        prepareForSale(products)
    }

    const onCellEditComplete = (e) => {
        prepareForSale(selectedProducts)
    }

    const cellEditor = (options) => {
        return <InputText type="number" className="p-inputtext-sm" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} style={{ width: '80px' }} autoFocus />
    }

    return (
        <div>
            <div className="mdf-flex mdf-justify-center mdf-marginB-xx mdf-gap-md" >
                <Button onClick={() => setVisible(true)} className="mdf-item-height mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Productos</Button>
                <Button onClick={() => setVisible2(true)} className="mdf-item-height mdf-paddingX-md mdf-rounded-xx mdf-bg-content mdf-border-md mdf-border-content">Visualizar</Button>
            </div>

            <h3 className="mdf-font-400 mdf-marginB-sm">Ganancia: ${currencyFormat(totalAmount - totalInvestment)}</h3>
            <p className="mdf-font-400 mdf-marginB-sm">Inversión: ${currencyFormat(totalInvestment)}</p>
            <h3 className="mdf-font-600 mdf-marginB-xx">Monto total: ${currencyFormat(totalAmount)}</h3>

            <DataTable value={selectedProducts} emptyMessage="Selecciona los elementos que deseas" >
                <Column field="quantity" header="Cantidad" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} style={{ width: '10%', textAlign: 'center' }} ></Column>
                <Column field="name" header="Concepto" style={{ width: '60%' }} ></Column>
                <Column field="price" header="Precio" style={{ width: '10%' }} ></Column>
                <Column field="amount" header="Monto" style={{ width: '10%' }} ></Column>
            </DataTable>

            <h3 className="mdf-font-400 mdf-marginB-sm">Ganancia: ${currencyFormat(totalAmount - totalInvestment)}</h3>
            <p className="mdf-font-400 mdf-marginB-sm">Inversión: ${currencyFormat(totalInvestment)}</p>
            <h3 className="mdf-font-600 mdf-marginB-xx">Monto total: ${currencyFormat(totalAmount)}</h3>

            <Dialog header="Listado de servicios" visible={visible} onHide={() => setVisible(false)} position="top" resizable={false} draggable={false} style={{ width: '95%', maxWidth: '1000px' }}>
                <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ingrese su búsqueda..." className="mdf-item-height mdf-paddingX-lg mdf-rounded-xx mdf-bg-screen mdf-width-80 mdf-marginB-xx" style={{ maxWidth: '500px' }} />
                <DataTable value={items} selectionMode="rowClick" selection={cleanListedProducts(selectedProducts)} onSelectionChange={(e) => onSelectedProducts(e.value)} removableSort paginator rows={25} filters={filters} showGridlines >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ width: '50%' }} ></Column>
                    <Column field="category" header="Category" sortable style={{ width: '25%' }} ></Column>
                    <Column field="cost" header="Costo" sortable style={{ width: '15%' }} ></Column>
                    <Column field="price" header="Precio" sortable style={{ width: '15%' }} ></Column>
                </DataTable>
            </Dialog>

            <Dialog header="Vista previa de PDF" visible={visible2} onHide={() => setVisible2(false)} position="top" resizable={false} draggable={false} maximizable={true} style={{ width: '95%', maxWidth: '1000px' }}>
                <PDFTemplate items={selectedProducts} totalInvestment={totalInvestment} totalAmount={totalAmount} />
            </Dialog>
        </div>
    )

}