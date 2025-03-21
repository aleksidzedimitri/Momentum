import React from "react";
import Select, { OptionProps, SingleValueProps } from "react-select";
import styles from "./CustomSelect.module.css";

export interface CustomSelectItem {
  value: number;
  label: string;
  avatar?: string;
}

interface CustomSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: CustomSelectItem[];
  value: number | string | null;
  onChange: (val: number | null) => void;
  label: string;
  isSearchable?: boolean;
  width?: string;
  height?: string;
  prependOption?: CustomSelectItem;
  openModal?: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  isSearchable = false,
  width = "550px",
  height = "260px",
  prependOption,
  openModal,
  ...props
}) => {
  const modifiedOptions = prependOption ? [prependOption, ...options] : options;

  // Custom option rendering for react-select
  const CustomOption = (props: OptionProps<CustomSelectItem, false>) => {
    const { data, innerRef, innerProps, isSelected, isFocused } = props;

    if (data.value === -1) {
      return (
        <div
          ref={innerRef}
          {...innerProps}
          className={styles.itemRow}
          style={{
            cursor: "pointer",
            color: "#8338EC",
            fontWeight: 500,
            padding: "8px 12px",
            gap: "10px",
            width: "224px",
            textWrap: "nowrap",
          }}
          onClick={() => {
            openModal?.();
          }}
        >
          <img src="/assets/images/plus.svg" alt="add-button" />
          {data.label}
        </div>
      );
    }
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`${styles.itemRow} customSelect__option ${
          isSelected ? "customSelect__option--is-selected" : ""
        } ${isFocused ? "customSelect__option--is-focused" : ""}`}
      >
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.label}
            className={styles.itemAvatar}
          />
        )}
        <span>{data.label}</span>
      </div>
    );
  };

  // Custom rendering for the selected value
  const CustomSingleValue = (
    props: SingleValueProps<CustomSelectItem, false>
  ) => {
    const { data } = props;
    return (
      <div className={styles.singleValueRow}>
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.label}
            className={styles.itemAvatar}
          />
        )}
        <span>{data.label}</span>
      </div>
    );
  };

  // Find the currently selected option from the options list
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div
      className={styles.customSelectContainer}
      style={{ width, height, ...props.style }}
      {...props}
    >
      <label className={styles.selectLabel}>{label}</label>
      <Select
        value={selectedOption}
        onChange={(opt) => onChange(opt ? opt.value : null)}
        options={modifiedOptions}
        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        placeholder=""
        isSearchable={isSearchable}
        classNamePrefix="customSelect"
        styles={{
          control: (base, state) => ({
            ...base,
            width,
            height: "45px",
            minHeight: "45px",
            borderRadius: "4px",
            border: state.isFocused ? "1px solid #777777" : "1px solid #dee2e6",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            cursor: 'pointer'
          }),
          valueContainer: (base) => ({
            ...base,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            
          }),
          menu: (base) => ({
            ...base,
            width,
            border: "1px solid #dee2e6",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            cursor: 'pointer'

          }),
        }}
      />
    </div>
  );
};

export default CustomSelect;
