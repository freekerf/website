---
title: Projetando um trabalho
description: Importe um desenho, ajuste as camadas de cor, desenhe formas e textos, combine e repita.
---

## Importar um desenho

Clique em **Importar** na barra de ferramentas (Ctrl+I) e escolha um SVG, DXF ou
imagem. Para um desenho, escolha o que fazer com as cores:

- **Manter as cores: uma camada por cor** (uma camada da mesma cor é reaproveitada);
- **Pôr tudo na camada atual**.

Uma mensagem diz quantos objetos e camadas novas a importação criou. Elementos que
não podem ser convertidos (por exemplo, texto em SVG) são mantidos e informados.

## Cor é camada

O painel **Camadas** lista uma linha por cor, na ordem em que são gravadas
(preenchimentos primeiro, depois linhas, depois cortes, para que um corte nunca
solte uma peça antes de ela ser gravada). Cada linha mostra o modo, o número de
objetos e velocidade · potência · passadas.

- Clique numa linha para torná-la a **camada atual**: as formas novas vão para ela.
- Expanda uma linha para mudar o **modo** (linha, preencher, preencher e linha,
  corte), a **velocidade**, a **potência** (em porcentagem do máximo da máquina) e
  as **passadas**.
- Esconda uma camada com o olho: ela não é mostrada nem gravada.
- Suba ou desça uma camada na ordem.

A **paleta** embaixo do canvas é o atalho: clique numa cor para mover a seleção para
a camada dessa cor (criada se preciso); sem seleção, ela vira a camada das formas
novas.

## Desenhar

| Ferramenta | Tecla | Clique | Arrastar |
| --- | --- | --- | --- |
| Seleção | V | escolhe um objeto (Shift ou Ctrl adiciona ou tira) | seleção por área (esquerda→direita: dentro; direita→esquerda: tocando) |
| Retângulo | R | um retângulo de 40 × 30 mm | a caixa que você desenha |
| Elipse | E | um círculo de 30 mm | a caixa que você desenha |
| Texto | T | "Text", 10 mm de altura; depois digite no inspetor | a altura da caixa |

O texto usa uma fonte de traço único, ideal para gravação, e continua editável.

## Mover, redimensionar, girar

Arraste um objeto para movê-lo. As alças redimensionam (os cantos mantêm as
proporções; Shift libera; Alt redimensiona a partir do centro) e a alça redonda
gira (Shift: passos de 15°). As setas movem a seleção 1 mm (Shift 10 mm, Alt
0,1 mm). Cada mudança é um passo de desfazer: Ctrl+Z / Ctrl+Shift+Z.

O painel **Objeto** (inspetor) dá os números exatos: posição do centro, largura,
altura, rotação, o texto e seu tamanho, e os botões para alinhar, duplicar
(Ctrl+D) e excluir (Del).

## Combinar e repetir

Com dois ou mais objetos selecionados, o inspetor (ou a barra de ferramentas) pode:

- **Soldar**: um contorno em volta de todos;
- **Subtrair**: o primeiro menos os outros (o texto vira furo);
- **Interseção**: só a área em comum.

**Contorno deslocado** adiciona um contorno aumentado ou reduzido por uma
distância. **Matriz** faz uma grade de cópias (colunas, linhas, espaço).

Essas operações transformam curvas em segmentos curtos (dentro de 0,01 mm), e o
texto deixa de ser texto editável.
