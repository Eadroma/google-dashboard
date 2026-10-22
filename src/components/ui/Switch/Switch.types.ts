/** Props for the Switch toggle component */
export interface SwitchProps {
  /** Whether the switch is in the on state */
  checked: boolean;
  /** Callback invoked when the user toggles the switch */
  onChange: (checked: boolean) => void;
  /** Accessible label (also shown as text if provided) */
  label?: string;
  /** When true, disables interaction */
  disabled?: boolean;
  /** Additional Tailwind classes for the wrapper */
  className?: string;
}
