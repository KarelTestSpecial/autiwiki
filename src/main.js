
import './style.css';
import glossaryData from './glossary.json';
import quotesData from './quotes.json';

const app = document.getElementById('app');
let glossary = [];
let quotes = {};

// --- Initialization ---
function init() {
    window.addEventListener('hashchange', renderPage);
    renderPage(); // Initial render
}

// --- Rendering Logic ---
function renderPage() {
    const termId = window.location.hash.substring(1);

    // Create main layout
    app.innerHTML = `
        <header>
            <h1><a href="#">AutiWiki</a></h1>
        </header>
        <div class="container">
            <nav id="sidebar"></nav>
            <main id="content"></main>
        </div>
    `;

    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    // Always render the navigation
    sidebar.innerHTML = createNavHtml(glossary);

    // Render content based on hash
    const term = findTermById(glossary, termId);

    if (term) {
        renderTermDetail(content, term);
    } else {
        renderHomePage(content);
        if (termId) {
            window.location.hash = ''; // Clear invalid hash
        }
    }
}

function renderHomePage(contentElement) {
    contentElement.innerHTML = `
        <h2>Welkom</h2>
        <p>Dit is een interactieve woordenlijst gebaseerd op het "Werkboek rond Autisme".</p>
        <p>Kies een term uit het menu om de beschrijving en bijbehorende citaten te bekijken.</p>
    `;
}

function renderTermDetail(contentElement, term) {
    const breadcrumbs = generateBreadcrumbs(glossary, term.id);
    const breadcrumbsHtml = breadcrumbs.map(b => `<a href="#${b.id}">${b.name}</a>`).join(' / ');

    let quotesHtml = '<h3>Citaten</h3>';
    if (term.quotes && term.quotes.length > 0) {
        quotesHtml += '<div class="quotes-list">';
        for (const quoteId of term.quotes) {
            const quote = quotes[quoteId];
            if (quote) {
                quotesHtml += `
                    <blockquote class="quote-card">
                        <p>${quote.text.replace(/\n/g, '<br>')}</p>
                        <footer>— ${quote.source}</footer>
                    </blockquote>
                `;
            }
        }
        quotesHtml += '</div>';
    } else {
        quotesHtml += '<p>Geen citaten gevonden voor deze term.</p>';
    }

    contentElement.innerHTML = `
        <div id="breadcrumbs">${breadcrumbsHtml}</div>
        <h2>${term.name}</h2>
        <div class="term-content">
            ${quotesHtml}
        </div>
    `;
}

// --- HTML Generation ---
function createNavHtml(terms) {
    if (!terms || terms.length === 0) {
        return ''; // Return empty string if no terms
    }
    let html = '<ul>';
    for (const term of terms) {
        html += `<li><a href="#${term.id}">${term.name}</a>`;
        if (term.children && term.children.length > 0) {
            html += createNavHtml(term.children);
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}

// --- Utility Functions ---
function findTermById(terms, id) {
    if (!terms) return null;
    for (const term of terms) {
        if (term.id === id) return term;
        if (term.children) {
            const found = findTermById(term.children, id);
            if (found) return found;
        }
    }
    return null;
}

function generateBreadcrumbs(terms, id, path = []) {
    if (!terms) return null;
    for (const term of terms) {
        const newPath = [...path, { id: term.id, name: term.name }];
        if (term.id === id) {
            return newPath;
        }
        if (term.children) {
            const foundPath = generateBreadcrumbs(term.children, id, newPath);
            if (foundPath) {
                return foundPath;
            }
        }
    }
    return null;
}

// --- Start the App ---
init();
