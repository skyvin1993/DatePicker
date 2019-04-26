
# Datepicker
За основу взят компонент https://github.com/airbnb/react-dates от AirBnb

Скрипт ищет на странице DOM-узлы с классом react-calendar (контейнер) и монтирует в него соответствующий компонент Calendar.
Параметры в компонент передаются посредством data-атрибутов и атрибута `id` контейнера

    <div class="container react-calendar" id="datepicker" data-date="2019-03-05" data-placeholder="Дата"></div>

## Список доступных data-атрибутов

 - **data-format**- формат календаря
	 - `date_picker` - дата
	 - `date_range_picker` - диапазон дат
 -  **data-locale** - локализация
 - **data-placeholder** - placeholder
 - **data-numberMonths** - число месяцев в выборе
 - **data-customStyles** - кастомные стили
 - **data-customCSS** - кастомный css класс
 - **data-focused** - получит ли фокус календарь при инициализации (bool)
 - **data-date** - дата по-умолчанию для формата `date_picker`; начальная дата для формата `date_range_picker` (Формат YYYY-MM-DD)
 - **data-dateEnd** - конечная дата для формата `date_range_picker` (Формат YYYY-MM-DD)
 - **data-dateStartText** - placeholder для начальной даты `date_range_picker`
 - **data-dateEndText**- placeholder для конечной даты `date_range_picker`
 - **data-disabled** - доступ для редактирования (bool)
 - **data-enableOutsideDays** - разрешить выбирать прошедшие даты (bool)

**id** - уникальный идентификатор календаря. Позволяет идентифицировать `<input />` элемента с результатами выбора даты.
## Генерируемые ID
Для `date_picker` = **id**-input

Для `date_range_picker`
 - Начальная дата = **id**-input_start
 - Конечная дата = **id**-input_end
