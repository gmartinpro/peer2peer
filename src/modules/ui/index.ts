import styled from "styled-components";

export { LoadingScreen } from "./components/LoadingScreen";
export { SpinnerLoading } from "./components/SpinnerLoading";

export const Button = styled.button`
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: white;
  font-size: 22px;
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  margin: 5px 0;
`;
