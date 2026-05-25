#!/bin/sh
echo "Waiting for PostgreSQL to be fully ready and preventing Knex connection pool exhaustion..."
sleep 5

MAX_RETRIES=5
RETRY_COUNT=0

until [ $RETRY_COUNT -ge $MAX_RETRIES ]
do
    echo "Attempting to run database migrations (attempt $((RETRY_COUNT+1)) of $MAX_RETRIES)..."
    # Run the Medusa migration command
    npx medusa db:migrate && echo "Migrations completed successfully!" && break

    RETRY_COUNT=$((RETRY_COUNT+1))
    echo "Migration attempt failed (likely Knex timeout). Retrying in 10 seconds to let the pool recover..."
    sleep 10
done

if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    echo "Error: All migration attempts failed."
    exit 1
fi

echo "Proceeding with Medusa start..."
