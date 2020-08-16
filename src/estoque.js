const produtos = ['minion1.png', 'minion2.png', 'minion4.png', 'minion5.png', 'minion6.png'];
const descricao = ['minion1.txt', 'minion2.txt', 'minion4.txt', 'minion5.txt', 'minion6.txt'];
const s3_source = "https://fialhominions.s3-sa-east-1.amazonaws.com/";

export const Produtos_Estoque = [
    {
        id: 1,
        title: "Minion de Pijama",
        img: s3_source + produtos[0],
        price: 99.90,
        company: "Funko",
        info: "Dimensões: 12x16x10 cm\nPeso: 150g\nProduto: Pop! Bob de Pijama: Minions 2 #905 - Funko",
        inCart: false,
        count: 0,
        total: 0

    },
    {
        id: 2,
        title: "Minion Rock",
        img: s3_source + produtos[1],
        price: 105.90,
        company: "Funko",
        info: "Dimensões: 12x16x10 cm Peso: 150g Produto: Pop! Pet Rock Otto: Minions 2 #903 - Funko",
        inCart: false,
        count: 0,
        total: 0

    },
    {
        id: 3,
        title: "Minion de Patins",
        img: s3_source + produtos[2],
        price: 108.90,
        company: "Funko",
        info: "Dimensões: 12x16x10 cmPeso: 150g Produto: Pop! Roller Skating Stuart: Minions 2 #902 - Funko",
        inCart: false,
        count: 0,
        total: 0

    },
    {
        id: 4,
        title: "Minion Kung Fu",
        img: s3_source + produtos[3],
        price: 87.90,
        company: "Funko",
        info: "Dimensões: 12x16x10 cm\nPeso: 150g\nProduto: Pop! Kung Fu Kevin: Minions 2 #904 - Funko",
        inCart: false,
        count: 0,
        total: 0

    },
    {
        id: 5,
        title: "Minion Anos 70",
        img: s3_source + produtos[4],
        price: 126.90,
        company: "Funko",
        info: "Dimensões: 12x16x10 cm\nPeso: 150g\nProduto: Pop! '70s Bob: Minions 2 #901 - Funko",
        inCart: false,
        count: 0,
        total: 0

    },
];

export const DetailProduct = {
    id: 1,
    title: "MinionDetail",
    img: s3_source + produtos[4],
    price: 189.90,
    company: "Funko",
    info: "Dimensões: 12x16x10 cm\nPeso: 150g\nProduto: Pop! Bob de Pijama: Minions 2 #905 - Funko",
    inCart: false,
    count: 0,
    total: 0


};