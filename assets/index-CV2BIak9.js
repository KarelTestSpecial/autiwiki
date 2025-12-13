(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const l=document.getElementById("app");let a=[],u={},f={};async function g(){try{const[n,e,o]=await Promise.all([fetch("glossary.json"),fetch("quotes.json"),fetch("explanations.json")]);a=await n.json(),u=await e.json(),f=await o.json(),window.addEventListener("hashchange",d),d()}catch(n){console.error("Failed to load data:",n),l.innerHTML="<p>Error: Kon de benodigde data niet laden. Probeer het later opnieuw.</p>"}}function d(){const n=decodeURIComponent(window.location.hash.substring(1));l.innerHTML=`
        <header>
            <h1><a href="#">AutiWiki</a></h1>
        </header>
        <div class="container">
            <nav id="sidebar"></nav>
            <main id="content"></main>
        </div>
    `;const e=document.getElementById("sidebar"),o=document.getElementById("content");e.innerHTML=h(a);const i=m(a,n);i?v(o,i):(b(o),n&&(window.location.hash=""))}function b(n){n.innerHTML=`
        <h2>Welkom</h2>
        <p>Dit is een interactieve woordenlijst gebaseerd op het "Werkboek rond Autisme".</p>
        <p>Kies een term uit het menu om de beschrijving en bijbehorende citaten te bekijken.</p>
    `}function v(n,e){const i=p(a,e.id).map(s=>`<a href="#${s.id}">${s.name}</a>`).join(" / ");let t="";const r=f[e.id];if(e.quotes&&e.quotes.length>0){t+='<h3>Citaten</h3><div class="quotes-list">';for(const s of e.quotes){const c=u[s];c&&(t+=`
                    <blockquote class="quote-card">
                        <p>${c.text.replace(/\n/g,"<br>")}</p>
                        <footer>— ${c.source}</footer>
                    </blockquote>
                `)}t+="</div>"}else r?t+=`
            <h3>Verheldering</h3>
            <p class="explanation-text">${r}</p>
        `:t+="<p>Geen citaten of verhelderende tekst gevonden voor deze term.</p>";n.innerHTML=`
        <div id="breadcrumbs">${i}</div>
        <h2>${e.name}</h2>
        <div class="term-content">
            ${t}
        </div>
    `}function h(n){if(!n||n.length===0)return"";let e="<ul>";for(const o of n)e+=`<li><a href="#${o.id}">${o.name}</a>`,o.children&&o.children.length>0&&(e+=h(o.children)),e+="</li>";return e+="</ul>",e}function m(n,e){if(!n)return null;for(const o of n){if(o.id===e)return o;if(o.children){const i=m(o.children,e);if(i)return i}}return null}function p(n,e,o=[]){if(!n)return null;for(const i of n){const t=[...o,{id:i.id,name:i.name}];if(i.id===e)return t;if(i.children){const r=p(i.children,e,t);if(r)return r}}return null}g();
