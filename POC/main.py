import random
import pandas as pd

def import_csv_to_df(file_path: str = "S&P_500_companies.csv") -> pd.DataFrame:
    """Imports a csv file into a dataframe

    Args:
        file_path (str, optional): path to the csv file. Defaults to "S&P_500_companies.csv".

    Returns:
        pd.DataFrame: dataframe containing the csv file
    """
    df = pd.read_csv(file_path)
    return df


def pick_random_company(sp500_df: pd.DataFrame) -> dict:
    """_summary_

    Args:
        sp500_df (pd.DataFrame): dataframe containing the s&p 500 companies and their respective information

    Returns:
        dict: attributes of the randomly selected company
    """
    N = len(sp500_df)
    random_digit = random.randint(0,N-1)
    
    random_company = sp500_df.iloc[random_digit]
    
    return random_company


# create a simple guessing game where the user guesses the name of the company
if __name__ == "__main__":

    file_path = "S&P_500_companies.csv"
    sp500_df = import_csv_to_df(file_path)
    random_company = pick_random_company(sp500_df)

    print(f"Guess the name of the company: \n{random_company[['Symbol', 'GICS Sector', 'GICS Sub-Industry','Headquarters Location', 'Founded', 'Market Cap', 'Stock Price', 'Revenue']]}")

    guess_count = 0
    while guess_count < 6:
        user_guess = input("Guess the name of the company: ")
        if user_guess.lower() in random_company["Security"].lower():
            print("Correct! You win! It was :", random_company["Security"])
            break
        else:
            print("Incorrect. Try again.")
            guess_count += 1

    if guess_count == 6:
        print("Sorry, you lose. The correct answer was:", random_company["Security"])