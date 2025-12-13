(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const l=document.getElementById("app");let c=[],u={},f={};async function b(){try{const[t,e,o]=await Promise.all([fetch("glossary.json"),fetch("quotes.json"),fetch("explanations.json")]);c=await t.json(),u=await e.json(),f=await o.json(),g(),window.addEventListener("hashchange",d),d()}catch(t){console.error("Failed to load data:",t),l.innerHTML="<p>Error: Kon de benodigde data niet laden. Probeer het later opnieuw.</p>"}}function g(){l.innerHTML=`
        <header>
            <h1><a href="#">AutiWiki</a></h1>
        </header>
        <div class="container">
            <nav id="sidebar"></nav>
            <main id="content"></main>
        </div>
    `;const t=document.getElementById("sidebar");t.innerHTML=h(c)}function d(){const t=decodeURIComponent(window.location.hash.substring(1)),e=document.getElementById("content");if(!e)return;q(t);const o=m(c,t);o?y(e,o):(v(e),t&&(window.location.hash=""))}function v(t){t.innerHTML=`
        <h2>Welkom</h2>
        <p>Dit is een interactieve woordenlijst gebaseerd op het "Werkboek rond Autisme".</p>
        <p>Kies een term uit het menu om de beschrijving en bijbehorende citaten te bekijken.</p>
    `}function y(t,e){const i=p(c,e.id).map(s=>`<a href="#${s.id}">${s.name}</a>`).join(" / ");let n="";const r=f[e.id];if(r&&(n+=`
            <h3>Verheldering</h3>
            <div class="quotes-list">
                <blockquote class="quote-card">
                    <p>${r}</p>
                </blockquote>
            </div>
        `),e.quotes&&e.quotes.length>0){n+='<h3>Citaten</h3><div class="quotes-list">';for(const s of e.quotes){const a=u[s];a&&(n+=`
                    <blockquote class="quote-card">
                        <p>${a.text.replace(/\n/g,"<br>")}</p>
                        <footer>— ${a.source}</footer>
                    </blockquote>
                `)}n+="</div>"}!r&&(!e.quotes||e.quotes.length===0)&&(n+="<p>Geen citaten of verhelderende tekst gevonden voor deze term.</p>"),t.innerHTML=`
        <div id="breadcrumbs">${i}</div>
        <h2>${e.name}</h2>
        <div class="term-content">
            ${n}
        </div>
    `}function q(t){const e=document.getElementById("sidebar");if(!e)return;const o=e.querySelector("a.active");if(o&&o.classList.remove("active"),t){const i=e.querySelector(`a[href="#${t}"]`);i&&i.classList.add("active")}}function h(t){if(!t||t.length===0)return"";let e="<ul>";for(const o of t)e+=`<li><a href="#${o.id}">${o.name}</a>`,o.children&&o.children.length>0&&(e+=h(o.children)),e+="</li>";return e+="</ul>",e}function m(t,e){if(!t)return null;for(const o of t){if(o.id===e)return o;if(o.children){const i=m(o.children,e);if(i)return i}}return null}function p(t,e,o=[]){if(!t)return null;for(const i of t){const n=[...o,{id:i.id,name:i.name}];if(i.id===e)return n;if(i.children){const r=p(i.children,e,n);if(r)return r}}return null}b();
