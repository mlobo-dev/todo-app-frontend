import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
//NOSSOS COMPONENTES
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import * as S from "./styles";

function QrCode() {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <S.QrCodeArea></S.QrCodeArea>
        <p>Suas atividades serão sincronizadas com a do seu Celular.</p>
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default QrCode;
