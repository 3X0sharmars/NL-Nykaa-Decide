# Source Viability — final record

Every source attempted, what it cost, and what it yielded. Retrieval closed
2026-08-23 after Phase 1C.

| source | raw scanned | units retained | hit rate | relevance | status |
|---|---:|---:|---:|---:|---|
| Google Play reviews | 90,000 | 1,068 | 1.19% | 16.7% | **in corpus** |
| Apple App Store (both sorts) | 3,000 | 17 | 0.57% | 31.2% | staged, failed audit |
| SerpApi general web | 65 URLs | 38 | — | 6.7% | quarantined |
| reddit_discovery (SerpApi snippets) | 415 URLs | 0 usable | — | 6.7% | rejected: snippets, not evidence |
| **YouTube comments** | **2,313** | **3** | **0.13%** | 1/3 | **dry** |
| Reddit public JSON | — | 0 | — | — | HTTP 403 since May 2026 |
| Reddit Pushshift mirror | — | 0 | — | — | operator refuses agents |
| Reddit official API | — | 0 | — | — | app registration unanswered 1 month |
| Reddit via Apify | — | — | — | — | **blocked: no APIFY_TOKEN** |
| Quora / MouthShut / Trustpilot | — | 0 | — | — | HTTP 403 |
| Consumer complaint boards | 98 blocks | 0 | 0% | — | no wishlist content |

## The consistent finding

Eleven sources, three genres, ~95,000 items scanned. Every independent route
converges on the same result: **public commentary about *not* buying a saved
item barely exists.**

People write publicly when something is done *to* them — an app crashes, an
order is wrong, a refund is refused. Quietly not buying a saved dress wrongs
nobody, so it generates almost no public text. That absence is a finding about
the phenomenon, not a failure of retrieval effort.

## Phase 1C multi-token filter — measured result

Requiring the act plus its object ("in my wishlist") rather than the bare noun:

| | before | after |
|---|---:|---:|
| units | 1,069 | 228 (-79%) |
| gate-eligible | 800 | 178 |
| precision (n=30) | 16.7% | 20.0% |
| multi-step narrative | 6.9% | **4.4%** |

**It removes 79% of the corpus for 3.3 points of precision, and reduces journey
content.** 127 of the 228 survivors matched on "in my wishlist", which is itself
a feature-complaint idiom ("items in my wishlist go out of stock").

Four of the nine phrases matched **zero** units across all 1,069:

    saved it but · went to buy · still haven't bought · meant to buy

Those are precisely the non-conversion sentences. They are not rare in app
reviews — they are absent. The genre, not the filter, is the binding
constraint.

## YouTube, measured

2,313 comments across 64 videos and 8 behaviour-anchored queries returned
**3 units**, of which one is arguably on-target — and that one describes buying
jeans with siblings in a physical shop.

Comment sections are addressed to the creator, not to the reader's own purchase
history. The genre is reaction, not recollection.

One retained unit was Hinglish ("meri bhi bahut time se nazar hai ..it's in my
wishlist"), which incidentally confirms B8: English-only retrieval is excluding
real signal.
