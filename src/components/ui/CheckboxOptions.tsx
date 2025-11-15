import type { FC } from "react";
import { components } from "react-select";

const CheckboxOption: FC = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <span>{props.label}</span>
      </div>
    </components.Option>
  );
};

const CountValueContainer: FC = (props: any) => {
  const { children, getValue } = props;
  const selected = getValue(); // array of selected items

  return (
    <components.ValueContainer {...props}>
      {/* Replace only the text, keep the rest of react-select's internals */}
      {selected.length > 0 && (
        <span className="text-[var(--text)] text-sm">
          {selected.length} selected
        </span>
      )}

      {/* IMPORTANT: keep children for click + outside close behavior */}
      {children}
    </components.ValueContainer>
  );
};

export { CheckboxOption, CountValueContainer };
