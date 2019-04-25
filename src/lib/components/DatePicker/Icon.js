import React from 'react'
import PropTypes from 'prop-types'

class Icon extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            className: ""
        };

        this.handleIconClick = this.handleIconClick.bind(this);

    }

    componentDidMount() {

        let {icon_type} = this.props;

        let className = "";

        switch (icon_type) {
            case "password":
                className = 'field-password-hide';
                break;
            case "calendar":
                className = 'field-calendar';
                break;
            case "search":
                className = 'field-search';
                break;
            default:
                break;
        }

        if (className) {
            this.setState({className});
        }
    }

    render() {

        return (
            <span className={this.state.className} onClick={this.handleIconClick}/>
        );
    }

    /**
     * Обработчик клика по иконке
     */
    handleIconClick() {

        let {icon_type} = this.props;

        if (icon_type === 'password') {

            if (this.state.className === 'field-password-show') {

                this.setState({className: 'field-password-hide'});

                this.props.iconClick('password');

            } else {

                this.setState({className: 'field-password-show'});

                this.props.iconClick('text');
            }
        } else if (icon_type === 'search') {

            this.props.iconClick();

        }
    }
}

Icon.displayName = "Icon";

Icon.propTypes = {
    icon_type: PropTypes.oneOf(['password', 'calendar', 'search']).isRequired,
    iconClick: PropTypes.func
};

export default Icon;