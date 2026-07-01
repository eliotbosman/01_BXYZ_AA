#!/usr/bin/env bash
set -e

WP=/var/www/html

echo "==> Waiting for WordPress files to be ready..."
until [ -f "$WP/wp-config.php" ]; do sleep 2; done
sleep 3

echo "==> Checking if WordPress is already installed..."
if wp core is-installed --path="$WP" --allow-root 2>/dev/null; then
  echo "==> WordPress already installed — running seed only."
  mkdir -p "$WP/wp-content/uploads"
  chmod -R 775 "$WP/wp-content/uploads" 2>/dev/null || true
  wp eval-file /setup/seed-data.php --path="$WP" --allow-root
  exit 0
fi

echo "==> Installing WordPress..."
wp core install \
  --path="$WP" \
  --url="http://localhost:8080" \
  --title="bxyz-anjaaurand" \
  --admin_user="admin" \
  --admin_password="admin1234" \
  --admin_email="admin@bxyz.local" \
  --skip-email \
  --allow-root

echo "==> Installing plugins..."
wp plugin install advanced-custom-fields --activate --path="$WP" --allow-root
wp plugin install classic-editor --activate --path="$WP" --allow-root

# Disable default plugins we don't need
wp plugin deactivate hello akismet --path="$WP" --allow-root 2>/dev/null || true

echo "==> Activating theme..."
wp theme activate bxyz-anjaaurand --path="$WP" --allow-root

echo "==> Setting permalink structure..."
wp rewrite structure "/%postname%/" --path="$WP" --allow-root
wp rewrite flush --path="$WP" --allow-root

echo "==> Configuring WordPress options..."
wp option update blogname "bxyz-anjaaurand" --path="$WP" --allow-root
wp option update blogdescription "" --path="$WP" --allow-root
wp option update timezone_string "Europe/Amsterdam" --path="$WP" --allow-root

echo "==> Preparing uploads directory..."
mkdir -p "$WP/wp-content/uploads"
chmod -R 775 "$WP/wp-content/uploads" 2>/dev/null || true

echo "==> Seeding project data..."
wp eval-file /setup/seed-data.php --path="$WP" --allow-root

echo ""
echo "========================================"
echo "  Setup complete!"
echo "  Visit: http://localhost:8080"
echo "  Admin: http://localhost:8080/wp-admin"
echo "  User:  admin / admin1234"
echo "========================================"
