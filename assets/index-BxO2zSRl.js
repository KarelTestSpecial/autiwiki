(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const f=document.getElementById("app");let s=[],h={};function m(){window.addEventListener("hashchange",d),d()}function d(){const i=window.location.hash.substring(1);f.innerHTML=`
        <header>
            <h1><a href="#">AutiWiki</a></h1>
        </header>
        <div class="container">
            <nav id="sidebar"></nav>
            <main id="content"></main>
        </div>
    `;const t=document.getElementById("sidebar"),r=document.getElementById("content");t.innerHTML=u(s);const o=l(s,i);o?b(r,o):(p(r),i&&(window.location.hash=""))}function p(i){i.innerHTML=`
        <h2>Welkom</h2>
        <p>Dit is een interactieve woordenlijst gebaseerd op het "Werkboek rond Autisme".</p>
        <p>Kies een term uit het menu om de beschrijving en bijbehorende citaten te bekijken.</p>
    `}function b(i,t){const o=a(s,t.id).map(n=>`<a href="#${n.id}">${n.name}</a>`).join(" / ");let e="<h3>Citaten</h3>";if(t.quotes&&t.quotes.length>0){e+='<div class="quotes-list">';for(const n of t.quotes){const c=h[n];c&&(e+=`
                    <blockquote class="quote-card">
                        <p>${c.text.replace(/\n/g,"<br>")}</p>
                        <footer>— ${c.source}</footer>
                    </blockquote>
                `)}e+="</div>"}else e+="<p>Geen citaten gevonden voor deze term.</p>";i.innerHTML=`
        <div id="breadcrumbs">${o}</div>
        <h2>${t.name}</h2>
        <div class="term-content">
            ${e}
        </div>
    `}function u(i){if(!i||i.length===0)return"";let t="<ul>";for(const r of i)t+=`<li><a href="#${r.id}">${r.name}</a>`,r.children&&r.children.length>0&&(t+=u(r.children)),t+="</li>";return t+="</ul>",t}function l(i,t){if(!i)return null;for(const r of i){if(r.id===t)return r;if(r.children){const o=l(r.children,t);if(o)return o}}return null}function a(i,t,r=[]){if(!i)return null;for(const o of i){const e=[...r,{id:o.id,name:o.name}];if(o.id===t)return e;if(o.children){const n=a(o.children,t,e);if(n)return n}}return null}m();
