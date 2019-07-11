FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db blog --collection user --type json --file /init.json --jsonArray