
import './style.css';

const app = document.getElementById('app');
let glossary = [];
let quotes = {};
let explanations = {};

// --- Data Fetching and Initialization ---
async function init() {
    try {
        const [glossaryRes, quotesRes, explanationsRes] = await Promise.all([
            fetch('glossary.json'),
            fetch('quotes.json'),
            fetch('explanations.json')
        ]);
        glossary = await glossaryRes.json();
        quotes = await quotesRes.json();
        explanations = await explanationsRes.json();

        renderLayout();

        window.addEventListener('hashchange', renderContent);
        renderContent();
    } catch (error) {
        console.error("Failed to load data:", error);
        app.innerHTML = `<p>Error: Kon de benodigde data niet laden. Probeer het later opnieuw.</p>`;
    }
}

// --- Layout and Content Rendering ---
function renderLayout() {
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
    sidebar.innerHTML = createNavHtml(glossary);
}

function renderContent() {
    const termId = decodeURIComponent(window.location.hash.substring(1));
    const content = document.getElementById('content');

    if (!content) return;

    // Update active link in the sidebar
    updateActiveLink(termId);

    const term = findTermById(glossary, termId);

    if (term) {
        renderTermDetail(content, term);
    } else {
        renderHomePage(content);
        if (termId) {
           window.location.hash = '';
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

    let contentHtml = '';
    const explanation = explanations[term.id];

    // Display explanation if it exists
    if (explanation) {
        contentHtml += `
            <h3>Verheldering</h3>
            <div class="quotes-list">
                <blockquote class="quote-card">
                    <p>${explanation}</p>
                </blockquote>
            </div>
        `;
    }

    // Display quotes if they exist, even if they are empty
    if (term.quotes && term.quotes.length > 0) {
        contentHtml += '<h3>Citaten</h3><div class="quotes-list">';
        for (const quoteId of term.quotes) {
            const quote = quotes[quoteId];
            if (quote) {
                contentHtml += `
                    <blockquote class="quote-card">
                        <p>${quote.text.replace(/\n/g, '<br>')}</p>
                        <footer>— ${quote.source}</footer>
                    </blockquote>
                `;
            }
        }
        contentHtml += '</div>';
    }

    // Fallback message if no content is available at all
    if (!explanation && (!term.quotes || term.quotes.length === 0)) {
        contentHtml += '<p>Geen citaten of verhelderende tekst gevonden voor deze term.</p>';
    }

    contentElement.innerHTML = `
        <div id="breadcrumbs">${breadcrumbsHtml}</div>
        <h2>${term.name}</h2>
        <div class="term-content">
            ${contentHtml}
        </div>
    `;
}

// --- UI Logic ---
function updateActiveLink(termId) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Remove 'active' class from any previously active link
    const currentActive = sidebar.querySelector('a.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    // Add 'active' class to the new current link
    if (termId) {
        const newActive = sidebar.querySelector(`a[href="#${termId}"]`);
        if (newActive) {
            newActive.classList.add('active');
        }
    }
}


// --- HTML Generation ---
function createNavHtml(terms) {
    if (!terms || terms.length === 0) return '';
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
