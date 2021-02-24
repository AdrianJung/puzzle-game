import styled from "styled-components";

export const StyledGame = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: background 15s ease infinite;
  flex-direction: column;
`;

export const StyledGameBoard = styled.div`
  padding: 20px;
  border-radius: 6px;
  background-color: #212121;
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, minmax(20px, 75px));
  grid-template-columns: repeat(${(props) => props.cols}, minmax(20px, 75px));
  grid-gap: 5px;
`;

export const StyledTile = styled.div`
  user-select: none;
  display: flex;
  visibility: ${(props) => (props.empty ? "hidden" : "visible")};
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 20px;
  background-color: rgb(250, 250, 210);
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: rgba(250, 250, 210, 0.7);
  }
  &::before {
    content: "";
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: top;
  }
`;

export const StyledInput = styled.input`
  width: 45px;
  height: 45px;
  margin-left: 10px;
  text-align: center;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  &:nth-of-type(1) {
    margin-bottom: 20px;
  }
`;

export const StyledButton = styled.button`
  font-size: 1.5em;
  padding: 1.5em 3em;
  background-color: #212121;
  color: rgb(250, 250, 210);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgb(130, 130, 130, 0.5);
  font: inherit;
  margin-top: ${(props) => (props.margintop ? "20px" : "")};
  &:focus {
    outline: 0;
  }
  &:active {
    transform: scale(0.9);
    background-color: #212121;
    box-shadow: 0 2px 25px rgba(130, 130, 130, 0.2);
  }
  &:hover {
    -webkit-box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.6);
    box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.6);
  }
`;
