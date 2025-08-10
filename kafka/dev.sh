#!/bin/bash

echo "🚀 Starting all services in development mode..."

services=(
  "order-service"
  "payment-service"
  "inventory-service"
  "notification-service"
  "analytics-service"
)

start_service() {
  local service=$1
  echo "📦 Starting $service..."
  cd "$service" && npm start &
  cd ..
}

for service in "${services[@]}"; do
  if [ -d "$service" ]; then
    start_service "$service"
  else
    echo "⚠️  Warning: Directory $service not found"
  fi
done

echo "✅ All services started!"
echo "💡 Press Ctrl+C to stop all services"

wait
