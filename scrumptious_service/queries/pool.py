import pymongo
import os


client = pymongo.MongoClient(os.environ.get("MONGO_URL"))
db = client["Scrumptious"]
