'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDnd = require('react-dnd');

var _ItemTypes = require('./ItemTypes');

var _ItemTypes2 = _interopRequireDefault(_ItemTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CLASS = 'react-tabs__tab';

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Tab.prototype.componentDidMount = function componentDidMount() {
    this.checkFocus();
  };

  Tab.prototype.componentDidUpdate = function componentDidUpdate() {
    this.checkFocus();
  };

  Tab.prototype.checkFocus = function checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  };

  Tab.prototype.render = function render() {
    var _cx,
        _this2 = this;

    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        disabled = _props2.disabled,
        disabledClassName = _props2.disabledClassName,
        focus = _props2.focus,
        id = _props2.id,
        panelId = _props2.panelId,
        selected = _props2.selected,
        selectedClassName = _props2.selectedClassName,
        tabRef = _props2.tabRef,
        connectDragSource = _props2.connectDragSource,
        connectDropTarget = _props2.connectDropTarget,
        isDragging = _props2.isDragging,
        tabKey = _props2.tabKey,
        endDrag = _props2.endDrag,
        attributes = _objectWithoutProperties(_props2, ['children', 'className', 'disabled', 'disabledClassName', 'focus', 'id', 'panelId', 'selected', 'selectedClassName', 'tabRef', 'connectDragSource', 'connectDropTarget', 'isDragging', 'tabKey', 'endDrag']);

    return connectDropTarget(connectDragSource(_react2.default.createElement(
      'li',
      _extends({}, attributes, {
        className: (0, _classnames2.default)(className, (_cx = {}, _cx[selectedClassName] = selected, _cx[disabledClassName] = disabled, _cx)),
        ref: function ref(node) {
          _this2.node = node;
          if (tabRef) tabRef(node);
        },
        role: 'tab',
        id: id,
        'aria-selected': selected ? 'true' : 'false',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-controls': panelId,
        tabIndex: selected ? '0' : null
      }),
      children
    )));
  };

  return Tab;
}(_react.Component);

Tab.defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: DEFAULT_CLASS + '--disabled',
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: DEFAULT_CLASS + '--selected'
};
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  disabledClassName: _propTypes2.default.string,
  focus: _propTypes2.default.bool, // private
  id: _propTypes2.default.string, // private
  panelId: _propTypes2.default.string, // private
  selected: _propTypes2.default.bool, // private
  selectedClassName: _propTypes2.default.string,
  tabRef: _propTypes2.default.func, // private
  connectDragSource: _propTypes2.default.func.isRequired,
  connectDropTarget: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired
} : {};


var tabSource = {
  beginDrag: function beginDrag(_props, monitor, component) {
    var props = component.decoratedComponentInstance.props;

    console.log('beginDrag tabIndex:' + props.tabIndex + ' id:' + props.id + ' key:' + props.key);
    console.log(props.selectedClassName);
    console.log(props.checkFocus);
    console.log(props.focus);
    console.log(props.selected);
    console.log(props.id);
    console.log(props.tabKey);
    return {
      props: props
      // id: props.id,
      // // originalIndex: props.findTab(props.id).index,
      // key: props.tabKey,
      // originalIndex: props.tabIndex,
    };
  },
  endDrag: function endDrag(props, monitor, component) {
    // const { decoratedComponentInstance: { props } } = component;
    // const { id: droppedId, originalIndex, key } = monitor.getItem();
    var didDrop = monitor.didDrop();
    var item = monitor.getItem();

    // console.log('endDrag');

    if (props.endDrag) {
      props.endDrag(didDrop, props, item);
    }
  }
};

var tabTarget = {
  canDrop: function canDrop() {
    console.log('canDrop');
    return true;
  },
  hover: function hover(props, monitor, component) {
    var decoratedComponentInstance = component.decoratedComponentInstance;

    var _monitor$getItem = monitor.getItem(),
        draggedId = _monitor$getItem.id;

    var overId = props.id;


    if (draggedId !== overId) {
      // const { index: overIndex } = props.findTab(overId);
      // props.moveTab(draggedId, overIndex);
      console.log('  -- draggedId !== overId');
    }
  }
};

Tab = (0, _reactDnd.DropTarget)(_ItemTypes2.default.TAB, tabTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
})(Tab);

Tab = (0, _reactDnd.DragSource)(_ItemTypes2.default.TAB, tabSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})(Tab);

exports.default = Tab;