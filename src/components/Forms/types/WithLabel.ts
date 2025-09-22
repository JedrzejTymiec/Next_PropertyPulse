interface Label {
  text: string;
  placement?: 'top' | 'left';
  font?: 'bold' | 'normal';
  color?: 'grey' | 'black';
}

interface WithLabelTag {
  label: Label;
  ariaLabel?: never;
}

interface WithAriaLabel {
  label?: never;
  ariaLabel: string;
}

export type WithLabel = WithLabelTag | WithAriaLabel;
