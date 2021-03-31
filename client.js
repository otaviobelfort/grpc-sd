const PROTO_PATH = "./delivery.proto";
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');
const { strict } = require('assert');

// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});

// aplicação do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).deliv;

const client = new protoDescriptor.Delivery("127.0.0.1:50051", grpc.credentials.createInsecure());

function AddMassa(){

    client.CadastrarMassa({
        massa: {
            nome: "Pizza De Frango",
            preco: 35.00,
        },
    }, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro cadastrando da massa!");
            console.log(err);
            return;
        }

        console.log("Massa cadastrada com sucesso!");

        
    });

}


function AddBebida(){

    client.CadastrarBebida({
        bebida: {
            nome: "Refrigerante Raver",
            preco: 5.00,
        },
    }, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro cadastrando da bebida!");
            console.log(err);
            return;
        }

        console.log("Bebida cadastrada com sucesso!");

        
    });

}

//cCadastrarMassa();

// retorna o cardaṕio completo
function Cardapio(){
    client.ConsultarMassas({}, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro na consulta!");
            console.log(err);
            return;
        }

        const massas = response.massas;

        console.log("----- Massas -----");
        console.log(massas);
    });

    client.ConsultarBebidas({}, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro na consulta!");
            console.log(err);
            return;
        }

        const bebidas = response.bebidas;

        console.log("----- Bebidas -----");
        console.log(bebidas);
    });


}

// adicionar um pedido
function AddPedidos(){

    client.CadastrarMassa({
        massa: {
            nome: "Pizza De Frango",
            preco: 35.00,
        },
    }, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro cadastrando da massa!");
            console.log(err);
            return;
        }

        console.log("Massa cadastrada com sucesso!");

        
    });    

    client.PedidoDeBebida({
        bebida: {
            nome: "Refrigerante Raver",
            preco: 5.00,
        },
    }, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro cadastrando da bebida!");
            console.log(err);
            return;
        }

        console.log("Bebida cadastrada com sucesso!");

        
    });

}

// adiciona uma solicitação de entrega
function AddEntrega(){
    client.EntregarPedido({
        endereco: {
            endereco: "Av. dos Postugueses., nº 2000.",
            cliente: "Otávio Belfort",
            preco: "10.0",
        },
    }, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro na solicitação de entrega!");
            console.log(err);
            return;
        }

        console.log("Entrega adicionada ao pedido!");

        
    });

}

// Mostra a lista de pedidos
function Pedidos(){
    client.ConsultarPedidos({}, (err, response) => {
        if (err != null) {
            console.log(" >>> Ocorreu um erro na consulta!");
            console.log(err);
            return;
        }

        const pedidos = response.pedidos;

        console.log("----- Pedidos -----");
        console.log(pedidos);
    });

}

rl.addListener("line", line => {
    switch (line.toLocaleUpperCase()){
        case "CARDAPIO":
            Cardapio();
            break
        case "ADD PEDIDO":
            AddPedidos();
            break;
        case "PEDIDOS":
            Pedidos();
            break;
        case "ENTREGA":
            AddEntrega();
            break;
        default:
            console.log("Comando >> " + line.toLocaleUpperCase())


    }
});



