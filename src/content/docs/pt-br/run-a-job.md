---
title: Executando um trabalho
description: Posicione o trabalho, faça o contorno, grave depois da confirmação, pause, pare e recupere.
---

## Do projeto para a máquina

Em **Produzir**, quando o documento tem objetos, o painel da máquina oferece gerar o
trabalho a partir do projeto:

- **Início do trabalho**: **Absoluto** (as coordenadas do projeto), **Posição
  atual** (onde o cabeçote está agora) ou **Origem do usuário** (a origem definida
  com *Origem aqui*).
- A **âncora 3 × 3**: qual ponto da caixa do trabalho vai para o ponto de início
  (centro, um canto, o meio de um lado).
- **Gerar o trabalho do projeto** planeja o G-code e o carrega; aparecem a prévia e
  o tempo estimado.

Você também pode abrir um arquivo G-code que já tenha.

## Contorno, depois iniciar

**Contorno** (F7) move o cabeçote em volta da caixa do trabalho com o laser
desligado, para você conferir se cabe no material.

**Iniciar** (F5) nunca dispara direto: abre a [confirmação de
disparo](../safety/#a-confirmação-de-disparo). Depois da contagem, **Disparar
laser** começa o trabalho. O canvas mostra o cabeçote e o que já foi gravado; o
painel mostra o progresso e o tempo restante.

## Pausar, parar

- **Pausar** (F6 ou Esc) segura o movimento; **Continuar** segue.
- **Parar trabalho** encerra o trabalho e desliga o laser.
- **PARAR** (o botão vermelho, ou Shift+Esc) reinicia o controlador na hora: o
  laser desliga e todas as linhas na fila são descartadas.

## Recuperando um trabalho

Depois de um alarme, de um PARAR ou de uma conexão perdida, uma faixa sobre o
canvas diz o que aconteceu e oferece **Desbloquear** (num alarme) e **Recuperar
trabalho…**. O diálogo de recuperação propõe de onde continuar, com a opção mais
segura marcada:

- **Desde o início**;
- **Algumas linhas antes da interrupção**: recomendado depois de alarme ou reset,
  porque o controlador descartou o que tinha no buffer;
- **A partir da última linha enviada**: recomendado depois de perder a conexão;
- **A partir da linha N**.

Você também pode referenciar a máquina antes e restaurar a origem de trabalho do
trabalho. Continuar dispara o laser, então passa pela confirmação de novo.
