<template>
  <Layout>
    <div class="about">
      <h1>Sobre</h1>
      <div v-if="$page.about.content" v-html="$page.about.content" />
      <!-- <p>
        A Rede Moinho é uma
        <a
          href="http://cnsig.info/assets/documento-final_CLRC-2018.pdf"
          target="_blank"
        >rede comunitária</a>
        de iniciativa dos próprios moradores do povoado do Moinho, localizado no
        município de Alto Paraíso de Goiás.
      </p>
      <v-flex xs12>
      <v-img :src="require('~/assets/mapa_rede.jpeg')" class="my-3" contain></v-img>
    </v-flex>
    <p>
      Os primeiros experimentos em conectar vizinhos começaram em 2017. Em 2018
      com apoio da comunidade do
      <a
        href="http://scuttlebutt.nz/"
        target="_blank"
      >Secure Scuttlebutt</a>
      fizemos a compra de equipamentos para extender a rede e para enviar nosso
      técnico para um treinamento em redes em malha (mesh) junto ao coletivo
      <a
        href="https://altermundi.net"
      >AlterMundi</a> em Jose de la Quintana na
      Argentina.
    </p>
    <v-flex xs12>
      <v-img :src="require('~/assets/primeira_instalacao.jpeg')" class="my-3" contain></v-img>
    </v-flex>
    <p>
      Desde então nossa rede passou por vários altos e baixos, chegando a
      atender até 15 residências no povoado, porém caíndo em desuso a medida que
      os provedores de Internet foram melhorando seus serviços, preços e
      alcance. Por isso hoje estamos focados em desenvolver serviços locais para
      que tenha um fortalecimento, e não afastamento, da comunidade com a
      conectividade digital.
    </p>
    <v-flex xs12>
      <v-img :src="require('~/assets/instalacao.jpg')" class="my-3" contain></v-img>
    </v-flex>
    <v-flex xs12>
      <v-img :src="require('~/assets/torre_morro.jpeg')" class="my-3" contain></v-img>
    </v-flex>
    <p>
      Tivemos participação na
      <a
        href="http://cnsig.info/cumbre/lac/2018/09/17/Cumbre-Latinoamericana.html"
      >Primeira</a>
      quanto na
      <a
        href="http://cnsig.info/cumbre/lac/2019/09/25/Cumbre-Latinoamericana-de-Redes-Comunitarias-2019.html"
      >Segunda</a>
      Cúpula Latino-Americana de Redes Comunitárias (Argentina e Colômbia).
      Também participamos de projetos com com vários coletivos da América Latina
      através do projeto ORCAL, financiado pela
      <a
        href="https://www.apc.org/"
      >APC</a>. Nossa comunidade é uma base de
      testes para o
      <a
        href="https://librerouter.org/"
      >Libre Router</a>, o
      portal-captivo para redes em malha, Pirania, o atualizador automático de
      firmware
      <a
        href="https://github.com/luandro/lime-updater"
      >Lime-Updater</a>, além
      de iniciativas de serviços e aplicativos locais.
    </p>
    <v-flex xs12>
      <v-img :src="require('~/assets/libre_router_1.jpeg')" class="my-3" contain></v-img>
    </v-flex>
    <v-flex xs12>
      <v-img :src="require('~/assets/libre_router_2.jpg')" class="my-3" contain></v-img>
    </v-flex>
    <v-flex xs12>
      <v-img :src="require('~/assets/pirania.jpeg')" class="my-3" contain></v-img>
      </v-flex>-->
      <v-footer>
        <span>
          Criado com ❤ por
          <a href="//www.github.com/moinhodigital">Moinho Digital</a>.
        </span>
      </v-footer>
    </div>
  </Layout>
</template>

<page-query>
query {
  about(path: "/content/sobre/") {
    content
  }
}
</page-query>

<style scoped>
h1 {
  padding-bottom: 5vh;
}
.about {
  max-width: 968px;
  margin: 0 auto;
  padding: 5vh 5vw;
}
</style>
