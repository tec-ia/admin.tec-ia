import { items, config } from "../store/items"

export const getItems = () => {

    let list = []

    list = items.map((item) => {

        let cost = parseInt(item.cost, 10)
        let price = Math.round(cost + (cost * config.percentage / 100))

        return {
            category: item.category,
            url: item.url,
            name: item.name,
            cost: cost,
            price: price,
        }

    })

    return list

}
