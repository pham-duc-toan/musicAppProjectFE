"use client";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { color, fontSize, fontWeight } from "@mui/system";
import { useState } from "react";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
  return {
    "& .MuiFormLabel-root": {
      fontWeight: 700,
    },
    "[data-mui-color-scheme='dark'] & .MuiInputBase-input.MuiOutlinedInput-input":
      {
        WebkitBoxShadow: "0 0 0 100px #655BD3 inset ",
      },
  };
});

const CustomTextField = (props: TextFieldProps) => {
  const [labelActive, setLabelActive] = useState<boolean>(true);
  const {
    size = "small",
    InputLabelProps,
    variant = "filled",
    ...rests
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    if (event.target.value) {
      setLabelActive(true);
    } else {
      setLabelActive(false);
    }
  };
  return (
    <TextFieldStyled
      size={size}
      variant={variant}
      InputLabelProps={{ ...InputLabelProps, shrink: labelActive }}
      {...rests}
      onChange={handleChange}
    />
  );
};
export default CustomTextField;