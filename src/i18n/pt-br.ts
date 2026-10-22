// Brazilian Portuguese strings (translation of en.ts, key for key).

import type { Strings } from './en';

export const ptBr: Strings = {
  'meta.title': 'FreeKerf: software livre para corte e gravação a laser',
  'meta.description':
    'O FreeKerf projeta trabalhos a laser e controla a máquina. Software livre sob a GPL-3.0-or-later, para Linux, Windows e macOS.',
  'meta.download.title': 'Baixar o FreeKerf',
  'meta.download.description': 'Baixe o FreeKerf para Windows, macOS ou Linux.',
  'meta.notfound.title': 'Página não encontrada · FreeKerf',

  'skip': 'Pular para o conteúdo',
  'nav.label': 'Principal',
  'nav.download': 'Baixar',
  'nav.status': 'Situação',
  'nav.community': 'Participe',
  'nav.source': 'Código-fonte',
  'nav.language': 'Idioma',
  'nav.home': 'Início do FreeKerf',

  'hero.badge': 'Pré-alfa · em desenvolvimento ativo',
  'hero.title': 'Do desenho ao corte, em um app livre.',
  'hero.lead':
    'O FreeKerf projeta seus trabalhos a laser e controla a máquina: Grbl, grblHAL e outros. Software livre para Linux, Windows e macOS, sem chave de licença e sem versão “Pro”.',
  'hero.download': 'Baixar',
  'hero.source': 'Ver no GitHub',
  'hero.shot': 'O FreeKerf no modo Projetar: um porta-copos e uma etiqueta na área de trabalho, com as camadas de cor.',

  'steps.title': 'Três passos até a primeira queima',
  'steps.lead': 'Um espaço de trabalho, dois modos: Projetar para preparar o trabalho, Produzir para executá-lo.',
  'steps.design.title': 'Projetar',
  'steps.design.text':
    'Desenhe ou traga seus arquivos SVG, DXF e imagens. Cada cor é uma camada com velocidade, potência e passadas próprias.',
  'steps.design.shot': 'Modo Projetar: formas em camadas de cor, com a estrela selecionada e suas alças.',
  'steps.check.title': 'Conferir',
  'steps.check.text':
    'Antes de o laser ligar, uma checklist curta de bancada e uma contagem regressiva. O PARAR está sempre na tela, mesmo sobre os diálogos.',
  'steps.check.shot': 'A confirmação antes de queimar: checklist de óculos, exaustão, material e incêndio.',
  'steps.run.title': 'Queimar e acompanhar',
  'steps.run.text':
    'Acompanhe o cabeçote, o progresso e o tempo restante. Pause, pare o trabalho ou ajuste velocidade e potência durante a execução.',
  'steps.run.shot': 'Modo Produzir: um trabalho em 57 %, com o tempo restante e a posição do cabeçote.',
  'steps.note': 'Capturas da versão de desenvolvimento, feitas no próprio app com o simulador de máquina embutido.',

  'narrow.title': 'Um painel de máquina em telas estreitas',
  'narrow.text':
    'Deixe a janela estreita e o FreeKerf vira um painel de controle: estado, progresso e PARAR ao alcance do polegar.',
  'narrow.shot': 'O FreeKerf em uma janela estreita: a prévia do trabalho, o painel da máquina e o botão PARAR.',

  'values.title': 'O que guia o FreeKerf',
  'values.precision.title': 'Precisão',
  'values.precision.text':
    'Geometria de décimo de milímetro, números com unidade, réguas. Um núcleo de máquina testado passo a passo contra uma especificação executável.',
  'values.free.title': 'Livre e aberto',
  'values.free.text':
    'GPL-3.0-or-later. Sem chave de licença, sem dongle, nada atrás de pagamento. Formatos de arquivo abertos, que você pode ler e guardar.',
  'values.safety.title': 'Segurança primeiro',
  'values.safety.text':
    'Estado da máquina sempre visível, PARAR sempre alcançável e mensagens calmas que dizem o que aconteceu e o que fazer em seguida.',

  'status.title': 'Onde estamos',
  'status.lead':
    'O FreeKerf é pré-alfa: funciona na bancada e muda toda semana. As versões de desenvolvimento têm instaladores para Linux, Windows e macOS. Este é o caminho.',
  'status.done': 'Feito',
  'status.now': 'Em andamento',
  'status.next': 'Próximo',
  'status.later': 'Depois',
  'status.core': 'Núcleo da máquina: protocolo Grbl, G-code, simulador e linha de comando',
  'status.import': 'Importação e planejador: SVG, DXF, imagens, camadas, geração de G-code',
  'status.desktop': 'App desktop: modos Projetar e Produzir, automação com scripts e agentes de IA',
  'status.v1': 'Versão 1: instaladores para Linux, Windows e macOS, biblioteca de materiais, mais firmwares',
  'status.remote': 'Tablet e controle remoto pela rede local',
  'status.plan': 'Ler o plano completo',

  'community.title': 'Participe',
  'community.lead':
    'O FreeKerf é construído em público pela sua comunidade. Experimente a versão de desenvolvimento, conte o que encontrar ou ajude com código, design e traduções.',
  'community.app': 'O app: núcleo em Rust, app desktop em Tauri e interface web.',
  'community.conformance': 'Especificação executável e testes de protocolo do núcleo da máquina.',
  'community.design': 'Pesquisa, marca e sistema de design.',
  'community.library': 'Configurações de materiais e perfis de máquina abertos.',
  'community.website': 'Este site e o guia do usuário.',
  'community.issue': 'Relatar um problema',

  'download.title': 'Baixar o FreeKerf',
  'download.lead': 'Gratuito para todos, no Linux, Windows e macOS.',
  'download.for': 'Para o seu sistema',
  'download.all': 'Todos os downloads',
  'download.version': 'Versão {version}',
  'download.prerelease': 'Pré-lançamento',
  'download.published': 'Publicada em {date}',
  'download.notes': 'Notas da versão',
  'download.none.title': 'Ainda não há instaladores',
  'download.none.text':
    'O FreeKerf é pré-alfa e não tem nenhuma versão publicada agora. Você pode compilar a versão de desenvolvimento a partir do código-fonte.',
  'download.macos.first':
    'O app ainda não é assinado. Na primeira vez, o macOS se recusa a abri-lo: escolha Concluído, depois Ajustes do Sistema → Privacidade e Segurança → Abrir Mesmo Assim, e confirme com a senha de um administrador.',
  'download.offline.text': 'Não foi possível ler a lista de versões agora. Todas estão no GitHub.',
  'download.releases': 'Ver as versões no GitHub',
  'download.source.title': 'Compilar do código-fonte',
  'download.source.text':
    'Você precisa de Git, Rust (rustup), Node.js 24 e, no Linux, WebKitGTK 4.1. Depois, em um terminal:',
  'download.source.more': 'O guia do repositório lista todos os comandos e as dependências de cada sistema.',
  'download.safety':
    'Um laser pode queimar, cegar e causar incêndio. Use os óculos certos, mantenha a exaustão ligada e nunca deixe uma máquina funcionando sozinha. O botão PARAR do app não substitui a parada de emergência física.',
  'os.windows': 'Windows',
  'os.macos': 'macOS',
  'os.linux': 'Linux',
  'kind.exe': 'Instalador (.exe)',
  'kind.msi': 'Instalador (.msi)',
  'kind.dmg': 'Imagem de disco (.dmg)',
  'kind.appimage': 'AppImage',
  'kind.deb': 'Debian, Ubuntu (.deb)',
  'kind.rpm': 'Fedora, openSUSE (.rpm)',
  'kind.flatpak': 'Flatpak',

  'notfound.title': 'Página não encontrada',
  'notfound.text': 'Esta página não existe ou mudou de lugar.',
  'notfound.home': 'Ir para a página inicial',

  'footer.license': 'Software livre sob a GPL-3.0-or-later.',
  'footer.heritage': 'Baseado no LaserGRBL, de Diego Settimi.',
  'footer.trademark': '“FreeKerf” e o logo do FreeKerf são nomes do projeto FreeKerf.',
  'footer.privacy': 'Sem cookies, sem rastreadores.',
};
