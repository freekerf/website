---
title: Vindo do LaserGRBL
description: Traga para o FreeKerf a conexão, as configurações, os botões personalizados e os contadores do LaserGRBL.
---

O FreeKerf pode importar o que você configurou no LaserGRBL. **Os arquivos do
LaserGRBL são só lidos, nunca alterados**: você pode continuar usando os dois.

## O que é importado

| Item | O que é |
| --- | --- |
| Conexão | porta, velocidade (baud), firmware, modo de streaming, reset ao conectar |
| Preferências | as demais configurações: jog, refrigeração por ar, cabeçalho e rodapé do trabalho, passadas |
| Botões personalizados | cada botão vira um pequeno script com seu ícone; botões que agem ao apertar e ao soltar viram dois scripts |
| Contadores do laser | o tempo de uso de cada módulo laser |
| Materiais do usuário | encontrados e informados; serão guardados quando a biblioteca de materiais puder armazená-los |

## Como

1. Abra as boas-vindas (abrem sozinhas na primeira execução, ou **Configurações →
   Mostrar boas-vindas de novo**).
2. Escolha **Importar do LaserGRBL**. O FreeKerf procura a pasta de dados do
   LaserGRBL (`%APPDATA%\LaserGRBL` no Windows) e lista o que achou, tudo marcado.
3. Desmarque o que não quiser e clique em **Importar selecionados**.
4. Um resumo mostra o que foi importado e o que merece uma olhada.

No terminal, `freekerf migrate lasergrbl` mostra o mesmo relatório, e
`freekerf migrate lasergrbl --apply` grava.

## Diferenças que você vai notar

- **Cor é camada.** Cada cor do desenho é uma camada com seu modo, velocidade,
  potência e passadas, como as camadas de cor do LaserGRBL.
- **Toda ação de laser é confirmada.** Iniciar um trabalho, retomar um ou enviar
  G-code que pode disparar abre uma confirmação com uma contagem curta. Veja
  [Segurança com laser](../safety/).
- **Teclado:** PARAR é Shift+Esc, de qualquer lugar.
