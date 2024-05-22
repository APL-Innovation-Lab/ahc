cd cemeteries
curl -fsSL https://raw.githubusercontent.com/drud/ddev/master/scripts/install_ddev.sh
ddev start
ddev import-db --file=db.sql.gz
ddev composer update