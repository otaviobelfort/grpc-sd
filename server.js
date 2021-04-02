const PROTO_PATH = "./delivery.proto";

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).deliv;

const bd = [
    {
        
        nome: "Pizza Calabreza",
        preco: 30.00,

    },
];

// dados do cardapio
const bd_massa = [
    {
        nome: "Mini Pizza Calabreza",
        preco: 5.0,
    },
    {
        nome: 'Pastel Carne Seca',
        preco: 6.0,
    },
    {
        nome: "Pastel Queijo",
        preco: 5.0,
    },
    {
        nome: "Churrus",
        preco: 3.0,
    },
    {
        nome: "Bomba",
        preco: 7.0,
    },
    {
        nome: "Torta de chocolate",
        preco: 10.0,
    },
    
];
const bd_bebida = [
    {
        nome: "Refrigerante Guaraná Jesus - 2L",
        preco: 8.0,
    },
    {
        nome: 'Refrigerante Coca Cola',
        preco: 10.0,
    },
    {
        nome: "Suco de Abacaxi",
        preco: 10.0,
    },
    {
        nome: "Suco de Cupu",
        preco: 10.0,
    },
];
var bd_pedido = [];


const server = new grpc.Server();

server.addService(protoDescriptor.Delivery.service, {
    // retorna o cartapio do banco de dados
    ConsultarMassas: function(call, callback) {
        callback(null, { massas: bd_massa });
    },
    ConsultarBebidas: function(call, callback) {
        callback(null, { bebidas: bd_bebida });
    },
    ConsultarPedidos: function(call, callback) {
        callback(null, { pedidos: bd_pedido });
    },
    
    // cadastro
    CadastrarMassa: function(call, callback) {
        const massa = call.request.massa;

        bd_pedido.push(massa);

        callback(null, {});
    },
    CadastrarBebida: function(call, callback) {
        const bebida = call.request.bebida;

        bd_bebida.push(bebida);

        callback(null, {});
    },
    PedidoDeBebida: function(call, callback) {
        const bebida = call.request.bebida;

        bd_pedido.push(bebida);

        callback(null, {});
    },
    EntregarPedido: function(call, callback) {
        const entrega = call.request.entrega;
        var ent = entrega;
        bd_pedido[bd_pedido.length] = entrega;
        //console.log(ent);
        
        Array.prototype.push.apply(bd_pedido, entrega);
        // bd_pedido.Array.prototype.push(entrega);
       //  console.log(bd_pedido);

        callback(null, {});
    }

    /*,
    CadastrarPedidos: function(call, callback) {
        const pedido = call.request.pedido;

        bd.push(pedido);
        callback(null, {});
    }
    */

});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

console.log("Iniciando servidor gRPC...");

server.start();