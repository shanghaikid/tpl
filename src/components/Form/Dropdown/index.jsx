import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../../BaseComponent';
import TextInput from '../TextInput';

import { validatable , withTooltip, popupable } from '../../Helper';
import { getClsName } from '../../../utils';

export class Dropdown extends BaseComponent {
    init() {
        // class
        this.baseClassName = `dropdown`;
        this.placeholderClass = this.getLibPrefixedClass('placeholder');
        // handlers
        this.close = this.close.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        // state
        this.state = this.transformState({
            isOpen: false,
            selectedIndex: -1,
            items: [],
            textInput: {
                inputValue: '',
                name: 'textInput'
            }
        });
    }

    componentDidMount() {
        document.addEventListener('click', (this._clickOrFocusAnywhereHandler = e => this._clickOrFocusAnywhere(e)));
        const {items} = this.props;

        this.setState({items});
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);
    }

    _clickOrFocusAnywhere(e) {
        // if the click was within self, ignore; otherwise, close self
        if (!this.domNode.contains(e.target)) {
            this.close();
        }
    }

    onClick(e) {
        this.setState({
            isOpen: !this.state.isOpen
        });
        const { index, selected} = e.target.dataset
        if (selected === 'false') {
            this.setState({
                selectedIndex: Number(index)
            }, this.onChange.bind(this));
        }
    }

    onChange() {
        this.props.onChange(Object.assign({}, this.state, {target: this.domNode}));
    }

    onInputChange(e) {
        this.setState({
            textInput: {
                inputValue: e.target.value
            }
        });
    }

    close() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { placeholder } = this.props,
            {items, selectedIndex} = this.state,
            selectedItem = items[selectedIndex],
            [inputProps] = this.getStates(['textInput']);

        return (
            <div className={this.className} ref={this.processRef} onClick={this.handleEvent}>
                <DropdownItem selected={!!selectedItem} value={selectedItem ? selectedItem.value : ''} className={this.placeholderClass + ' none current'}>
                    <TextInput onChange={this.onInputChange} {...inputProps} placeholder={selectedItem ? selectedItem.label : placeholder} />
                </DropdownItem>
                <DropdownWrapper isOpen={this.state.isOpen} close={this.close}>
                    {items.map((item, i) => <DropdownItem index={i} label={item.label} value={item.value} selected={selectedIndex === i} /> )}
                </DropdownWrapper>
            </div>
        );
    }
}

Dropdown.defaultProps = {
    placeholder: 'Please Select...',
    onChange: () => {}
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export class DropdownWrapperView extends BaseComponent {
    static get type() {
        return 'Dropdown';
    }

    init() {
        this.baseClassName = `dropdownWrapper`;
    }

    render() {
        const {children, className, styleObj} = this.props,
            cls = getClsName(this.className, (!this.props.isOpen ? 'hidden' : ''));

        return (
            <div className={cls} style={styleObj}>{children}</div>
        );
    }
}

DropdownWrapperView.defaultProps = {
    styleObj: {},
    close: () => {}
}

DropdownWrapperView.propTypes = {
    styleObj: PropTypes.object,
    close: PropTypes.func.isRequired
}

export const DropdownWrapper = popupable(DropdownWrapperView);

export class DropdownItem extends BaseComponent {
    init() {
        this.baseClassName = `dropdownItem`;
    }

    render() {
        const {children, className, value, label, index, selected} = this.props;

        return (
            <div data-index={index} data-selected={selected} data-label={label} data-value={value} className={this.className}>{children || label}</div>
        );
    }
}

DropdownItem.defaultProps = {
    string: 'Please Select...',
    value: '',
    selected: false
};

DropdownItem.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    index: PropTypes.number,
    selected: PropTypes.bool
};

export default Dropdown;