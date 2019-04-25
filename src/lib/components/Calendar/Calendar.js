import React, {Component} from 'react';
import 'react-dates/initialize'
import DatePicker from '../DatePicker/DatePicker'
import DateRangePicker from '../DateRangePicker/DateRangePicker'
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/uk'
import 'moment/locale/es'
import PropTypes from 'prop-types'

const FORMATS = {
    DATE_PICKER: 'date_picker',
    DATE_RANGE_PICKER: 'date_range_picker'
};

/**
 * Calendar - класс рендерит календарь соответствующего типа
 */
class Calendar extends Component {

    constructor(props) {
        super(props);

        const defaultSettings = {
            format: FORMATS.DATE_PICKER,
            locale: 'ru'
        };

        this.settings = {
            ...defaultSettings,
            ...props.settings
        };

    }

    componentDidMount() {

        moment.locale(this.settings.locale);

    }

    /**
     * Возвращает дату как объект moment или null
     * @param dateStr - строчное представление даты в формате YYYY-MM-DD
     * @returns {object || null}
     */
    getDate(dateStr) {
        return dateStr ? moment(dateStr) : null;
    }

    /**
     * монтирует календарь типа DatePicker
     * @returns {JSX-элемент}
     */
    renderDatePicker() {
        const { pickerConfig } = this.props;

        return (
            <DatePicker
                customStyles = {pickerConfig.customStyles}
                customCSS = {pickerConfig.customCSS}
                placeholder = {pickerConfig.placeholder}
                numberMonths = {pickerConfig.numberMonths}
                disabled = {pickerConfig.disabled}
                enableOutsideDays = {pickerConfig.enableOutsideDays}
                name = {pickerConfig.name}
                id = {pickerConfig.id}
                date = {this.getDate(pickerConfig.date)}
                focused={pickerConfig.focused}
            />
        )
    }

    /**
     * монтирует календарь типа DateRangePicker
     * @returns {JSX-элемент}
     */
    renderDateRangePicker() {
        const { pickerConfig } = this.props;

        return (
            <DateRangePicker
                customStyles = {pickerConfig.customStyles}
                customCSS = {pickerConfig.customCSS}
                id = {pickerConfig.id}
                startDate = {this.getDate(pickerConfig.date)}
                endDate = {this.getDate(pickerConfig.dateEnd)}
                numberMonths = {pickerConfig.numberMonths}
                disabled = {pickerConfig.disabled}
                enableOutsideDays = {pickerConfig.enableOutsideDays}
                dateStartText = {pickerConfig.dateStartText}
                dateEndText = {pickerConfig.dateEndText}
            />
        )
    }

    render() {
        const { format } = this.settings;

        switch (format){
            case FORMATS.DATE_PICKER:
                return this.renderDatePicker();
            case FORMATS.DATE_RANGE_PICKER:
                return this.renderDateRangePicker();
            default:
                return this.renderDatePicker();
        }
    }
}

Calendar.displayName = 'Calendar';

Calendar.defaultProps = {
    settings: {}
};

Calendar.propTypes = {
    settings: PropTypes.object, //Базовые настройки календаря
    pickerConfig: PropTypes.object.isRequired //Конфигурация
};

export default Calendar;
