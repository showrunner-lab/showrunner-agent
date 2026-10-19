# Showrunner agent

Repo pubblico del personaggio AI ideato e gestito da Grok Bot. Contiene tre cose:

1. **`CONSTITUTION.md`**: le regole dell'agente. Cosa decide da solo, i tre punti in cui decide un umano, cosa nessuno fa mai, la policy sulla coin. È anche la base del prompt di Grok Bot.
2. **`content/`**: canon, diario, episodi e dati della coin. Li scrive l'agente.
3. **Il sito**: si ricostruisce da solo a ogni commit su `main` (GitHub Actions → GitHub Pages) e mostra quello che c'è in `content/`.

I contenuti pubblici sono in inglese, perché il pubblico della coin e dei social è internazionale. Questo README è in italiano perché è per te.

## Chi fa cosa

| Chi | Cosa |
|---|---|
| **Claude Code** (o Claude in chat) | Costruisce e mantiene l'infrastruttura: questo repo, il sito, le skill di Grok Bot, i flussi n8n. Non scrive i contenuti del personaggio |
| **Grok Bot** | Fa girare il personaggio: ideazione, canon, contenuti, pubblicazione, diario, aggiornamento del sito via commit |
| **n8n** | Le "mani" di Grok Bot: otto strumenti (pubblicazione via Blotato e API di X, upload dei media, commit validati nel repo, radar via Apify, dati delle coin, registro). Mette i tetti, i flag AI fissi e i controlli, registra tutto e fa da interruttore. Contratto in `agent/integrations.md`; i workflow stanno fuori dal repo |
| **Tu (operatore)** | I tre gate della costituzione: conferma del lancio, wallet, firma delle modifiche alle regole |

## Struttura

```
CONSTITUTION.md            regole dell'agente (le cambia solo l'operatore, sezione 9)
content/
  index.njk                home
  origin.md                nascita del personaggio (la scrive l'agente in ideazione)
  canon/character.md       fonte di verità del personaggio
  journal/                 diario dello showrunner, un file per voce
  episodes/                archivio dei contenuti pubblicati, un file per episodio
  _data/site.json          nome, tagline, stato, link agli account
  _data/theme.json         colori del sito (dalla palette del canon)
  _data/coin.json          dati della coin e disclosure
  _data/radar.json         riepilogo pubblico del radar (lo scrive l'agente in R0)
  media/                   immagini di riferimento (piccole)
docs/CONTENT_FORMATS.md    formati dei file per l'agente (da dare a Grok Bot)
agent/                     la skill di Grok Bot: SKILL.md, START.md (digest), ideazione, routine,
                           radar.md (R0) e radar/watchlist.md, integrations.md (gli strumenti n8n),
                           configurazione, state.json (stato, lo scrive il bot);
                           SETUP.md (in italiano) spiega come installarla
PAUSED                     se esiste, il bot si ferma (lo crei e lo cancelli tu)
site/                      layout, CSS e JS del sito (non li tocca l'agente)
.github/workflows/         build e pubblicazione automatica
```

## Anonimato: da fare prima di pubblicare qualsiasi cosa

Il lancio su Anoncoin è anonimo, ma il repo, il sito e gli account possono ricondurre a te se usi le tue identità. Il progetto ha bisogno di un'identità separata:

1. **Casella email del progetto** con un nome in codice neutro (senza il tuo nome, senza "grok", senza il nome del personaggio, che ancora non esiste). È il retrobottega: login, codici, fatture; il pubblico non la vede mai. Per avere più account sullo stesso servizio usa gli indirizzi con il "+" (`casella+gestione@…`). Le caselle gratuite appena create possono non ricevere le email di registrazione finché non hanno un recupero: puoi usare temporaneamente una tua email personale come recupero (la vede solo il provider) e sostituirla con il numero del progetto appena c'è.
2. **SIM o eSIM prepagata dedicata al progetto**: serve per la spunta di X, i social, il recupero degli account. È intestata a te (lo sa l'operatore, non il pubblico). Mai numeri temporanei o VoIP: sono condivisi e insicuri.
3. **Profilo Chrome separato** per tutti gli account del progetto, senza estensioni e senza sincronizzazione. Niente "Accedi con Google/Apple": solo email e password, con verifica in due passaggi ovunque.
4. **Account GitHub nuovo** con un **nome neutro del progetto** (qui `showrunner-lab`), non del personaggio: il repo va online prima che il bot scelga il personaggio, e il nome dell'account finisce nell'indirizzo provvisorio del sito. **Non il tuo account personale**: un repo pubblico sotto il tuo account ti identifica.
5. **Identità git locale** solo per questo repo (non quella globale):
   ```
   git config user.name "<nome del progetto>"
   git config user.email "<id>+<account>@users.noreply.github.com"
   ```
   L'indirizzo noreply lo trovi in GitHub → Settings → Emails, dopo aver attivato "Keep my email address private".
6. **Due account X, creati subito:**
   - **di gestione** (qui `@showrunnerlab`), nome neutro: l'etichetta "automated" del personaggio mostra "Automated by" questo account, e va nella costituzione prima della firma. Non pubblica mai niente;
   - **provvisorio del personaggio**, con handle casuale, nessuna foto, nessun post. Dopo l'ideazione lo **rinomini** con l'handle scelto dal bot: così quando il personaggio debutta l'account ha già qualche settimana (la spunta Premium richiede un account di circa 90 giorni). Se l'abbonamento xAI chiede un account X, si lega a questo.
7. **Dominio**: lo sceglie il bot in ideazione insieme al nome e agli handle; lo compri tu subito dopo, con privacy WHOIS attiva (`agent/SETUP.md`, sezione 7). Un indirizzo email sul dominio è facoltativo e solo come inoltro verso la casella del progetto.
8. Niente foto, handle o testi riusati dai tuoi profili. Attenzione anche ai metadati delle immagini.

L'anonimato vale verso il pubblico, non verso il fisco: fee e plusvalenze restano da dichiarare.

## Messa online (una volta, circa 15 minuti)

1. Con l'account GitHub del progetto crea un repo **pubblico** vuoto: `showrunner-lab/showrunner-agent`. Deve essere pubblico: GitHub Pages è gratis solo sui repo pubblici, e un repo pubblico è anche la prova di trasparenza.
2. Da questa cartella (terminale in `C:\dev\showrunner-agent`), dopo aver impostato l'identità git del punto 3 qui sopra:
   ```
   git init -b main
   git add .
   git commit -m "Infrastructure, site and constitution 0.1.0 (draft)"
   git remote add origin https://github.com/showrunner-lab/showrunner-agent.git
   git push -u origin main
   ```
   Le credenziali con cui fai il push devono essere quelle dell'account del progetto (Git Credential Manager le chiede la prima volta; se sei già loggato con il tuo account personale, usa un token dell'account del progetto).
3. Nel repo: **Settings → Pages → Source: GitHub Actions**. Al push successivo, o con *Actions → Build and deploy site → Run workflow*, il sito va online su `https://showrunner-lab.github.io/showrunner-agent/`.
4. Dominio (opzionale, circa 10–15 €/anno): *Settings → Pages → Custom domain*. Il workflow si adatta da solo.

## Dare l'accesso a Grok Bot

- Crea un **fine-grained personal access token** dell'account del progetto, limitato a **questo solo repo**, con permesso *Contents: read and write*, e scadenza.
- Il token va **in n8n**, che fa i commit dopo aver controllato percorsi e contenuti. **Non** va a Grok Bot, che legge il repo pubblico senza token e scrive solo con lo strumento `repo_write`. Mai in un file del repo.
- L'installazione completa dello showrunner su Grok Bot (skill, connettori, autonomia, routine) è in `agent/SETUP.md`.
- Prima di fidarti, prova: i test sono in `agent/SETUP.md`, sezione 6.

## Anteprima in locale

```
npm install
npm run dev
```
Poi apri `http://localhost:8080`.

## Prima di firmare la costituzione

Nel file restano tre segnaposto tra parentesi quadre:

- **`[CHARACTER_NAME]`** e **`[COIN_STATUS]`**: li compila l'agente dopo l'ideazione;
- **`[MANAGING_X]`**: l'account X del progetto che gestisce il personaggio (vedi "Anonimato").

La costituzione non contiene impegni su vendite o uso delle fee. Contiene solo una frase generica, nella pagina Coin e nell'avviso di rischio: "chi sta dietro al progetto può detenere la coin e incassa fee sugli scambi". Non è un impegno e non rivela niente; è la disclosure minima che le linee guida Consob/ESMA chiedono a chi promuove un asset in cui ha un interesse. Toglierla aumenta il rischio senza dare nulla in cambio.

Per firmare: compila i segnaposto, cambia `not signed` in `signed` con la data in testa al file e nella sezione 12, poi scrivi una voce di diario `type: gate`, `gate: G3`.

Non è consulenza legale. Prima della firma conviene far leggere le sezioni 4 e 5 a un avvocato esperto di MiCA e Consob.
