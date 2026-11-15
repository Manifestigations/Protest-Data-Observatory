import type { HeliCopy } from "../types";

export const HELI_COPY_EN: HeliCopy = {
  heading: "How the policing-cost model is built",
  intro:
    "No French ministry publishes what a protest day costs. The figures here are reconstructed from published unit costs and published deployment numbers. Read them as an order of magnitude, not an invoice.",
  steps: [
    {
      title: "Ground deployment: unit cost × officers deployed",
      body: "The unit of account is one company of riot police, about a hundred officers. Published benchmarks put a CRS company at 15,000 to 30,000 euros a day once pay, allowances, transport, meals and relief rotations are counted. Mobile gendarmerie squadrons are costed the same way, with a published reference of 3.4 million euros for 3,000 gendarmes.",
    },
    {
      title: "Deployment numbers come from the prefectures",
      body: "A day with a published deployment figure gets a value: officers divided by a hundred, times the unit-cost band. Days without one stay empty rather than being interpolated, which is why the daily line is ragged. The cumulative line carries the last known value forward, so it is a floor.",
    },
    {
      title:
        "Aerial surveillance is a separate component, costed by the flight hour",
      body: "Helicopters are billed as flight hours times an hourly rate, so that is how they are modelled. The Police nationale owns no helicopters; it reimburses the gendarmerie or the Sécurité civile on a requisition tariff of about 1,412 euros an hour. Hours come from ADS-B traces, which give exact block times for the aircraft that broadcast, mainly the Sécurité civile H145s, combined with press and prefecture reports of the cities covered. The low bound counts only aircraft confirmed by a trace or a report; the high bound assumes one aircraft per reported city. Repositioning legs and rescue sorties are removed first.",
    },
    {
      title: "Three rates, three answers",
      body: "1,412 euros an hour reproduces the 2019 precedent, when the gendarmerie flew 717 hours during the yellow-vest protests for about a million euros. An audit figure of 1,800 euros an hour is the upper bound of the in-service band. A Senate estimate of up to 7,000 euros an hour, all-in for the new H145-D3 and H160 fleet, values the same flying time several times higher. The chart uses the in-service band; the all-in figure is a sensitivity.",
    },
    {
      title: "Why the aerial line barely moves the chart",
      body: "The aerial component is a fraction of a million euros on the days it exists, against a ground line of 12 to 44 million. It is added to the model and visible in the totals below, but at this scale it cannot be seen on the plotted line. That is the finding, not a defect: surveillance flying is small money next to the standing army of a protest day.",
    },
    {
      title: "What the model leaves out",
      body: "Sick leave after injury, for police, protesters and bystanders. Overtime carried into later months. Damage to public property, tracked separately. Drone hours, cheap per hour but published in no usable form. Prosecution, detention and judicial follow-up. The material cost of the surveillance apparatus itself. Every one of these pushes the true figure up.",
    },
  ],
  summary: (v) =>
    `${v.days} days of surveillance flying recorded, ${v.hLo} to ${v.hHi} flight hours: ${v.cLo} to ${v.cHi} at the in-service tariff, ${v.aLo} to ${v.aHi} at full cost. Only the part of those hours that falls on a day with a published deployment figure is folded into the plotted line; the rest is stated here and excluded from the chart.`,
  caveat:
    "The aerial component is the least solid part of the model: the gendarmerie's EC135s and AS350s do not broadcast ADS-B, so most of their flying is invisible to trackers and the hours are inferred from reports rather than measured. Treat the aerial figure as a lower bound with a wide error.",
  basis: {
    clashes: "clashes and pillaging, aircraft over several cities",
    nightPatrol: "night patrol of restricted perimeters in Paris",
    saturday: "Saturday mobilisation, aircraft over the largest cities",
    intersyndical: "inter-union day, dispersal orders broadcast from the air",
    ongoing: "continued daily surveillance",
  },
};
