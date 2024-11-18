#!/bin/bash

# Parametri di connessione al DB
DB_HOST="db"  # Nome del container del database (o l'IP se non usi Docker)
DB_PORT="3306"  # Porta del database (modifica secondo il tipo di DB)

# Tempo di attesa tra i tentativi (in secondi)
WAIT_TIME=2

# Limite di tentativi (numero massimo di volte che proverà a connettersi)
MAX_RETRIES=30

# Controlla se il database è pronto
echo "Attendo che il database sia pronto..."

for i in $(seq 1 $MAX_RETRIES); do
  # Prova a connettersi al database usando nc
  nc -z "$DB_HOST" "$DB_PORT" && break
  echo "Tentativo $i di $MAX_RETRIES: il database non è pronto, attendo $WAIT_TIME secondi..."
  sleep $WAIT_TIME
done

# Se il database è pronto, avvia l'app
echo "Il database è pronto, avvio l'app!"
exec "$@"
