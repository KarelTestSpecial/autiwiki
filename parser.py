
import re
import json

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract glossary section
    glossary_match = re.search(r'# Woordenlijst {#woordenlijst}(.*?)# Slot {#slot}', content, re.DOTALL)
    if not glossary_match:
        print("Error: Could not find glossary section.")
        return None, None
    glossary_content = glossary_match.group(1)

    # Split the content by term headings, keeping the headings
    # A term heading starts with 3 or more '#'
    parts = re.split(r'(\n#{3,}\s+.*?\s*{#.*?}\s*\n)', glossary_content)

    if len(parts) < 2:
        print("Error: No terms found in glossary.")
        return None, None

    # The first part is any text before the first term, we can discard it.
    # After that, the list alternates between heading and content for that heading.
    headings = parts[1::2]
    contents = parts[2::2]

    quotes = {}
    flat_glossary = []

    unique_quotes_text = {}

    for heading, content_block in zip(headings, contents):
        heading = heading.strip()

        # FIX: Remove the heading markup itself before matching
        clean_heading = re.sub(r'#{3,}\s*', '', heading)

        match = re.match(r'(.*?)\s*{#(.+?)}', clean_heading)
        if not match:
            continue

        term_name = match.group(1).strip().replace('*', '')
        term_id = match.group(2).strip()
        level = heading.count('#')

        # Extract quotes from the content block for this term
        entry_quotes = []
        quote_matches = re.findall(r'######\s+(.*?)\n(.*?)(?=\n######|$)', content_block, re.DOTALL)

        for source, text in quote_matches:
            quote_text = text.strip()
            if quote_text in unique_quotes_text:
                quote_id = unique_quotes_text[quote_text]
                entry_quotes.append(quote_id)
            else:
                new_id = len(quotes) + 1
                quotes[new_id] = {'text': quote_text, 'source': source.strip()}
                unique_quotes_text[quote_text] = new_id
                entry_quotes.append(new_id)

        flat_glossary.append({
            'id': term_id,
            'name': term_name,
            'level': level - 3,  # Level 0 for '###'
            'quotes': entry_quotes,
            'children': []
        })

    # Build the hierarchy from the flat list
    structured_glossary = []
    parent_stack = []

    for term in flat_glossary:
        level = term['level']

        while parent_stack and parent_stack[-1][0] >= level:
            parent_stack.pop()

        if not parent_stack:
            structured_glossary.append(term)
        else:
            parent_node = parent_stack[-1][1]
            parent_node['children'].append(term)

        parent_stack.append((level, term))

    return structured_glossary, quotes

if __name__ == '__main__':
    glossary_data, quotes_data = parse_markdown('autiwiki-nl.md')

    if glossary_data is not None and quotes_data is not None:
        # NOTE: The JSON files are now being placed in the `public` directory
        # to be correctly handled by Vite's build process.
        with open('public/glossary.json', 'w', encoding='utf-8') as f_glossary:
            json.dump(glossary_data, f_glossary, indent=2, ensure_ascii=False)

        with open('public/quotes.json', 'w', encoding='utf-8') as f_quotes:
            json.dump(quotes_data, f_quotes, indent=2, ensure_ascii=False)

        print("Parsing complete. glossary.json and quotes.json have been created in the public/ directory.")
    else:
        print("Could not parse the markdown file.")
