(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const d=document.getElementById("app");let c=[],l={};async function m(){try{const[n,e]=await Promise.all([fetch("glossary.json"),fetch("quotes.json")]);c=await n.json(),l=await e.json(),window.addEventListener("hashchange",a),a()}catch(n){console.error("Failed to load data:",n),d.innerHTML="<p>Error: Kon de benodigde data niet laden. Probeer het later opnieuw.</p>"}}function a(){const n=window.location.hash.substring(1);d.innerHTML=`
        <header>
            <h1><a href="#">AutiWiki</a></h1>
        </header>
        <div class="container">
            <nav id="sidebar"></nav>
            <main id="content"></main>
        </div>
    `;const e=document.getElementById("sidebar"),o=document.getElementById("content");e.innerHTML=u(c);const i=f(c,n);i?g(o,i):(p(o),n&&(window.location.hash=""))}function p(n){n.innerHTML=`
        <h2>Welkom</h2>
        <p>Dit is een interactieve woordenlijst gebaseerd op het "Werkboek rond Autisme".</p>
        <p>Kies een term uit het menu om de beschrijving en bijbehorende citaten te bekijken.</p>
    `}function g(n,e){const i=h(c,e.id).map(r=>`<a href="#${r.id}">${r.name}</a>`).join(" / ");let t="<h3>Citaten</h3>";if(e.quotes&&e.quotes.length>0){t+='<div class="quotes-list">';for(const r of e.quotes){const s=l[r];s&&(t+=`
                    <blockquote class="quote-card">
                        <p>${s.text.replace(/\n/g,"<br>")}</p>
                        <footer>— ${s.source}</footer>
                    </blockquote>
                `)}t+="</div>"}else t+="<p>Geen citaten gevonden voor deze term.</p>";n.innerHTML=`
        <div id="breadcrumbs">${i}</div>
        <h2>${e.name}</h2>
        <div class="term-content">
            ${t}
        </div>
    `}function u(n){if(!n||n.length===0)return"";let e="<ul>";for(const o of n)e+=`<li><a href="#${o.id}">${o.name}</a>`,o.children&&o.children.length>0&&(e+=u(o.children)),e+="</li>";return e+="</ul>",e}function f(n,e){if(!n)return null;for(const o of n){if(o.id===e)return o;if(o.children){const i=f(o.children,e);if(i)return i}}return null}function h(n,e,o=[]){if(!n)return null;for(const i of n){const t=[...o,{id:i.id,name:i.name}];if(i.id===e)return t;if(i.children){const r=h(i.children,e,t);if(r)return r}}return null}m();
