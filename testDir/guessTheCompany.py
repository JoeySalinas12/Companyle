import requests
import random
import pandas as pd
from bs4 import BeautifulSoup


def get_url_content(url: str):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html')

    return soup

def get_table_from_url_content(soup):
    table = soup.find('table', {'class': 'wikitable'})
    df = pd.read_html(str(table))[0]

    return df

URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'

content = get_url_content(URL)
print(get_table_from_url_content(content))