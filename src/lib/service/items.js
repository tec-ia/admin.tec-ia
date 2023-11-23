import { items, config } from "../store/items"

const ItemService = {

    getItems: () => {

        let list = []

        list = items.map((item) => {

            let cost = parseInt(item.cost, 10)
            let price = (item.defaultCost) ? cost : Math.round(cost + (cost * config.percentage / 100))

            let realCost = (item.noExpenses ? 0 : (item.realCost ? parseInt(item.realCost, 10) : cost))

            return {
                /*quantity: 1,
                amount: price,*/
                category: item.category,
                url: item.url,
                name: item.name,
                cost: realCost,
                price: price,
            }

        })

        return list

    },

}

export default ItemService