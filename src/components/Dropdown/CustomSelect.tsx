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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  isSearchable = false,
  width = "550px",
  height = "260px",
  ...props
}) => {
  const CustomOption = (props: OptionProps<CustomSelectItem, false>) => {
    const { data, innerRef, innerProps, isSelected, isFocused } = props;
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
        options={options}
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
          }),
        }}
      />
    </div>
  );
};

export default CustomSelect;
