"""Validate exported/production homepage HTML and reproducible keyword counts."""
import argparse
import difflib
import importlib
import json
import re
from pathlib import Path

html = importlib.import_module('check-finishing-html')


def visible_text(node):
    # Count English UI/editorial words, not scripts, SVG effect layers or editable samples.
    if node.tag in ('script', 'style', 'svg', 'textarea', 'input', 'template', 'noscript'):
        return ''
    children = node.children
    if node.tag == 'details' and 'open' not in node.attrs:
        children = [c for c in children if isinstance(c, html.Node) and c.tag == 'summary']
    if node.tag == 'select':
        options = node.find('option')
        children = [next((o for o in options if 'selected' in o.attrs), options[0])] if options else []
    return ' '.join(c if isinstance(c, str) else visible_text(c) for c in children)


def density(node):
    text = re.sub(r'\s+', ' ', visible_text(node)).strip().lower()
    words = re.findall(r"[a-z]+(?:['’-][a-z]+)*", text)
    exact = re.findall(r'\bbubble font generator\b', text)
    # Direct variants are explicit and identical for both before/after counts.
    variants = re.findall(r'\bbubble (?:fonts?|text|letters?(?: font)?) generators?\b', text)
    covered = sum(len(match.split()) for match in variants)
    return {'totalEnglishWords': len(words), 'exactPhraseOccurrences': len(exact),
            'exactPhraseCoveredWords': len(exact) * 3,
            'exactPhraseDensityPercent': round(len(exact) * 300 / len(words), 4),
            'phraseAndVariantOccurrences': len(variants), 'phraseAndVariantCoveredWords': covered,
            'densityPercent': round(covered * 100 / len(words), 4)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--html', default='out/index.html')
    parser.add_argument('--baseline', default='.qa/redesign-c/before-home.html')
    parser.add_argument('--output', default='.qa/redesign-c')
    args = parser.parse_args()
    old, new = html.read(args.baseline), html.read(args.html)
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    old_body = old.find(**{'data-home-content': 'true'})[0]
    new_body = new.find(**{'data-home-content': 'true'})[0]
    before = {**html.seo(old), 'editorialBodyAndFaq': old_body.text()}
    after = {**html.seo(new), 'editorialBodyAndFaq': new_body.text()}
    diff = ''.join(difflib.unified_diff(json.dumps(before, indent=2).splitlines(True),
                                      json.dumps(after, indent=2).splitlines(True),
                                      fromfile='before', tofile='after'))
    (output / 'seo-body.diff').write_text(diff, encoding='utf-8')
    assert not diff, 'Homepage SEO or editorial content changed; see seo-body.diff'
    assert after['h1'] == ['Bubble Font Generator']
    assert after['title'] == 'Bubble Font Generator - Free Bubble Letter PNG Maker'
    faqs = [(h.text(), h.parent.find('p')[0].text()) for h in new_body.find('h3')]
    assert len(faqs) == 5
    schemas = [json.loads(''.join(c for c in n.children if isinstance(c, str)))
               for n in new.find('script', type='application/ld+json')]
    faq_schema = next(j for j in schemas if j.get('@type') == 'FAQPage')
    assert [(q['name'], q['acceptedAnswer']['text']) for q in faq_schema['mainEntity']] == faqs
    assert not new_body.find('details'), 'Editorial/FAQ content must stay visible'
    paragraph = next(p for p in new_body.find('p') if 'For names and signs, try the ' in p.text())
    old_paragraph = next(p for p in old_body.find('p') if 'For names and signs, try the ' in p.text())
    assert paragraph.text() == old_paragraph.text()
    assert any(a.text() == 'bubble letter generator' and a.attrs.get('href') == '/bubble-letter-font-generator/' for a in paragraph.find('a'))

    links = {}
    for group, title, count in [('style-pages', 'Style Pages', 7), ('guides', 'Guides', 4)]:
        assert len([h for h in new.find('h2') if h.text() == title]) == 1
        blocks = new.find('section', **{'data-explore-group': group})
        assert len(blocks) == 1
        block = blocks[0]
        previous = old.find('main')[0].find('section', **{'data-explore-group': group})[0]
        links[group] = [(a.text(), a.attrs['href']) for a in block.find('a')]
        assert links[group] == [(a.text(), a.attrs['href']) for a in previous.find('a')]
        assert len(links[group]) == count
        assert [p.text() for li in block.find('li') for p in li.find('p')] == [p.text() for p in previous.find('p')]
    assert new.find('section', id='guides')
    copy = new.find('section', **{'aria-labelledby': 'copy-paste-heading'})[0]
    assert [label.text() for label in copy.find('label')] == ['Circled', 'Negative circled', 'Squared', 'Fullwidth', 'Parenthesized', 'Small caps']
    assert len([button for button in copy.find('button') if button.text() == 'Copy']) == 6
    results = new.find('section', **{'data-editor-results': 'true'})[0]
    cards = results.find('article')
    assert len(cards) == 12
    downloads = []
    for card in cards:
        font = card.attrs['data-font-card']
        assert card.find('span', **{'data-font-name': 'true'})
        hrefs = [a.attrs['href'] for a in card.find('a')]
        assert any(href.endswith('.ttf') for href in hrefs)
        assert f'/fonts/licenses/{font}.txt' in hrefs
        assert len(card.find('svg', role='img')) == 1
        downloads.append({'font': font, 'hrefs': hrefs})
    assert not new.find('input', placeholder='cute pink sticker')
    assert new.find('button', **{'data-ai-assist-toggle': 'true'})[0].attrs['aria-expanded'] == 'false'
    editor = new.find('div', **{'data-home-editor': 'true'})[0]
    children = [c for c in editor.children if isinstance(c, html.Node)]
    assert children.index(copy) < children.index(results)

    report = {'seoAndBodyDiff': diff, 'visibleFaqCount': len(faqs), 'faqSchemaMatches': True,
              'uniqueDiscoveryHeadings': True, 'links': links, 'initialFontCards': downloads,
              'copyStyles': 6, 'aiInitiallyCollapsed': True,
              'densityMethod': 'English words in initial visible body UI/content, excluding SVG effect layers, editable samples, scripts/styles and closed disclosure content. Only selected select option counted. Variants: bubble (font(s)|text|letter(s)[ font]) generator(s).',
              'before': density(old.find('body')[0]), 'after': density(new.find('body')[0]),
              'editorialBefore': density(old_body), 'editorialAfter': density(new_body)}
    (output / 'html-acceptance.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k not in ('links', 'initialFontCards')}, indent=2))


if __name__ == '__main__':
    main()
