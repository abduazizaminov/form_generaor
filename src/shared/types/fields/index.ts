interface Field {
  label: string;
  type: "input" | "select" | "checkbox" | "textarea";
  attrs?: Record<string, any>;
  options?: { label: string; value: any }[];
  val?: string;
}

export type { Field };
