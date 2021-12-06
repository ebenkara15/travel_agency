from mysql import connector
from pathlib import Path
import hashlib, base64


db = connector.connect(
    host = input("Host: tap `Enter` for default ('localhost')\n"),
    user = input("User:\n"),
    password = input("Password:\n"),
    database = 'travel_agency_db'
)

cursor = db.cursor()

#############################
# Populate `station` table ##
#############################

with open('./stations.txt', 'r') as f:
    raw_vals = f.readlines()

vals = []
for val in raw_vals:
    val = val.strip('\n').split(',')
    val[0] = int(val[0])
    val[1] = val[1].strip('\'')
    vals.append(tuple(val))

stmt = "INSERT INTO station (idstation, station_name, station_city) VALUES (%s, %s, %s)"

cursor.executemany(stmt, vals)
db.commit()


##############################
# Populate `discount` table ##
##############################
with open('./discounts.txt', 'r') as f:
    raw_vals = f.readlines()

vals = []
for val in raw_vals:
    val = val.strip('\n').split(',')
    val[0] = int(val[0])
    val[2] = float(val[2])
    val[1] = val[1].strip('\'')
    vals.append(tuple(val))

print(vals)

stmt = "INSERT INTO discount (iddiscount, disc_desc, percentage) VALUES (%s, %s, %s)"
cursor.executemany(stmt, vals)
db.commit()


##############################
# Populate `train` table    ##
##############################
with open('./trains.txt', 'r') as f:
    raw_vals = f.readlines()

vals = []
for val in raw_vals:
    val = val.strip('\n').split(',')
    val[0] = int(val[0])
    val[1] = int(val[1])
    val[2] = int(val[2])
    val[3] = int(val[3])
    val[4] = int(val[4])
    val[5] = int(val[5])
    val[6] = int(val[6])
    val[7] = int(val[7])
    val[8] = int(val[8])
    vals.append(tuple(val))

print(vals)

stmt = """INSERT INTO train (idtrain, idcoach_1, idcoach_2, idcoach_3, idcoach_4, idcoach_5, idcoach_6, idcoach_7, idcoach_8 ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
cursor.executemany(stmt, vals)
db.commit()


##############################
# Populate `travel` table    ##
##############################
with open('./travels.txt', 'r') as f:
    raw_vals = f.readlines()

vals = []
for val in raw_vals:
    val = val.strip('\n').split(',')
    val[0] = int(val[0])
    val[1] = int(val[1])
    val[2] = int(val[2])
    val[5] = float(val[5])
    val[6] = int(val[6])
    vals.append(tuple(val))

print(vals)

stmt = """INSERT INTO travel (idtravel, station_from, station_to, datetime_from, datetime_to, price, idtrain) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
cursor.executemany(stmt, vals)
db.commit()

##############################
# Populate `client` table   ##
##############################
with open('./clients.txt', 'r') as f:
    raw_vals = f.readlines()

vals = []
for val in raw_vals:
    val = val.strip('\n').split(',')
    val[0] = int(val[0])
    val[4] = int(val[4])
    h = hashlib.sha256()
    h.update(val[5].encode('utf-8'))
    val[5] = (base64.b64encode(bytearray.fromhex(h.hexdigest()))).decode('utf-8')
    vals.append(tuple(val))

print(vals)

stmt = """INSERT INTO travel (idtravel, station_from, station_to, datetime_from, datetime_to, price, idtrain) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
cursor.executemany(stmt, vals)
db.commit()