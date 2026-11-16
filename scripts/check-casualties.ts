import { casualtyFailures } from "../src/data/casualties/checks.ts";

const failures = casualtyFailures();
if (failures.length) {
  console.error(
    `casualties: ${failures.length} invariant failure(s)\n  ${failures.join("\n  ")}`,
  );
  process.exit(1);
}
console.log("casualties: all invariants hold");
