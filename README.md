# Portal Comunitário

## Instalação
Vai precisar ter NodeJS maior que versão 12 instalado. Se não tiver use o [NVM](https://github.com/nvm-sh/nvm) para instalar.

## Uso

Primeiro clone o projeto com: `git clone https://github.com/MoinhoDigital/community-portal.git`.

Use `cp example.env .env` para gerar o arquivo de configuração para portal da sua comunidade. Você precisar de uma [chave de acesso do Mapbox](https://docs.mapbox.com/help/tutorials/get-started-tokens-api/) para exibir o mapa.

Depois instala e rode o projeto:
```
npm install
npm run dev
```

O aplicativo em ambiente de desenvolvimento estará disponível em <a href="http://localhost:8080">http://localhost:8080</a>.

Uma interface da API [GraphQL](https://graphql.org/) vai estar disponível em: <a href="http://localhost:8080/___explore">http://localhost:8080/___explore</a>.

### TODO: documentar download de mapas offline

## Build

Rodando `npm run build` cria uma pasta `dist` que contém todos arquivos estáticos para rodar o portal.

## Docker

Copie e modifique o arquivo `.env` e crie uma imagem do docker:
```
docker build -t portal-comunitario .
```

Depois rode:
```
docker run --name portal-comunitario \
  -p 8080:8080 \
  -d \
  portal-comunitario
```
O aplicativo em estará disponível em  <a href="http://localhost:8080">http://localhost:8080</a>.
