/* ------------------------------------------------------------------ model */

type Run =
  | string
  | { readonly em: string }
  | { readonly link: string; readonly href: string };

type Block =
  | { readonly kind: "p"; readonly runs: readonly Run[] }
  | { readonly kind: "ul"; readonly items: readonly (readonly Run[])[] }
  | {
      readonly kind: "quote";
      readonly paras: readonly (readonly Run[])[];
      readonly by: readonly Run[];
    };

interface SubSection {
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly Block[];
}
