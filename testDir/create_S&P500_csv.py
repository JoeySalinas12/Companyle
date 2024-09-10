import requests
import pandas as pd


def get_df_from_url(url: str) -> pd.DataFrame:
    """ Create a dataframe from a specified table within a webpage

    Args:
        url (str): wikipedia url that contains the necessary table
        table_number (int): the specific table that you wish to traverse through

    Returns:
        pd.DataFrame: table in dataframe form
    """

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises HTTPError for bad responses
        df = pd.read_html(response.content, flavor='lxml')[0]
    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        df = pd.DataFrame()  # Return an empty dataframe if there's an error
    return df


def combine_dfs(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    """Combines both dataframes into a single dataframe, retaining only the necessary columns

    Args:
        df1 (pd.DataFrame): df containing the s&p 500 companies and their respective information - from wikipedia
        df2 (pd.DataFrame): df containing the s&p 500 companies and their respective information - from stock analysis

    Returns:
        pd.DataFrame: combined dataframe
    """
    df_joined = pd.merge(
        df1[['Symbol', 'Security', 'GICS Sector', 'GICS Sub-Industry','Headquarters Location', 'Founded']],
        df2[["Symbol", "Market Cap", "Stock Price", "Revenue"]],
        on='Symbol')

    return df_joined

def check_for_null_values(df: pd.DataFrame) -> None:
    """Combs through the dataframe and checks for null values

    Args:
        df (pd.DataFrame): dataframe that you want to check for null values
    """
    if df.isnull().values.any():
        print("There are null values in the combined dataframe")
    else:
        print("There are no null values in the combined dataframe")

def df_to_csv(df: pd.DataFrame, file_path: str = "S&P_500_companies.csv") -> None:
    """Creates a csv file from a dataframe

    Args:
        df (pd.DataFrame): dataframe that you want to save
    """
    df.to_csv(file_path, index=False)
    print(f"DataFrame saved to {file_path}")


if __name__ == "__main__":
    WIKI_URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
    SA_URL = 'https://stockanalysis.com/list/sp-500-stocks/'

    wiki_df = get_df_from_url(WIKI_URL)
    stock_df = get_df_from_url(SA_URL)

    combined_df = combine_dfs(wiki_df, stock_df)
    check_for_null_values(combined_df)

    df_to_csv(combined_df)
