---
title: Segurança com laser
description: Como o FreeKerf mantém o laser sob o seu controle, e o que você mesmo precisa fazer.
---

Um laser pode cegar, queimar e começar incêndios. O FreeKerf ajuda, mas a segurança
do ambiente é sua: **use óculos de proteção próprios para o comprimento de onda do
seu laser, ligue a exaustão, mantenha um extintor por perto e nunca deixe um
trabalho rodando sozinho.**

## PARAR

O botão vermelho **PARAR** está sempre na tela, em todos os modos e layouts, e
**Shift+Esc** funciona de qualquer lugar, mesmo digitando ou com um diálogo aberto.
O PARAR reinicia o controlador: o laser desliga e as linhas na fila são
descartadas. Ele também cancela antes qualquer script em execução.

## A confirmação de disparo

Tudo o que pode ligar o laser (iniciar ou retomar um trabalho, um botão
personalizado, G-code digitado no console que pode disparar) abre antes **Pronto
para gravar?**:

- um resumo do trabalho;
- uma lista: óculos de proteção, exaustão e ar assistido, material preso e foco
  ajustado, extintor por perto;
- **Disparar laser**, desabilitado durante uma contagem curta (3 s por padrão, de 1
  a 10 s em **Configurações → Segurança**).

Só uma pessoa na janela pode confirmar. Scripts e agentes de IA podem pedir, nunca
confirmar; agentes não podem disparar o laser de jeito nenhum.

## Configurações da máquina

O FreeKerf lê as configurações do controlador ao conectar. Se o modo laser (`$32`)
estiver desligado, os cantos podem queimar mais: ligue-o em lasers de diodo e CO₂
controlados por Grbl.
