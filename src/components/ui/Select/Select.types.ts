/** A single option in the Select dropdown */
export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

/** Props for the Select component */
export interface SelectProps<T extends string = string> {
  /** Currently selected value */
  value: T;
  /** Callback invoked with the new selected value */
  onChange: (value: T) => void;
  /** List of options to display */
  options: SelectOption<T>[];
  /** Label displayed above the select */
  label?: string;
  /** When true, disables interaction */
  disabled?: boolean;
  /** Additional Tailwind classes */
  className?: string;
}
