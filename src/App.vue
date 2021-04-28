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
            <router-link to="/app" property="item" typeof="WebPage" :class="`menu-item ${$route.fullPath === '/app' ? 'active' : ''}`"><span property="name">App</span></router-link>
            <meta property="position" content="1"></li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
  </div>
</template>
