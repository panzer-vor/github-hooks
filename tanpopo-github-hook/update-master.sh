echo "Start deployment"
cd /var/www/blog/line
echo "pulling source code..."
git clean -f
git pull
echo "Finished."