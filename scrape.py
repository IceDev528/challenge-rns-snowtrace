import requests
from bs4 import BeautifulSoup
import sqlite3
import time

# Function to scrape the gas price
def scrape_gas_price():
    url = "https://snowtrace.io/gastracker"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    med_gas_price = soup.find("span", {"class": "text-blue-600"}).text
    return med_gas_price

# Function to create or connect to the database
def create_or_connect_db():
    conn = sqlite3.connect("gas_prices.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS gas_prices
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 price TEXT,
                 timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    return conn

# Function to insert gas price into the database
def insert_gas_price(conn, price):
    c = conn.cursor()
    c.execute("INSERT INTO gas_prices (price) VALUES (?)", (price,))
    conn.commit()

if __name__ == "__main__":
    conn = create_or_connect_db()
    while True:
        gas_price = scrape_gas_price()
        insert_gas_price(conn, gas_price)
        print("Gas price scraped and stored:", gas_price)
        time.sleep(1800)  # Sleep for 30 minutes