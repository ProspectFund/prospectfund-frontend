<template>
  <div id="app">
  <div class="container">
    <div class="terminal-nav">
      <header class="terminal-logo">
        <div class="logo terminal-prompt"><router-link to="/" class="no-style">Prospect</router-link></div>
      </header>
      <nav class="terminal-menu">
        <ul vocab="https://schema.org/" typeof="BreadcrumbList">
          <li property="itemListElement" typeof="ListItem">
            <router-link to="/wallet" property="item" typeof="WebPage" :class="`menu-item ${$route.fullPath === '/wallet' ? 'active' : ''}`"><span property="name">Wallet</span></router-link>
            <meta property="position" content="1"></li>
          <li property="itemListElement" typeof="ListItem">
            <router-link to="/mine" property="item" typeof="WebPage" :class="`menu-item ${$route.fullPath === '/mine' ? 'active' : ''}`"><span property="name">Mine</span></router-link>
            <meta property="position" content="2"></li>
          <li property="itemListElement" typeof="ListItem">
            <router-link to="/dao" property="item" typeof="WebPage" :class="`menu-item ${$route.fullPath === '/dao' ? 'active' : ''}`"><span property="name">Governance</span></router-link>
            <meta property="position" content="3">
          </li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
  </div>
</template>
