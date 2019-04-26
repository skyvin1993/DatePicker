import React from 'react'
import PropTypes from 'prop-types'
import {SingleDatePicker} from 'react-dates'
import moment from 'moment'

import Icon from './Icon'

import 'react-dates/lib/css/_datepicker.css'
import '../DatePicker.scss'

import arrowLeft from '../calendar-arrow-left.png'
import arrowRight from '../calendar-arrow-right.png'

/**
 * DatePicker
 */
class DatePicker extends React.Component {

    state = {
        date: this.props.date,
        focused: this.props.focused,
        showError: true
    };

    /**
     * Возврат флага для показа ошибок this.inputRef.current.resetInputError();
     * вызывается когда может произойти смена props error
     */
    resetInputError() {

        this.setState({ showError: true });

    }

    render() {
        const {customStyles, customCSS, placeholder, numberMonths, disabled, inputRef, customOutsideDaysFn, enableOutsideDays, error, id} = this.props;
        let {focused, date, showError} = this.state;

        const styleNotEmpty = date ? 'DatePicker-not-empty' : '';
        const styleFocused = focused ? 'DatePicker-focused' : '';
        const styleError = (error && showError) ? 'DatePicker-error' : '';

        return (
            <div style={customStyles}
                 className={`DatePicker ${customCSS || ''} ${styleNotEmpty} ${styleFocused} ${styleError}`}>
                <label className="DatePicker-label">{placeholder}</label>
                <SingleDatePicker
                    date={date}
                    onDateChange={date => this.handleDateChange({date})}
                    focused={focused}
                    onFocusChange={({focused}) => this.handleFocused(focused)}
                    numberOfMonths={document.documentElement.clientWidth > 540 ? numberMonths : 1}
                    hideKeyboardShortcutsPanel={true}
                    placeholder=""
                    readOnly={true}
                    disabled={disabled}
                    customInputIcon={(<Icon icon_type="calendar"/>)}
                    inputIconPosition="after"
                    noBorder={true}
                    block={true}
                    displayFormat={() => moment.localeData().longDateFormat('LL')}
                    renderDayContents={(day) => DatePicker.renderDayContents(day)}
                    daySize={30}
                    navPrev={(<img src={arrowLeft} alt="<" className="navPrev"/>)}
                    navNext={(<img src={arrowRight} alt=">" className="navNext"/>)}
                    isOutsideRange={customOutsideDaysFn ? customOutsideDaysFn() : this.outsideRange()}
                    enableOutsideDays={enableOutsideDays}
                    id={id}
                    ref={inputRef}
                />
                { error && showError &&
                    <div className="DatePicker-error-text"><p>{error}</p></div>
                }
            </div>
        )
    }

    /**
     * Обработчик события выбора даты
     *
     * @param date {object} moment
     */
    handleDateChange(date) {

        this.setState(date);

        this.props.onChangeHandler();

    }

    /**
     * Обработчик события фокуса
     *
     * @param focused {boolean} - состояние фокуса
     */
    handleFocused(focused) {

        this.setState({focused, showError: this.props.error === ""});

        this.props.onFocusHandler(focused, this.props.name);
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
     * Функция, которая определяет лежит ли дата вне разрешенного диапазона
     *
     * @return {function}
     */
    outsideRange() {

        if (this.props.enableOutsideDays) {

            return () => false

        } else {

            return (date) => {return date.isBefore(moment(), 'day')}

        }
    }

}

DatePicker.displayName = "DatePicker";

DatePicker.defaultProps = {
    inputRef: null,
    numberMonths: 1,
    customStyles: null,
    customCSS: "",
    focused: false,
    date: null,
    disabled: false,
    enableOutsideDays: false,
    customOutsideDaysFn: null,
    onFocusHandler: () => {},
    onChangeHandler: () => {}
};

DatePicker.propTypes = {
    inputRef: PropTypes.func, // ref компонента
    placeholder: PropTypes.string.isRequired, // placeholder
    numberMonths: PropTypes.number, // число месяцев в выборе
    customStyles: PropTypes.object, // кастомные стили
    customCSS: PropTypes.string, // кастомный css класс
    focused: PropTypes.bool, //
    date: PropTypes.object, // moment object
    disabled: PropTypes.bool, // disabled атрибут
    enableOutsideDays: PropTypes.bool, // разрешить выбирать прошедшие даты
    customOutsideDaysFn: PropTypes.func, // кастомное правило определения OutsideRange
    onFocusHandler: PropTypes.func, // обработчик события фокуса
    onChangeHandler: PropTypes.func, // обработчик события выбора даты
};

export default DatePicker;
