import requests
from bs4 import BeautifulSoup

# Функция для извлечения HTML страницы
def get_html(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Проверка успешности запроса
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return None

# Функция для парсинга страницы объявлений
def parse_olx(url):
    html = get_html(url)
    if html is None:
        print("Failed to retrieve HTML.")
        return
    
    soup = BeautifulSoup(html, 'html.parser')

    # Обновленные селекторы для поиска объявлений
    ads = soup.find_all('div', class_='css-1sw7q4x')  # Проверьте правильность класса
    if not ads:
        print("No ads found on the page.")
        return

    # Итерация по объявлениям и извлечение нужной информации
    for ad in ads:
        title_tag = ad.find('h6')  # Проверьте правильность тега
        price_tag = ad.find('p', class_='css-1q7mqm7')  # Проверьте правильность класса
        location_tag = ad.find('span', class_='css-17vvqxk')  # Проверьте правильность класса

        title = title_tag.text.strip() if title_tag else "No title"
        price = price_tag.text.strip() if price_tag else "No price"
        location = location_tag.text.strip() if location_tag else "No location"

        print(f'Title: {title}')
        print(f'Price: {price}')
        print(f'Location: {location}')
        print('-' * 20)

# URL страницы с объявлениями
url = 'https://www.olx.ua/d/uk/elektronika/'
parse_olx(url)

