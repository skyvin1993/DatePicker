import React from 'react'
import PropTypes from 'prop-types'
import {DateRangePicker as ReactDatesDateRangePicker} from 'react-dates'
import moment from 'moment'


import 'react-dates/lib/css/_datepicker.css'
import './DatePicker.scss'

import arrowLeft from './calendar-arrow-left.png';
import arrowRight from './calendar-arrow-right.png';

/**
 * DateRangePicker - выбор диапазона дат
 */
class DateRangePicker extends React.Component {

    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        focusedInput: null
    };

    render() {

        let {customCSS, customStyle, name, id, disabled, enableOutsideDays, numberMonths, dateStartText, dateEndText} = this.props;
        let {focusedInput, startDate, endDate} = this.state;

        const styleFocused = focusedInput ? 'DatePicker-focused' : '';

        return (
            <div className={`MiniRangePicker ${customCSS} ${styleFocused}`} style={customStyle}>
                <label className="labelStart">{dateStartText}</label>
                <label className="labelEnd">{dateEndText}</label>
                <ReactDatesDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    startDateId={`${id}_start`}
                    endDateId={`${id}_end`}
                    onDatesChange={({startDate, endDate}) => this.dateChange({startDate, endDate})}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => this.setState({focusedInput})}
                    readOnly={true}
                    customArrowIcon={(<div className="customArrow"/>)}
                    startDatePlaceholderText=""
                    endDatePlaceholderText=""
                    disabled={disabled}
                    minimumNights={0}
                    isOutsideRange={this.outsideRange()}
                    daySize={30}
                    enableOutsideDays={enableOutsideDays}
                    navPrev={(<img src={arrowLeft} alt="<" className="navPrev"/>)}
                    navNext={(<img src={arrowRight} alt=">" className="navNext"/>)}
                    renderDayContents={(day) => DateRangePicker.renderDayContents(day)}
                    hideKeyboardShortcutsPanel={true}
                    showClearDates={true}
                    numberOfMonths={document.documentElement.clientWidth > 540 ? numberMonths : 1}
                />
            </div>
        );
    }

    /**
     * Функция, которая определяет лежит ли дата вне разрешенного диапазона
     *
     * @return {function}
     */
    outsideRange() {

        if (this.props.enableRange === "past") {

            return (date) => {
                return date.isAfter(moment(), 'day')
            }

        } else if (this.props.enableRange === "future") {

            return (date) => {
                return date.isBefore(moment(), 'day')
            }

        } else {
            return () => false
        }

    }

    /**
     * Алгоритм рендера дней в календаре (выходные красим красным)
     *
     * @param day {object} - moment
     * @return {string} - html строка
     */
    static renderDayContents(day) {

        return (day.weekday() !== 5 && day.weekday() !== 6) ?
            <span>{day.format('D')}</span>
            :
            <span className="CalendarDay__day-off">{day.format('D')}</span>

    }

    /**
     * Выбор даты
     *
     * @param startDate
     * @param endDate
     */
    dateChange({startDate, endDate}) {

        this.setState({startDate, endDate});

        this.props.dateChangeHandler({startDate, endDate});

    }
}

DateRangePicker.displayName = "DateRangePicker";

DateRangePicker.defaultProps = {
    startDate: null,
    endDate: null,
    customCSS: "",
    customStyle: null,
    enableRange: "all",
    numberMonths: 2,
    disabled: false,
    enableOutsideDays: false,
    dateEndText: 'по',
    dateStartText: 'с',
    dateChangeHandler: () => {
    },
    name: "DateRangePicker"
};

DateRangePicker.propTypes = {
    startDate: PropTypes.object, // moment начальная дата
    endDate: PropTypes.object, // moment конечная дата
    customCSS: PropTypes.string, // кастомный класс
    customStyle: PropTypes.object, // кастомные стили
    name: PropTypes.string, // name компонента
    enableRange: PropTypes.oneOf(["future", "past", "all"]), // разрешенный диапазон выбора
    dateChangeHandler: PropTypes.func, // обработчик выбора даты
    numberMonths: PropTypes.number, // число месяцев в выборе
    disabled: PropTypes.bool, // disabled атрибут
    enableOutsideDays: PropTypes.bool, // разрешить выбирать прошедшие даты
    dateStartText: PropTypes.string, //текст начальной даты
    dateEndText: PropTypes.string, //текст конечной даты

};

export default DateRangePicker;
