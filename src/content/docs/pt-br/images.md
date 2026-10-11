---
title: Gravando imagens
description: Importe uma foto, escolha como ela é gravada e veja o resultado antes de gravar.
---

1. **Importe** a imagem (PNG, JPEG, BMP, GIF). Ela vai para uma camada própria.
2. Selecione-a e escolha **Gravação da imagem…** no inspetor.
3. Escolha o método e ajuste; a prévia à direita mostra os pontos ou tons de cinza
   que o laser vai gravar, na resolução real.
4. Clique em **Aplicar** (um passo de desfazer). Nada muda antes disso.

## Métodos

| Método | Use para |
| --- | --- |
| Tons de cinza | fotos em materiais que escurecem aos poucos: a potência segue o cinza |
| Pontilhado | fotos em materiais que só aceitam marca ligada/desligada; nove algoritmos (Floyd–Steinberg, Atkinson, Jarvis, Stucki, Sierra…) |
| Como está | imagens já preparadas para gravação, um pixel por ponto |
| Contornar | logos e desenhos de traço: os contornos viram vetores |

## Ajustes

- **Resolução** em linhas por mm (mais linhas: mais fino e mais lento).
- **Brilho** e **contraste**; **limiar** para preto e branco puros.
- **Direção** das linhas: horizontal, vertical ou diagonal.
- **Velocidade** e **potência mínima / máxima**.

São os ajustes do diálogo de raster do LaserGRBL: o G-code é o mesmo.
