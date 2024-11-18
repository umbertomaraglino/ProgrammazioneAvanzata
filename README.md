# ProgrammazioneAvanzata

## Obiettivo del Progetto

L'obiettivo di questo progetto è svluppare un backend che supporti il gioco della dama sviluppato nel seguente github: https://github.com/loks0n/rapid-draughts.
Il sistema si fonda su un meccanismo in cui ogni utente deve essere autenticato tramite JWT e ha la possibilità di partecipare a partite contro un avversario controllato dall’intelligenza artificiale specificando la sua bravura.
È supportata la gestione simultanea di più partite attive all’interno del sistema, consentendo a diversi utenti di sfidare l’IA senza interferenze reciproche. Tuttavia, un utente può essere coinvolto in una sola partita alla volta.
La partita può essere interrotta perdendo però 0.5 punti, ma potendoli riguadagnare vincendo le partite; ogni partita vinta vale 1 punto.
In qualsiasi momento si può visuallizare lo storico delle mosse delle partite assocciate all'utente.

