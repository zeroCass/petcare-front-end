# Implementação do trabalho final para disciplina de Banco de Dados (Unb)
Disclaimer: Esse repositório ficou mais de 2 anos sem alterações e agora estou revisitando-o. Portanto, muitos erros e gambiarras foram feito no código base, principalmente pela falta de experiência e pouco conehcimento 
a respeito de programação no geral na época que esse trabalho feito implementado. Futuras atualizações que serão realizadas nesse repositório serão apenas para melhorar um pouco a usabilidade e não para total refatoração.

## Requesitos para rodar
Para evitar conflitos e dores de cabeça na hora de rodar esse proejeto, eu recomendo seguir a risca as versões necessárias das seguintes tecnologias:
- [Java v17](https://jdk.java.net/archive/)
- [Nodev16](https://nodejs.org/en/blog/release/v16.16.0)



# TODO
## Attendat
### Tela do Cliente

- [ ] Na tela de Clientes, deve-se listar todos os clientes cadastrados. Caso não tenha, informar
- [ ] Deve-se criar um componente do tipo item para ser possível selecionar um Cliente da lista de clientes
- [ ] Alterar a forma como o search de clientes é feito. Autalmente o search vai para a tela de edição do cliente automaticamente quando é encontrado. O comportamento esperado é o seguinte: ao dar search por CPF, o componente de item deve ser listado e o usuario deve clicar nesse componente para ir então para
      a tela de edição de cliente
- [ ] O botão Pets no BottonTab deve listar todos os pets cadastrados. Caso não tenha, informar
- [ ] O botão Pets no BottonTab na tela de Dados do Cliente, deve ser renomeado para Pets do Cliente

## Tela de Criação de Consulta

- [ ] Colocar um botão SELECIONAR PET (igual ao SELECIONAR VETERINARIO), na qual um modal é aberto, onde será listado todos os pets. O usuario pode pesquisar um PET por seu nome. Além disso, o usuario seleciona o pet e suas informações devem ser preenchidas nos items cadastrais nessa tela (ID, nome e raça)
- [ ] O modal de SELECIOANR VETERINARIO deve ser atualizado: Deve listar todos os veterinarios, além de permitir as funções básicas já implementdas, como filtragem por nome e selecionar apenas um veternario para que seus dados sejam preechidos na tela de criação de consulta
