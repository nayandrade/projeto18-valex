# projeto18-valex

# Rotas de criação e gerenciamento de cartões:

## Rota <span style="color:yellow"> **POST** </span>/cards

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é criar novos cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "employeeId": "id do funcionário", //number
  "type": "tipo do cartão" //string dos tipos "groceries" | "restaurant" | "transport" | "education" | "health"
}
```

## Rota <span style="color:orange"> **PUT** </span>/cards/

Essa é uma rota não autenticada. Sua função é ativar os cartões criados.

O "id" passado na rota é o id do cartão criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "securityCode": "cvv do cartao", //string
  "password": "senha escolhida", //string
  "number": "número impresso no cartão recebido pelo proprietário", //string
  "cardholderName": "nome impresso no cartão recebido pelo proprietário", //string
  "expirationDate": "data de expiração impressa no cartão recebido pelo proprietário" //string
}
```

## Rota <span style="color:green"> **GET** </span>/transactions/:id

Essa é uma rota não autenticada. Sua função é verificar o extrato dos cartões.

O "id" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```json
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

## Rotas <span style="color:orange"> **PUT** </span>/lock/:id e /unlock/:id

Rotas não autenticadas, mesmo funcionamento, com o intuito de permitir ao usuário respectivamente bloquear e desbloquear um cartão.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "password": "senha do cartão" //string
}
```

# Rotas de recarga:

## Rota <span style="color:yellow"> **POST** </span>/recharges

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é recarregar os cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "id": "id do cartão", //number
  "amount": "valor escolhido em centavos" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/payments

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

```json
{
  "cardId": "id do cartão", //number
  "businessId": "id do estabelecimento", //number
  "amount": "valor da compra em centavos", //number
  "password": "senha do cartão" //string
}
```
