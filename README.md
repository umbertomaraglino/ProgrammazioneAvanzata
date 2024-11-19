# ProgrammazioneAvanzata

## Obiettivo del Progetto

L'obiettivo di questo progetto è svluppare un backend che supporti il gioco della dama sviluppato nel seguente github: https://github.com/loks0n/rapid-draughts.<br>
Il sistema si fonda su un meccanismo in cui ogni utente deve essere autenticato tramite JWT e ha la possibilità di partecipare a partite contro un avversario controllato dall’intelligenza artificiale specificando la sua bravura.<br>
È supportata la gestione simultanea di più partite attive all’interno del sistema, consentendo a diversi utenti di sfidare l’IA senza interferenze reciproche. Tuttavia, un utente può essere coinvolto in una sola partita alla volta.<br>
La partita può essere interrotta perdendo però 0.5 punti, ma potendoli riguadagnare vincendo le partite; ogni partita vinta vale 1 punto.
In qualsiasi momento si può visuallizare lo storico delle mosse delle partite assocciate all'utente.<br>
Se si è admin è possibile visualizzare la lista degli utenti.<br>



## Diagrammi UML

### Casi d'uso

Di seguito viene mostrato il diaframma dei casi d'suo

![Casi d'uso](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/casiduso.png)

Di seguito vengono mostrati i diagrammi delle sequenze con la spiegazione delle rotte

### Register

![Register](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Register.png)

Il body deve essere costruito con email e password:

![Register2](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/register2.png)

In caso di successo della richiesta si otterrà:

![RegisterS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/registerS.png)

### Login

![Login](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Login.png)

Il body deve essere costruito con email e password:

![Register2](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/register2.png)

In caso di successo della richiesta si otterrà:

![LoginS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/LoginS.png)

### Users

![Users](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Users.png)

In caso di successo della richiesta si otterrà:

![UsersS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/UsersS.png)

### Refresh token

![RefreshToken](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/RefreshTokens.png)

Il body deve essere costruito con email e numero token da aggiungere:

![RefreshToken2](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/refreshtoken2.png)

In caso di successo della richiesta si otterrà:

![refreshTokenS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/refreshtokenS.png)

### Play

![play](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Play.png)

Il body deve essere costruito con la difficoltà:

![play2](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/play2.png)

In caso di successo della richiesta si otterrà:

![playS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/playS.png)

### Move

![Move](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Move.png)

Il body deve essere costruito con il numero della mossa:

![move2](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/move2.png)

In caso di successo della richiesta si otterrà:

![moveS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/moves.png)

Se la mossa non sarà valida verrà restituita la lista delle mosse valide:

![moveR](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/mover.png)


### History

![Move](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/History.png)

In caso di successo della richiesta si otterrà:

![historyS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/historys.png)

### State

![state](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/State.png)

In caso di successo della richiesta si otterrà:

![stateS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/stateS.png)

### Quit

![quit](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/Quit.png)

In caso di successo della richiesta si otterrà:

![quitS](https://github.com/umbertomaraglino/ProgrammazioneAvanzata/blob/main/Immagini/quitS.png)

## Pattern utilizzati
Di seguito verranno elencati i pattern utilzizati e le motivazioni

### MVC
Nel pattern MVC, le rotte sono un punto di ingresso che instrada le richieste verso il componente appropriato del sistema. Le rotte mappano gli URL a specifici controller, che si trovano nella parte Controller del pattern. Quando un utente invia una richiesta HTTP, il router analizza l'URL e decide quale controller e quale azione richiamare. Questo controller, a sua volta, interagisce con il modello per recuperare i dati necessari e con la vista per renderizzarli.

### Singleton
Il Singleton garantisce che ci sia un'unica istanza della connessione al database in tutto il ciclo di vita dell'applicazione. Questo è fondamentale per risparmiare risorse e gestire meglio le connessioni. In pratica, si crea una classe responsabile della connessione che, quando invocata, restituisce sempre la stessa istanza.

Quando il controller ha bisogno di accedere ai dati, utilizza il modello, il quale a sua volta utilizza la connessione fornita dal Singleton. La prima volta che il modello chiede una connessione, il Singleton la crea; le volte successive restituisce l'istanza già creata. Questo meccanismo assicura che non vengano aperte connessioni ridondanti al database.

### Chain of responsability
La Chain of Responsibility si realizza nei middleware, che sono componenti indipendenti che si occupano di controlli specifici lungo il flusso di una richiesta. Quando una richiesta arriva all'applicazione, passa attraverso una catena di middleware, ognuno dei quali può elaborarla, modificarla o decidere di fermarla.

Ad esempio, un middleware potrebbe controllare l'autenticazione, un altro la validità dei dati della richiesta, e un altro ancora i permessi. Se uno di questi middleware rileva un problema, blocca la catena e restituisce immediatamente una risposta all'utente. In caso contrario, la richiesta viene inoltrata al middleware successivo fino a raggiungere il controller.

Questa struttura consente di mantenere il codice modulare e riutilizzabile, dato che ogni middleware ha una responsabilità ben definita.

