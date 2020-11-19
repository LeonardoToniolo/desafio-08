import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { Container, Error, SelectStyled } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// eslint-disable-next-line react/prop-types
const CreatableSelect: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const customStyles = {
    container: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? '0' : '0',
    }),
    control: (base: any, state: any) => ({
      ...base,
      background: 'transparent',
    }),
    valueContainer: (base: any, state: any) => ({
      ...base,
      background: 'transparent',
    }),
  };

  const getValue = useCallback(
    (ref: any) => {
      if (rest.isMulti) {
        if (!ref.state.value) {
          return [];
        }
        return ref.state.value.map((option: OptionTypeBase) => option.value);
      }
      if (!ref.state.value) {
        return '';
      }
      return ref.state.value.value;
    },
    [rest.isMulti],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!getValue(selectRef.current));
  }, [getValue]);

  return (
    <Container error={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <SelectStyled
        defaultValue={defaultValue}
        ref={selectRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        styles={customStyles}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default CreatableSelect;
