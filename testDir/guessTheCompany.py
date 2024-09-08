import requests
import random
import pandas as pd
from bs4 import BeautifulSoup


def get_df_from_table(url: str, table_number: int) -> pd.DataFrame:
    """ Create a dataframe from a specified table within a webpage

    Args:
        url (str): wikipedia url that contains the necessary table
        table_number (int): the specific table that you wish to traverse through

    Returns:
        pd.DataFrame: table in dataframe form
    """
    # Get the page's HTML content
    response = requests.get(URL)

    # Convert the table to a Pandas DataFrame
    df = pd.read_html(response.content, flavor='lxml')[table_number]

    return df


def pick_random_company(sp500_df: pd.DataFrame) -> dict:
    """_summary_

    Args:
        sp500_df (pd.DataFrame): dataframe containing the s&p 500 companies and their respective information

    Returns:
        dict: attributes of the randomly selected company
    """
    N = len(sp500_df)
    for i in range(100):
        random_digit = random.randint(0,N-1)
    
    random_company = {
        "Name":sp500_df.iloc[random_digit]["Security"], 
        "Sector":sp500_df.iloc[random_digit]["GICS Sector"], 
        "Founded":sp500_df.iloc[random_digit]["Founded"], 
        "Headquarters":sp500_df.iloc[random_digit]["Headquarters Location"]
        }
    
    return random_company


URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
table_number = 0

# sp500_df = get_df_from_table(URL, table_number)
# print(pick_random_company(sp500_df))

