echo "Start deployment"
cd /var/www/tanpopo/blog
echo "pulling source code..."
git clean -f
git pull
echo "Finished."