import styled, { css } from "styled-components";
import React from "react";

export const Bubble: React.FC<{
  isLeft: boolean;
  content: string;
  author: string;
}> = (props) => (
  <BubbleWrapper isLeft={props.isLeft}>
    <Name isLeft={props.isLeft}>{props.author}</Name>
    <BubbleMessage isLeft={props.isLeft}>{props.content}</BubbleMessage>
  </BubbleWrapper>
);

const BubbleWrapper = styled.div<{ isLeft: boolean }>`
  ${(props) =>
    props.isLeft
      ? css`
          margin-right: auto;
        `
      : css`
          margin-left: auto;
        `};
`;
const Name = styled.div<{ isLeft: boolean }>`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
  ${(props) =>
    props.isLeft
      ? css`
          text-align: left;
        `
      : css`
          text-align: right;
        `};
  padding: 5px;
`;
const BubbleMessage = styled.div<{ isLeft: boolean }>`
  margin-top: 10px;
  position: relative;
  max-width: 30em;
  background-color: #fff;
  padding: 1.125em 1.5em;
  font-size: 1.25em;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
  ${(props) =>
    props.isLeft
      ? css`
          &:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            left: 1.5em;
            bottom: 100%;
            border: 0.75rem solid transparent;
            border-top: none;
            border-bottom-color: #fff;
            filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
          }
        `
      : css`
          &:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            right: 1.5em;
            bottom: 100%;
            border: 0.75rem solid transparent;
            border-top: none;
            border-bottom-color: #fff;
            filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
          }
        `}
`;
