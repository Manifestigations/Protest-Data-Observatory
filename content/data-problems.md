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

LLM STILL

## Who pays, and what has actually been paid

The "costs" panel answers _how much_. This section answers _borne by whom_, because a
€1.1bn damage bill is not a €1.1bn transfer to anyone.

Three payers, three stages. **Committed**: announced or owed. **Disbursed**: actually
paid. **Contingent**: exposure that has been neither imposed nor paid — a statutory
maximum a court has not applied to anyone. The third stage exists because the
protestor column is otherwise unrepresentable: recording a €15,000 maximum as
"committed" would claim money is owed that nobody owes.

Four decisions, each with a consequence:

1. **Insurance is a conduit, and the two counts do not agree.** On 19 November
   France Assureurs put insured damage at **€207M for 5,280 claims** — 198M for
   professional property, 3.5M for households, 6M for motor — against IFRAP's
   €911M of material damage. The insured share is **22.7%**, not the 73% that
   IFRAP's own coverage assumptions implied. The two are estimates of different
   things, made independently, from different reporting dates (claims reported
   to 12 November, window extended to 30 days). We print both and reconcile
   neither: the gap is the finding. No local-authority line was published, so
   public property is absent from the insurers' count, not zero in it.
2. **The €5bn is a loan, not spending.** It is never added to a budget figure. The
   interest subsidy is unpublished, so a cash cost is not computable.
3. **Nothing is disbursed in 2026.** No source publishes a claims-paid figure; the
   insurers' claim window had not closed. The column is empty _and says so_. UPDATE an estimated ultimate cost now exists (€207M), a paid figure still does not, for any party.
4. **The iFRAP range is corrected.** The site previously quoted "€247M–872M", which is
   not what iFRAP publishes. It publishes three scenarios: €309M / €613M / €1,101M.

Consequence for the chart: the only defensible damage-to-concession statement is a
_commitment_ ratio — €5,000M against €1,101M is 4.5×, against €309M is 16.2×. It is
captioned "commitment per euro of damage", never "spending".

---

## Crimes

> [!TIP]
> To write

Arrest is not a charge. FACTS.arrests counts a police measure. Any funnel drawn from it and from this register mixes two populations.
Only cases that reach court are visible. A "conviction rate" computed over these records measures what got prosecuted, not what happened.
The war-crime register is a counterfactual, and the obvious counterfactual is wrong. Tear gas is lawful for domestic riot control under the Chemical Weapons Convention; what is arguable is use-as-method-of-warfare and indiscriminate use. Hence caveat is a required field, not a footnote.

custody figures of "over 4,900" (3 Nov) and 7,184 (later) are not the same measure; IGPN enquiry counts move 24 → 36 → 80 → 161 partly because scope widens from IGPN to "internal watchdogs" ; and the Tours mis en examen is the only case in the set that has left the enquiry stage .

---

## Demographics

There are no ethnic statistics for either side. In France, collection of ethnic data is illegal; the DPJJ study proxies with nationality and birthplace.

---

## Disruptive acts

I have come up with my own rough categorisation of 'disruptive acts', which includes things like school blockades, <i lang="fr">Operation Escargot</i>, acts of sabotage, etc. I am not aware of any common taxonomy for these.

Generally, the low estimate comes from the Interior and Education ministries. The former publish a count of <i lang="fr">actions de voie publique</i> (i.e., public road actions), but only on mobilisation days, and they do not break the figures down further (e.g., toll booth openings and road blockade, which are perfect opposite types of action). The latter count <i lang="fr">establishments</i> blocked or
closed, which is technically distinct from the number of acts of blockading, but I think the difference is pretty academic.

The high estimates come from the movement action map, which is collaboratively populated and mostly self-reported without verification. As such, the number can be as much as four times higher than the official figure, but I don't know whether this is because some proposed events do not take place, or they fail, or they remain too small for the official figures to count them, or what.

One consequence of this is that the charts give a potentially false impression that weekdays (outside of mobilisation days) are quiet except for school closures. This may be true, but may also be because of lesser individualised coverage of more minor days.

---

## Approval

The different opinion polls use different categories. For example, <i lang="fr">indifférents</i> against <i lang="fr">ne sait pas</i> or <i lang="fr">approuvent</i> against <i lang="fr">soutiennent</i>. Also, they are usually only looking at adults, which means that whilst we can assume that 100% of protestors support the movement, we can't say that they make up a subset of the opinion poll figures because of the very nature of this as a largely youth-led movement.

---

## Comparative Movements

A protest movement is a big, messy, inherently analogue phenomena, each with its own character, history, and local conditions. Making direct comparisons between international movements is very tricky, but I still think there is some value in a rough comparison between durations demands (although my bucketing is not necessarily definitive). But even the start and end dates are fraught with riskL: for example, the Gilets Jaunes movement notionally finished years ago, and yet here we are with people out in hi-vis vests once again and blocking roads.

Also, I could find no published turnout figures for several of the biggest comparative movements, so my chloropleth is artificially limited.

---

## Historic Data

Obviously, all of these issues are intensified when looking further back at historical events (although with the caveat that historic data is much more settled). There are probably academic books written about 1968 with detailed breakdowns of figures, but I have not been very successful finding them with the LLM. Also, going that far back in time causes its own issues: for example, 'France-entière' did not exist at the time, and so the total population figures are only for what we now call Metropolitan France.
