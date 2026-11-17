"""Validate raw HTML without executing JavaScript; no third-party dependencies."""
import argparse
import json
from pathlib import Path
from html.parser import HTMLParser

class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
    def text(self):
        return ''.join(child if isinstance(child, str) else child.text() for child in self.children if isinstance(child, str) or child.tag not in ('script', 'style'))
    def find(self, tag=None, **attrs):
        result = [self] if (tag is None or self.tag == tag) and all(self.attrs.get(k) == v for k, v in attrs.items()) else []
        return result + [node for child in self.children if isinstance(child, Node) for node in child.find(tag, **attrs)]

class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node(); self.current = self.root; self.feed(html)
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.current); self.current.children.append(node)
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'): self.current = node
    def handle_endtag(self, tag):
        node = self.current
        while node.parent:
            if node.tag == tag: self.current = node.parent; return
            node = node.parent
    def handle_data(self, data): self.current.children.append(data)

def read(path): return Document(Path(path).read_text(encoding='utf-8-sig')).root
def seo(root):
    return {'title':root.find('title')[0].text(), 'h1':[n.text() for n in root.find('h1')], 'description':root.find('meta',name='description')[0].attrs['content']}
def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--root',default='out'); parser.add_argument('--baseline',default='.qa/finishing'); args=parser.parse_args()
    baseline=read(Path(args.baseline)/'before-home.html')
    home=read(Path(args.root)/'index.html')
    assert seo(home)==seo(baseline), 'Homepage title/H1/description changed'
    old=baseline.find(**{'data-home-content':'true'})[0]
    new=home.find(**{'data-home-content':'true'})[0]
    assert new.text()==old.text(), 'Homepage editorial copy changed'
    paragraph=[n for n in new.find('p') if 'For names and signs, try the ' in n.text()]
    assert len(paragraph)==1 and paragraph[0].text()==[n for n in old.find('p') if 'For names and signs, try the ' in n.text()][0].text()
    assert any(a.attrs.get('href')=='/bubble-letter-font-generator/' and a.text()=='bubble letter generator' for a in paragraph[0].find('a'))
    article=read(Path(args.root)/'articles/bubble-font-generator-vs-bubble-letter-font-generator/index.html')
    section=article.find('section',id='which-one-to-use')[0]
    assert len([a for a in section.find('a') if a.attrs.get('href')=='/bubble-letter-font-generator/' and a.text()=='bubble letter font generator'])==1
    expected={
      'style-pages':['/','/printable-bubble-letters/','/bubble-letters-font/','/bubble-font-generator-png/','/transparent-bubble-font-generator/','/bubble-letter-font-generator/','/bubble-graffiti-font-generator/'],
      'guides':['/articles/what-is-bubble-font/','/articles/how-to-make-bubble-letters/','/articles/bubble-font-generator-vs-bubble-letter-font-generator/','/articles/free-bubble-font-generator/']}
    for route in ['', 'bubble-letter-font-generator']:
        root=read(Path(args.root)/route/'index.html'); main=root.find('main')[0]
        for group, hrefs in expected.items():
            blocks=main.find('section',**{'data-explore-group':group})
            assert len(blocks)==1, f'{route or "/"}: missing {group} in main HTML'
            assert [a.attrs['href'] for a in blocks[0].find('a')]==hrefs, f'Wrong links in {group}'
            assert len(blocks[0].find('p'))==len(hrefs), 'Each link needs one description'
        buttons=main.find('button',**{'data-ai-assist-toggle':'true'})
        assert len(buttons)==1 and buttons[0].attrs.get('aria-expanded')=='false'
        assert 'Pick a template, then describe the change' in buttons[0].text()
        assert not main.find('input',placeholder='cute pink sticker'), 'AI form must not render initially'
        assert not main.find('select',**{'aria-label':'Choose an AI assist template'})
        assert not [b for b in main.find('button') if b.text().strip()=='Apply AI Assist']
    print(json.dumps({'seoDiff':{},'homeCopyUnchanged':True,'bodyLinks':'passed','mainStylePages':7,'mainGuides':4,'initialAssistCollapsed':True},indent=2))

if __name__=='__main__': main()
