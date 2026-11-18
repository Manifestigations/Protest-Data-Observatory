Producing this tool has required broad searches across a wide range of heterogenous datasets. It's been hard to find data for a lot of things; it's been harder to find trustworthy data; and it's even harder to draw conclusions from data that treat the same topic in slightly different ways.

For now, all of the research has been performed using LLM assistance (and then run through several cycles of LLM-assisted validation), but it has not been manually verified; I simply do not have the time. But I have architected the tool to divide the data from the code that produces the visualisations as much as possible. My hope is that I can crowd-source the verification, as well as the continued injection of both new data and amendments to previous data, so that the visualisations will improve over time.

But I would like to highlight some of the issues I have had with the data, and I suspect no amount of crowdsourced data entry and verification can really help with them.

---

## Injuries

The police are the only ones to publish official injury figures, but they make no distinction between: accidental & self-inflicted injuries, and those caused by protestors; nor the severity of injury. From [one leaked internal report](https://www.mediapart.fr/journal/france/131126/crs-blesses-le-fichier-interne-qui-degonfle-le-bilan-du-ministre), we know that as little as 5% of the figures that they bandy about in the press may actually amount to anything serious. Potentially a good way to enrich this would be to compare with figures for injury-related work stoppages, but I don't know when or where these might be published (and they would probably have to be compared against the non-uprising baseline to identify any excess).

On the other hand, no official figures for violence against protestor exists. Deaths are obviously pretty easy to verify, but the exact causes can be unclear. For injuries, the most reliable data is compiled by Prof. Laurent Thines, and provides the floor of verified serious injuries. Some local street medic groups publish accounts of how many people they treated after large protests, but many of these will be for relatively minor things like ‘gave saline to rinse out tear gas'; on the flipside, many people who receive saline or a Maalox squirt for the same thing won't be recorded; and the street medic landscape is very fragmented, with multiple groups often operating in the same protests but not all reporting their figures afterwards. Those that do might only do so in something inaccessible like an Instagram story, further limiting discoverability.

And, on both sides, there is no agreed-upon vocabulary---both sides will use vague terms like 'serious' or 'minor' injury, but these could be defined with very different thresholds. I have tried, here, to derive from what I have some sort of formal register of injury location and severity, and I encourage everyone to start publishing detailed casualty breakdowns in an easily-accessible central repository. Maybe mine?!

---

## Costs

Damage is another tricky one, and also one of the most politicised. Wide-ranging figures are published shortly after the fact, but I suspect that if we wait a while we might be able to determine a more realistic floor by looking at the real insurance claim amounts (although that might exclude smaller stores that might not have insurance, and I also have no idea if these are public).

The estimates for policing costs should be taken as very rough, mainly determined by estimating the per-squadron cost of riot police deployment, plus estimated helicopter flight hours, and scaling that up to the reported police deployment numbers. This also dovetails with the injury data problem, because we can't make estimates for the cost of any subsequent sick leave (whether for police, protestors, or bystanders).

The policing costs also don't address [opportunity costs](https://en.wikipedia.org/wiki/Parable_of_the_broken_window)---every additional euro spent on police deployments is a euro not spent on the education or health service. However, for the protestors, it's arguable that the damage they cause may come with a _negative_ opportunity cost: they smashed up a load of stuff on the 17th, and a little later the government started offering to _increase_ spending on education. That seems basically impossible to model confidently, so I've left it out.

---

## Demographics

There are no ethnic statistics for either side. In France, collection of ethnic data is illegal; the DPJJ study proxies with nationality and birthplace.

--

## Historic Data

Obviously, all of these issues are intensified when looking further back at historical events (although with the caveat that historic data is much more settled). There are probably academic books written about 1968 with detailed breakdowns of figures, but I have not been very successful finding them with the LLM. Also, going that far back in time causes its own issues: for example, 'France-entière' did not exist at the time, and so the total population figures are only for what we now call Metropolitan France.
