---
title: Solução de problemas
description: Problemas comuns ao conectar, fazer o contorno e gravar, e o que tentar.
---

## A máquina não conecta

- Confira a porta e a **velocidade (baud)** em **Configurações → Máquina** (o Grbl
  1.1 costuma usar 115200; algumas placas usam 250000).
- Feche qualquer outro programa usando a porta (LaserGRBL, um monitor serial).
- No Linux, seu usuário precisa poder usar portas seriais (geralmente o grupo
  `dialout`).
- Experimente **Explorar com o simulador** para conferir se o próprio app funciona.

## O indicador diz Alarme

O controlador parou a máquina, por exemplo ao bater numa chave de fim de curso ou
depois de um PARAR. Clique em **Desbloquear** na faixa, referencie a máquina se
preciso e use **Recuperar trabalho…** se um trabalho foi interrompido.

## O trabalho não ficou onde eu esperava

Confira o **Início do trabalho** e a **âncora** antes de gerar o trabalho, e faça o
**Contorno** para ver a caixa no material antes de gravar.

## Os cantos queimam mais escuro

O modo laser está desligado no controlador (`$32=0`). Ligue-o pelo console: `$32=1`.

## Relatando um problema

Abra uma issue no [GitHub](https://github.com/freekerf/freekerf/issues) com o que
você fez, o que esperava e, se puder, as linhas do console em volta do problema.
