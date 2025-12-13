
import json

def find_empty_terms_recursive(terms, empty_list):
    """Recursively finds terms with no quotes."""
    for term in terms:
        # Check if the 'quotes' list is empty
        if not term.get('quotes'):
            empty_list.append({
                'id': term['id'],
                'name': term['name']
            })

        # Recurse into children
        if term.get('children'):
            find_empty_terms_recursive(term['children'], empty_list)

def main():
    """Main function to load data and find empty terms."""
    try:
        with open('public/glossary.json', 'r', encoding='utf-8') as f:
            glossary_data = json.load(f)

        empty_terms = []
        find_empty_terms_recursive(glossary_data, empty_terms)

        print("De volgende termen hebben geen citaten:")
        for term in empty_terms:
            print(f"- ID: {term['id']}, Naam: {term['name']}")

        # Save the list to a file for the next step
        with open('empty_terms.json', 'w', encoding='utf-8') as f:
            json.dump(empty_terms, f, indent=2, ensure_ascii=False)

        print("\nLijst opgeslagen in empty_terms.json")

    except FileNotFoundError:
        print("Error: public/glossary.json niet gevonden.")
    except json.JSONDecodeError:
        print("Error: Kon public/glossary.json niet parsen.")

if __name__ == '__main__':
    main()
