export interface Pedido {
    id: string;
    numeroIdentificacao: string;
    endereco: string;
    dataentrega: string;
    pedidosProdutos: PedidoProduto[]
}

export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    valor: string;
}

export interface Encomenda {
    id: string;
    pedido: Pedido;
    equipe: Equipe;
}



export interface Equipe {
    id: string;
    nome: string;
}

export interface PedidoProduto {
    produto: Produto;
}