export class Product {

    static operators = [">=", ">", "=", "<=", "<"];

    static filterFuncs = {
        name: {
            contains: (product, value) => product.name.includes(value),
            starts: (product, value) => product.name.startsWith(value),
            ends: (product, value) => product.name.endsWith(value),
        },
        price: {
            '=': (product, value) => product.price === parseFloat(value),
            '<': (product, value) => product.price < parseFloat(value),
            '<=': (product, value) => product.price <= parseFloat(value),
            '>': (product, value) => product.price > parseFloat(value),
            '>=': (product, value) => product.price >= parseFloat(value),
        },
        quantity: {
            '=': (product, value) => product.quantity === parseInt(value),
            '<': (product, value) => product.quantity < parseInt(value),
            '<=': (product, value) => product.quantity <= parseInt(value),
            '>': (product, value) => product.quantity > parseInt(value),
            '>=': (product, value) => product.quantity >= parseInt(value),
        },
        description: {
            contains: (product, value) => product.description.includes(value),
            starts: (product, value) => product.description.startsWith(value),
            ends: (product, value) => product.description.endsWith(value),
        },
    };

    static filterProducts(products, searchStr) {
        return products.filter(product =>
            searchStr.split('&').every(searchParam => {
                if(Product.operators.find(op => searchParam.includes(op))){
                    const [field, opVal] = searchParam.split('-');
                    const operator = Product.operators.find(op => opVal.includes(op));
                    if (!operator) {
                        throw new Error(`Не удалось преобразовать строку в оператор и значение: ${opVal}`);
                    }
                    const value = opVal.slice(operator.length);
                    if (!Product.filterFuncs[field] || !Product.filterFuncs[field][operator]) {
                        throw new Error(`Не удалось прочитать параметр: ${searchParam}`);
                    }
                    return Product.filterFuncs[field][operator](product, value);
                }
                const [field, operator, value] = searchParam.split('-');
                if (!Product.filterFuncs[field] || !Product.filterFuncs[field][operator]) {
                    throw new Error(`Не удалось прочитать параметр: ${searchParam}`);
                }
                return Product.filterFuncs[field][operator](product, value);
            })
        );
    }

    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

const products = [
    new Product('Product 1fd', 2, 7, 'Description 1abc'),
    new Product('Product 2', 20, 3, 'Description 2'),
    new Product('Product 3fd', 30, 4, 'Description 3')
];

const searchStr = 'name-contains-fd&price-=2&quantity->5&description-ends-abc';
const results = Product.filterProducts(products, searchStr);
console.log(results);