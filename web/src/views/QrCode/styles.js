import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #ee6b26;
  }
  p {
    color: #20295f;
  }
`;
export const QrCodeArea = styled.div`
  background: blue;
  width: 100%;
  height: 400px;
`;
