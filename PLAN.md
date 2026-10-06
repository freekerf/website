# FreeKerf Website: plano

Site público e documentação de usuário do FreeKerf (domínio pretendido: `freekerf.org`, ainda não registrado).

> **Status: planejamento.** Licença: GPL-3.0-or-later (ver [NOTICE](NOTICE)).

## 1. O que precisa ser construído

### 1.1 Stack
- Gerador estático com i18n e busca: **Astro + Starlight** (recomendado) ou mdBook. Decida num ADR curto: suporte a pt-BR/en, busca offline, componentes para mostrar screenshots e tokens.
- Hospedagem no **GitHub Pages** com domínio próprio (`CNAME`, verificação de domínio na organização, HTTPS forçado).
- Visual com os tokens `fk-` e os assets de marca do repo [`design`](https://github.com/freekerf/design) (`tokens/fk-tokens.css`, `brand/`, fontes OFL), sincronizados por script e não copiados à mão.

### 1.2 Conteúdo
- **Landing:** o que é o FreeKerf, para quem é, capturas do protótipo e status do projeto, deixando claro que é **pré-alfa**.
- **Download:** página que lê as releases do GitHub e mostra o instalador certo para o SO do visitante (Linux `.deb`/AppImage/Flatpak, Windows MSI, macOS DMG).
- **Documentação de usuário:** primeira conexão, migração do LaserGRBL, fluxos de `design/ux.md`, segurança do laser, configuração Grbl (`$$`), solução de problemas. Em pt-BR e en desde o início.
- **Para desenvolvedores:** links para `PLAN.md`, arquitetura, como contribuir e conformance.
- **Créditos:** LaserGRBL e Diego Settimi, contribuidores, licenças de terceiros.
- **Política de marca** (`TRADEMARK`): uso permitido do nome e do logo.

### 1.3 Qualidade
- CI: build, verificação de links quebrados, Lighthouse (acessibilidade ≥ 95), validação de HTML.
- Sem rastreadores de terceiros. Se houver métricas, que sejam agregadas, sem cookies e auto-hospedadas.

## 2. Marcos
1. Landing de uma página + GitHub Pages no subdomínio `freekerf.github.io` (antes do domínio).
2. Domínio próprio, depois que `freekerf.org` for comprado.
3. Documentação de usuário acompanhando o MVP desktop (M4 do monorepo).
4. Página de download automática (M5).
