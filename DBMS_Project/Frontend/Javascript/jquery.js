(function(global, factory) {
    // Check if jQuery is already defined
    if (typeof module === "object" && module.exports) {
      module.exports = factory(); // For CommonJS (Node.js)
    } else if (typeof define === "function" && define.amd) {
      define(factory); // For AMD (RequireJS)
    } else {
      global.$ = factory(); // Expose to global object (browser)
    }
  })(this, function() {
    "use strict";
  
    // Basic utility functions (like jQuery)
  
    // A utility to determine if an object is a function
    function isFunction(obj) {
      return obj && typeof obj === 'function';
    }
  
    // A utility to determine if an object is a DOM element
    function isElement(obj) {
      return obj && obj.nodeType === 1;
    }
  
    // Utility to get styles of an element
    function getStyles(element, property) {
      if (element && element.ownerDocument) {
        const computedStyle = window.getComputedStyle(element);
        return property ? computedStyle.getPropertyValue(property) : computedStyle;
      }
      return null;
    }
  
    // Utility to set styles on an element
    function setStyles(element, styles) {
      for (const prop in styles) {
        if (styles.hasOwnProperty(prop)) {
          element.style[prop] = styles[prop];
        }
      }
    }
  
    // Function to get or set the position of an element (using your positioning logic)
    function position(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      };
    }
  
    // Main jQuery-like object
    function $(selector) {
      if (!(this instanceof $)) {
        return new $(selector); // Mimic jQuery behavior
      }
  
      this.elements = Array.from(document.querySelectorAll(selector));
    }
  
    // Add a method to get or set styles
    $.prototype.css = function(property, value) {
      if (value !== undefined) {
        // Set style
        this.elements.forEach(function(element) {
          setStyles(element, { [property]: value });
        });
      } else {
        // Get style
        return this.elements.length > 0 ? getStyles(this.elements[0], property) : null;
      }
      return this;
    };
  
    // Add a method to get position of the first element
    $.prototype.position = function() {
      return this.elements.length > 0 ? position(this.elements[0]) : null;
    };
  
    // Add method for adding event listeners (simplified)
    $.prototype.on = function(eventType, handler) {
      this.elements.forEach(function(element) {
        element.addEventListener(eventType, handler);
      });
      return this;
    };
  
    // Add method to trigger events
    $.prototype.trigger = function(eventType) {
      this.elements.forEach(function(element) {
        var event = new Event(eventType);
        element.dispatchEvent(event);
      });
      return this;
    };
  
    // Utility to add/remove classes
    $.prototype.addClass = function(className) {
      this.elements.forEach(function(element) {
        element.classList.add(className);
      });
      return this;
    };
  
    $.prototype.removeClass = function(className) {
      this.elements.forEach(function(element) {
        element.classList.remove(className);
      });
      return this;
    };
  
    // Utility to hide/show elements
    $.prototype.hide = function() {
      this.elements.forEach(function(element) {
        element.style.display = "none";
      });
      return this;
    };
  
    $.prototype.show = function() {
      this.elements.forEach(function(element) {
        element.style.display = "";
      });
      return this;
    };
  
    // A utility function to extend the functionality of objects (similar to jQuery.extend)
    $.extend = function(target) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i];
        for (let prop in source) {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    };
  
    // Expose some utility functions to global scope (optional)
    $.isFunction = isFunction;
    $.isElement = isElement;
  
    return $;
  });
  