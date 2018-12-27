echo "Start deployment"
cd /var/www/blog/test
echo "pulling source code..."
git clean -f
git pull
echo "Finished."