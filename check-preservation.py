from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import hashlib
import re

root = Path(__file__).parent
out = root / '../../04_交付與輸出/regina-atelier'
class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.texts=[]; self.images=[]; self.links=[]; self.feed(html)
    def handle_data(self,data):
        value=data.strip()
        if value:self.texts.append(value)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='img':self.images.append(a.get('src'))
        if tag=='a':self.links.append(a.get('href'))
source_html=(root/'dist/index.html').read_text()
target_html=(out/'index.html').read_text()
# The user explicitly replaced the entire old price card with a webinar form.
source=Page(re.sub(r'<article class="enroll-card">.*?</article>', '', source_html, flags=re.S))
target=Page(re.sub(r'<article class="enroll-card webinar-card".*?</article>', '', target_html, flags=re.S))
approved = {
 '高價值客戶':['高價值客戶 · 變現業務力','一年後，還要繼續'],
 '變現業務力':'靠降價成交嗎？',
 '讓你的專業，':'別把下一年的努力，',
 '成為客戶選擇你的理由。':'再花在同樣的比價與追單。',
 '從追著客戶跑，到成為值得信任的高價值業務。':'今天沒說清楚的價值，可能就是明天流失的客戶。',
 '重新定位自己，用理解與信任，開啟長期成交的可能。':'跟著 Regina，從理解需求、建立信任開始，改變只剩價格能談的局面。',
 '明明已經很努力，':'再忙一年，',
 '為什麼還是這麼被動？':'就能擺脫現在的困局嗎？',
 '每天都在忙，卻感覺離理想的業務樣貌，還差了一步。':'如果方法沒有改變，忙碌可能只是在重複同一種消耗。',
 '兩天實體課程':'',
 'NT$19,800':'',
 '查看課程資訊 ↗':['報名線上說明會','↗'],
 '客戶記住的，':'當你還在解釋價格，',
 '除了商品，':'有人已經讓客戶',
 '還有':'',
 '值得信任的你。':'看懂價值。',
 '當你理解真正的需求，提出有依據的建議，':'面對同一位客戶，差別可能不在誰更努力，而在誰問出了真正的需求、說清楚了選擇的理由。',
 '每一次對話，都能成為建立信任的起點。':'你的專業，值得被看見，而不只是被拿來比較。',
 '讓專業被看見，':'別讓下一年的努力，',
 '也讓未來':'仍然困在',
 '多一點選擇。':'今年的問題裡。',
 '跟著 Regina，用兩天為下一階段的成長打下基礎。':'改變不必從推翻自己開始。先重新檢視一次對話、一份提案、一段客戶關係，找到值得調整的地方。',
 '從理解客戶、建立信任開始，重新整理你的銷售方式。':'用兩天，為接下來的每一步，建立更清楚的方法。',
 '帶領無數業務小白':'帶領業務小白',
 '年收入破 300 萬':'年收入破300萬',
}
expected=Counter(source.texts)
expected.update(['REGINA’S MASTERCLASS','高價值客戶','變現業務力','高若家 Regina'])
for old,new in approved.items():
    assert expected[old], f'Approved source copy missing: {old}'
    expected[old]-=1
    for value in (new if isinstance(new,list) else [new]):
        if value:expected[value]+=1
assert +expected==Counter(target.texts), f'Unexpected copy changes: {expected-Counter(target.texts)} / {Counter(target.texts)-expected}'
assert not (Counter(source.images)-Counter(target.images)), 'Missing image'
assert Counter(source.links)==Counter(target.links), 'Link changed'
assert 'class="price"' not in target_html and 'NT$' not in target_html, 'Price card remains'
assert '<h2>高價值客戶<br><strong>變現業務力</strong></h2>' in target_html
assert all(f'name="{field}"' in target_html for field in ['name','email','phone'])
assert not re.search(r'type="(?:date|datetime-local)"',target_html), 'Date must follow LINE'
assert '資料不會送出' in target_html and 'type="button" disabled>加入官方 LINE' in target_html, 'Preview must not imply real submission'
for p in (root/'dist/assets').iterdir():
    assert hashlib.sha256(p.read_bytes()).digest()==hashlib.sha256((out/'assets'/p.name).read_bytes()).digest(), p.name
print(f'PASS: Only {len(approved)} approved copy/spacing changes; remaining source text retained, {len(source.images)} original images, {len(source.links)} links, all image files byte-identical.')
