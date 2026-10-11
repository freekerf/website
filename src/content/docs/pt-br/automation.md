---
title: Scripts e agentes de IA
description: Automatize o FreeKerf com scripts em JavaScript, ou deixe um agente de IA trabalhar no app, com a sua permissão.
---

Tudo o que você faz no FreeKerf é uma *ação* (importar, mover, ajustar uma camada,
conectar, fazer o contorno…). Scripts e agentes de IA usam as mesmas ações, com
níveis de permissão que você controla.

## Scripts

Scripts são programas curtos em JavaScript executados dentro do FreeKerf, por
exemplo:

```js
const plate = app.document.addShape({ shape: 'rect', x: 0, y: 0, width: 80, height: 40 }).id;
app.document.array({ ids: [plate], columns: 3, rows: 2 });
```

As mudanças de um script no documento são um único passo de desfazer, e são
desfeitas se o script falhar. `freekerf run script.js` executa um no terminal. Os
botões personalizados importados do LaserGRBL viram scripts.

## Agentes de IA (MCP)

O FreeKerf trabalha com assistentes de IA que falam MCP (Model Context Protocol).
Vem **desligado**: ligue **Configurações → Automação → Agentes de IA (servidor
MCP)** e adicione `freekerf mcp` ao seu assistente (`"command": "freekerf", "args":
["mcp"]`). O assistente então se conecta ao app aberto.

| Um agente pode… | |
| --- | --- |
| ler o app e o documento, mudar a visualização, editar o documento | com o MCP ligado |
| mover a máquina (jog, referenciar, contorno) | só com **Agentes podem mover a máquina**, ou com a sua permissão |
| ligar o laser | **nunca**: nenhuma configuração ou permissão permite |

## A sua permissão

Quando um script ou agente pede mais do que pode fazer, um diálogo pergunta a você:
**Negar**, **Desta vez**, **Até fechar o app** ou **Sempre**. Um pedido sem resposta
é negado depois de dois minutos.

A barra do alto mostra os agentes conectados e o script em execução, com um botão
para cancelá-lo. **Configurações → Automação** lista as permissões que você deu
(revogue-as ali) e as ações recentes de scripts e agentes. Só você pode mudar essas
configurações: scripts e agentes não podem.
