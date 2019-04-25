import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../Calendar/Calendar';

class ReactDatePicker {

    static init() {

        const containerClass = 'react-calendar';

        const calendarContainers = document.getElementsByClassName(containerClass);

        if( calendarContainers.length > 0 ) {
            Array.from(calendarContainers).forEach(container => {

                const id = container.getAttribute('id');

                const settings = {
                    format: container.getAttribute('data-format'),
                    locale: container.getAttribute('data-locale')
                };
                const pickerConfig = {
                    placeholder: container.getAttribute('data-placeholder'),
                    numberMonths: container.getAttribute('data-numberMonths'),
                    customStyles: container.getAttribute('data-customStyles'),
                    customCSS: container.getAttribute('data-customCSS'),
                    focused: container.getAttribute('data-focused'),
                    date: container.getAttribute('data-date'),
                    dateEnd: container.getAttribute('data-dateEnd'),
                    dateStartText: container.getAttribute('data-dateStartText'),
                    dateEndText: container.getAttribute('data-dateEndText'),
                    disabled: container.getAttribute('data-disabled'),
                    enableOutsideDays: container.getAttribute('data-enableOutsideDays'),
                    id: `${id}-input`
                };

                const settingsOut = {};
                const pickerConfigOut = {};
                for( const key in settings ) {
                    if(settings[key] !== undefined && settings[key] !== null ) {
                        settingsOut[key] = settings[key];
                    }
                }

                for( const key in pickerConfig ) {
                    if(pickerConfig[key] !== undefined && pickerConfig[key] !== null ) {
                        pickerConfigOut[key] = pickerConfig[key];
                    }
                }

                if( id ) {
                    ReactDOM.render(<Calendar settings={settingsOut} pickerConfig={pickerConfigOut} />, document.getElementById(id));
                }

            });
        }

    }

}

export default ReactDatePicker;
