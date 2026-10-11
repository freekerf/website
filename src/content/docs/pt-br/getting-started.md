---
title: Primeiros passos
description: Primeira execução, as boas-vindas, conectar à sua máquina ou ao simulador embutido.
---

## Instalação

Ainda não há instaladores (eles vêm com o primeiro lançamento). Para experimentar
o FreeKerf hoje, compile a partir do código seguindo o
[guia de desenvolvimento](https://github.com/freekerf/freekerf/blob/main/AGENTS.md).

## As boas-vindas

Na primeira vez que você abre o FreeKerf, as boas-vindas oferecem três caminhos:

- **Configurar minha máquina**: abre as configurações na página da máquina (porta,
  velocidade, firmware).
- **Importar do LaserGRBL**: aparece quando uma instalação do LaserGRBL é
  encontrada; veja [Vindo do LaserGRBL](../migrate-from-lasergrbl/).
- **Explorar com o simulador**: conecta a uma máquina Grbl simulada, embutida no
  app, para você experimentar tudo sem um laser.

As boas-vindas só abrem sozinhas uma vez. Você pode abri-las de novo em
**Configurações → Mostrar boas-vindas de novo**.

## Conectando

1. Vá para **Produzir**.
2. No painel da máquina, escolha a porta serial (ou **Emulador FreeKerf (sem
   máquina)**) e clique em **Conectar**.
3. O FreeKerf lê o firmware e suas configurações (`$$`, `$I`). O indicador de
   estado no alto fica **Pronta**.

O indicador de estado sempre mostra o que a máquina está fazendo: Desconectada,
Pronta, Executando, Em pausa, Alarme, Referenciando, Movendo, Contornando.

## Movendo o cabeçote

O jog move o cabeçote um passo por toque (escolha o passo: 0,1, 1, 10 ou 50 mm).
Com o jog contínuo ligado nas configurações, o cabeçote se move enquanto você
segura o botão e para assim que você solta. **Referenciar**, **Desbloquear** e
**Origem aqui** ficam ao lado do jog.

## Teclado

| Teclas | Faz |
| --- | --- |
| Shift+Esc | **PARAR**, de qualquer lugar, mesmo digitando |
| F5 | Iniciar (abre a confirmação de disparo) |
| F6 | Pausar / continuar |
| F7 | Contorno |
| Esc | Pausa um trabalho em execução; senão fecha o diálogo do topo |
| Ctrl+1 / Ctrl+2 | Projetar / Produzir |
