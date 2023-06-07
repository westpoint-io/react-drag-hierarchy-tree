import React, { useRef, useEffect, createContext, useContext, useState, useCallback, useImperativeHandle, useMemo, forwardRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import clone from 'clone';

var useTree = function useTree() {
  var treeRef = useRef(null);
  return {
    treeRef: treeRef
  };
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _templateObject, _templateObject2, _templateObject3;
var ChildrenComponent = /*#__PURE__*/styled.div(_templateObject || (_templateObject = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  transition: all 1s ease-in-out;\n\n  &:before,\n  &:after {\n    transition: all 0.35s;\n  }\n\n  padding-top: 20px;\n  display: table;\n\n  &:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 50%;\n    width: 0;\n    height: 20px;\n    border-right: ", "\n      solid ", ";\n  }\n\n  &:after {\n    content: '';\n    display: table;\n    clear: both;\n  }\n\n  ", "\n\n  ", "\n"])), function (prop) {
  return prop.strokeWidth ? prop.strokeWidth : '1px';
}, function (prop) {
  return prop.strokeColor ? prop.strokeColor : '#000';
}, function (props) {
  return props.reverse && css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      display: flex;\n      padding-top: 0;\n      padding-bottom: 1.25rem;\n\n      &:before {\n        content: '';\n        position: absolute;\n        top: unset;\n        bottom: 0;\n        left: 50%;\n        width: 0;\n        height: 1.25rem;\n      }\n    "])));
}, function (props) {
  return props.horizontal && css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      display: table-cell;\n      padding-top: 0;\n      padding-left: 20px;\n\n      &:before {\n        top: calc(50% + 1px);\n        left: 0;\n        width: 20px;\n        height: 0;\n        border-left: 0;\n        border-top: ", " solid\n          ", ";\n      }\n\n      &:after {\n        display: none;\n      }\n\n      & > .org-tree-node {\n        display: block;\n        padding-left: 20px;\n      }\n    "])), props.strokeWidth ? props.strokeWidth : '1px', props.strokeColor ? props.strokeColor : '#000');
});

var RenderChildren = function RenderChildren(_ref) {
  var list = _ref.list,
      data = _ref.data,
      prop = _ref.prop,
      mock = _ref.mock,
      hierarchyProps = _ref.hierarchyProps;

  if (Array.isArray(list) && list.length) {
    return React.createElement(ChildrenComponent, {
      id: "children_" + data.id,
      className: 'org-tree-node-children',
      horizontal: !!prop.horizontal,
      reverse: prop.reverse,
      strokeColor: prop.strokeColor,
      strokeWidth: prop.strokeWidth
    }, list.map(function (item) {
      return React.createElement(RenderNode, {
        mock: mock,
        key: item.id,
        data: item,
        prop: prop,
        hierarchyProps: hierarchyProps
      });
    }));
  }

  return null;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var useDebounce = function useDebounce(fn, delay, continueUnmounted // if want to continue to update after unmounted
) {
  var ref = useRef(null);
  useEffect(function () {
    return function () {
      if (ref.current && !continueUnmounted) window.clearTimeout(ref.current);
    };
  });

  function onDebounce() {
    return _onDebounce.apply(this, arguments);
  }

  function _onDebounce() {
    _onDebounce = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _len,
          args,
          _key,
          timeout,
          _args = arguments;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args[_key];
              }

              if (!ref.current) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return window.clearTimeout(ref.current);

            case 4:
              _context.next = 6;
              return window.setTimeout(function () {
                fn.apply(void 0, args);
              }, delay);

            case 6:
              timeout = _context.sent;
              ref.current = timeout;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _onDebounce.apply(this, arguments);
  }

  function onClearDebounce() {
    if (ref.current) window.clearTimeout(ref.current);
  }

  return {
    onDebounce: onDebounce,
    onClearDebounce: onClearDebounce
  };
};

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4, _templateObject5;
var RenderButton = /*#__PURE__*/styled.span(_templateObject$1 || (_templateObject$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  width: 20px;\n  height: 20px;\n  z-index: 10;\n  margin-left: -11px;\n  margin-top: 9px;\n  background-color: ", ";\n  border: 1px solid\n    ", ";\n  border-radius: 50%;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  transition: all 0.35s ease;\n\n  :hover {\n    filter: brightness(0.9);\n    transform: scale(1.1);\n  }\n\n  :before,\n  :after {\n    content: '';\n    position: absolute;\n  }\n\n  :before {\n    top: 50%;\n    left: 4px;\n    right: 4px;\n    height: 0;\n    border-top: 1px solid\n      ", ";\n  }\n\n  :after {\n    top: 4px;\n    left: 50%;\n    bottom: 4px;\n    width: 0;\n    border-left: 1px solid\n      ", ";\n  }\n\n  ", "\n\n  ", "\n"])), function (prop) {
  return prop.buttonBackgroundColor ? prop.buttonBackgroundColor : '#fff';
}, function (prop) {
  return prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc';
}, function (prop) {
  return prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc';
}, function (prop) {
  return prop.buttonBorderColor ? prop.buttonBorderColor : '#ccc';
}, function (props) {
  return props.expanded && css(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteralLoose(["\n      &:after {\n        border: none;\n      }\n    "])));
}, function (props) {
  return props.horizontal && css(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteralLoose(["\n      top: 50%;\n      left: 100%;\n      margin-top: -11px;\n      margin-left: 9px;\n    "])));
});
var ContainerButton = /*#__PURE__*/styled.div(_templateObject4 || (_templateObject4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  width: 20px;\n  height: 20px;\n  z-index: 10;\n  margin-left: -11px;\n  margin-top: 9px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-radius: 50%;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  transition: all 0.35s ease;\n\n  ", "\n"])), function (props) {
  return props.horizontal && css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      top: 50%;\n      left: 100%;\n      margin-top: -11px;\n      margin-left: 9px;\n    "])));
});

var RenderBtn = function RenderBtn(_ref) {
  var setExpand = _ref.setExpand,
      expand = _ref.expand,
      prop = _ref.prop;
  var horizontal = prop.horizontal,
      renderButton = prop.renderButton;
  if (renderButton) return React.createElement(ContainerButton, {
    horizontal: !!horizontal
  }, renderButton({
    isCollapsed: expand,
    onClick: function onClick(event) {
      event.stopPropagation();
      setExpand(!expand);
    }
  }));
  return React.createElement(RenderButton, {
    buttonBorderColor: prop.buttonBorderColor || '',
    buttonBackgroundColor: prop.buttonBackgroundColor || '',
    horizontal: !!horizontal,
    expanded: expand,
    onClick: function onClick(e) {
      e.stopPropagation();
      setExpand(!expand);
    }
  });
};

var _templateObject$2, _templateObject2$2, _templateObject3$2, _templateObject4$1, _templateObject5$1, _templateObject6;
var CardArea = /*#__PURE__*/styled.div(_templateObject$2 || (_templateObject$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  display: inline-block;\n  cursor: move;\n  z-index: 10;\n  ", "\n"])), function (props) {
  return props.horizontal && css(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteralLoose(["\n      display: table-cell;\n      vertical-align: middle;\n    "])));
});
var RenderLabel = /*#__PURE__*/styled.div(_templateObject3$2 || (_templateObject3$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: white;\n  cursor: grab;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 15px;\n  min-width: 100px;\n  min-height: 45px;\n  z-index: 100000;\n  text-align: center;\n  color: black;\n  position: relative;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);\n  border-radius: 5px;\n\n  // no break line\n  white-space: nowrap;\n  text-overflow: ellipsis;\n\n  &.mock_card {\n    border: 1px solid #7de874;\n  }\n\n  ", "\n"])), function (props) {
  return props.isDragging && css(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteralLoose(["\n      cursor: grabbing;\n    "])));
});
var RenderCustomCard = /*#__PURE__*/styled.div(_templateObject5$1 || (_templateObject5$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  cursor: grab;\n\n  &.mock_card {\n    border: 1px solid #7de874;\n  }\n"])));
var StyledLabel = /*#__PURE__*/styled.div(_templateObject6 || (_templateObject6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 0;\n  padding: 0;\n"])));

var IndexContext = /*#__PURE__*/createContext({});
function IndexContextProvider(_ref) {
  var children = _ref.children,
      index = _ref.index;
  return React.createElement(IndexContext.Provider, {
    value: {
      index: index
    }
  }, children);
}
var useIndex = function useIndex() {
  return useContext(IndexContext);
};

var HierarchyContext = /*#__PURE__*/createContext({});
function HierarchyTreesContextProvider(_ref) {
  var children = _ref.children,
      data = _ref.data,
      treeDataRef = _ref.treeDataRef;

  var _useState = useState(data),
      treesData = _useState[0],
      setTreesData = _useState[1];

  var treesRef = useRef(data);
  useEffect(function () {
    treesRef.current = treesData;
  }, [treesData]);
  var updateTree = useCallback(function (index, tree) {
    setTreesData(function (current) {
      return current.map(function (t, i) {
        return i === index ? tree : t;
      });
    });
  }, []);
  var addTree = useCallback(function (tree) {
    setTreesData(function (current) {
      return [].concat(current, [tree]);
    });
  }, []);
  var getTree = useCallback(function (index) {
    return treesRef.current[index];
  }, []);
  var editById = useCallback(function (index, id, data, action, nestedObject) {
    if (action === void 0) {
      action = 'add';
    }

    var targetTree = treesRef.current[index];
    var nestedObjectClone = nestedObject ? _extends({}, nestedObject) : _extends({}, targetTree);
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      if (!action || action === 'replace') return _extends({}, nestedObjectClone, data);
      if (!action || action === 'add') return _extends({}, nestedObjectClone, data, {
        children: [].concat(nestedObjectClone.children, data.children ? data.children : [])
      });
      if (!action || action === 'remove') return _extends({}, nestedObjectClone, data, {
        children: [].concat(nestedObjectClone.children.filter(function (child) {
          return data.children ? !data.children.map(function (i) {
            return i.id;
          }).includes(child.id) : child;
        }))
      });
    }

    if (!nestedObjectClone.children) return nestedObjectClone;
    var newChildren = nestedObjectClone.children.map(function (child) {
      return editById(index, id, data, action, child);
    });
    return _extends({}, nestedObjectClone, {
      children: newChildren || []
    });
  }, []);
  var addChildrenById = useCallback(function (index, id, data, nestedObject) {
    var targetTree = treesRef.current[index];
    var nestedObjectClone = nestedObject ? _extends({}, nestedObject) : _extends({}, targetTree);
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      return _extends({}, nestedObjectClone, {
        children: [].concat(nestedObjectClone.children, data ? data : [])
      });
    }

    if (!nestedObjectClone.children) return nestedObjectClone;
    var newChildren = nestedObjectClone.children.map(function (child) {
      return addChildrenById(index, id, data, child);
    });
    return _extends({}, nestedObjectClone, {
      children: newChildren || []
    });
  }, []);
  var removeById = useCallback(function (index, id, dataToRemove, nestedObject) {
    var targetTree = treesRef.current[index];
    var nestedObjectClone = nestedObject ? _extends({}, nestedObject) : _extends({}, targetTree);
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      return _extends({}, nestedObjectClone, dataToRemove, {
        children: [].concat(nestedObjectClone.children.filter(function (child) {
          return dataToRemove ? !dataToRemove.map(function (i) {
            return i;
          }).includes(child.id) : !child;
        }))
      });
    }

    if (!nestedObjectClone.children) return nestedObjectClone;
    var newChildren = nestedObjectClone.children.map(function (child) {
      return removeById(index, id, dataToRemove, child);
    });
    return _extends({}, nestedObjectClone, {
      children: newChildren || []
    });
  }, []);
  var findParentByChildId = useCallback(function (index, id, nestsObject) {
    var targetTree = treesRef.current[index];
    var nestedObject = nestsObject ? _extends({}, nestsObject) : _extends({}, targetTree);
    nestedObject = clone(nestedObject);

    var loop = function loop(childObject, parentObject, arrayParentIdPaths) {
      if (arrayParentIdPaths === void 0) {
        arrayParentIdPaths = [];
      }

      var array = [].concat(arrayParentIdPaths);
      if (parentObject != null && parentObject.id) array.push(parentObject.id);

      if (childObject.id === id) {
        return {
          parent: parentObject,
          path: array
        };
      }

      if (!(childObject != null && childObject.children)) return {
        parent: null,
        path: []
      };
      var parent = {
        parent: null,
        path: []
      };
      childObject.children.map(function (child) {
        var loopParent = loop(child, childObject, array);

        if (loopParent.parent !== null) {
          parent = loopParent;
        }
      });
      return parent;
    };

    var parentData = loop(nestedObject, null);
    return parentData;
  }, []);
  var findById = useCallback(function ( // nestedObject: INestedObject,
  index, id, nestsObject) {
    var targetTree = treesRef.current[index];
    var nestedObject = nestsObject ? _extends({}, nestsObject) : _extends({}, targetTree);
    nestedObject = clone(nestedObject);

    var loop = function loop(nestedObject, itemId) {
      if (nestedObject.id === id) {
        return nestedObject;
      }

      if (!(nestedObject != null && nestedObject.children)) return null;
      var item = null;
      nestedObject.children.map(function (child) {
        var loopItem = loop(child);
        if (loopItem !== null) item = loopItem;
        return;
      });
      return item;
    };

    var Item = loop(nestedObject);
    return Item;
  }, []);
  var isChild = useCallback(function (index, parentId, childId, nestedObject) {
    var _findParentByChildId = findParentByChildId(index, childId, nestedObject),
        path = _findParentByChildId.path;

    return path.includes(parentId);
  }, []);
  var isParent = useCallback(function (index, parentId, childId, nestedObject) {
    var parent = findById(index, parentId, nestedObject);
    if (!parent) return false;
    var children = getAllChildrenIds(parent);
    if (children.includes(childId)) return true;
    return false;
  }, []);
  var isDirectChild = useCallback(function (index, parentId, childId, nestedObject) {
    var _findParentByChildId2 = findParentByChildId(index, childId, nestedObject),
        parent = _findParentByChildId2.parent;

    var id = parent == null ? void 0 : parent.id;
    return id === parentId;
  }, []);
  var getAllChildrenIds = useCallback(function (obj) {
    var childrenIds = [];

    if (!obj.children.length) {
      return childrenIds;
    }

    for (var _iterator = _createForOfIteratorHelperLoose(obj.children), _step; !(_step = _iterator()).done;) {
      var child = _step.value;
      var childIds = getAllChildrenIds(child);
      childrenIds = childrenIds.concat(childIds);
    }

    childrenIds = childrenIds.concat(obj.children.map(function (child) {
      return child.id;
    }));
    return childrenIds;
  }, []);
  useImperativeHandle(treeDataRef, function () {
    return {
      findById: findById,
      findParentByChildId: findParentByChildId,
      removeById: removeById,
      editById: editById,
      addChildrenById: addChildrenById,
      updateTree: updateTree,
      getTree: getTree,
      getAllChildrenIds: getAllChildrenIds,
      isDirectChild: isDirectChild,
      isParent: isParent,
      isChild: isChild,
      addTree: addTree
    };
  }, [findById, findParentByChildId, removeById, editById, addChildrenById, updateTree, getTree, getAllChildrenIds, isDirectChild, isParent, isChild, addTree]);
  return React.createElement(HierarchyContext.Provider, {
    value: {
      treesData: treesData,
      updateTree: updateTree,
      editById: editById,
      removeById: removeById,
      findParentByChildId: findParentByChildId,
      findById: findById,
      isDirectChild: isDirectChild,
      isChild: isChild,
      isParent: isParent,
      getTree: getTree,
      addChildrenById: addChildrenById,
      addTree: addTree
    }
  }, children);
}
var useHierarchyData = function useHierarchyData() {
  return useContext(HierarchyContext);
};

var _excluded = ["renderCard"];
var RenderCard = function RenderCard(_ref) {
  var data = _ref.data,
      setExpand = _ref.setExpand,
      expand = _ref.expand,
      mock = _ref.mock,
      root = _ref.root,
      _ref$prop = _ref.prop,
      renderCard = _ref$prop.renderCard,
      prop = _objectWithoutPropertiesLoose(_ref$prop, _excluded),
      hierarchyProps = _ref.hierarchyProps;

  var hierarchyRef = hierarchyProps.hierarchyRef,
      draggingItemRef = hierarchyProps.draggingItemRef;

  var _useHierarchyData = useHierarchyData(),
      editById = _useHierarchyData.editById,
      isDirectChild = _useHierarchyData.isDirectChild,
      isParent = _useHierarchyData.isParent,
      findParentByChildId = _useHierarchyData.findParentByChildId,
      findById = _useHierarchyData.findById,
      updateTree = _useHierarchyData.updateTree;

  var _useIndex = useIndex(),
      index = _useIndex.index;

  var node = prop.node;
  var label = data[node.label];
  var clx = ['org-tree-node-label-inner'];

  if (mock) {
    clx.push('mock_card');
  }

  var onAppendMock = function onAppendMock(id, label) {
    // add renderNode if has already children inside
    var componentChildren = document.getElementById("children_" + id);

    if (componentChildren) {
      var elementMockLabel = document.getElementById("label_text_mock");
      var elementMockNode = document.getElementById("node-tree-mock");
      if (!elementMockLabel) return;
      if (!elementMockNode) return;
      elementMockLabel.innerText = label;
      elementMockNode.style.display = 'table-cell';
      elementMockNode.id = "node-tree-mock-clone";
      var elementMockNodeClone = elementMockNode == null ? void 0 : elementMockNode.cloneNode(true);
      elementMockNode.style.display = 'none';
      elementMockNode.id = "node-tree-mock";
      var elementMockNodeLastChild = elementMockNodeClone.lastChild;
      elementMockNodeLastChild && elementMockNodeClone.removeChild(elementMockNodeLastChild);
      componentChildren.appendChild(elementMockNodeClone);
      return;
    } // add renderChildrenNode if does not have children inside


    var componentNode = document.getElementById("node-tree-" + id);

    if (componentNode) {
      var _elementMockLabel = document.getElementById("label_text_child_mock");

      var componentMockChildren = document.getElementById("children_mock");
      if (!_elementMockLabel) return;
      if (!componentMockChildren) return;
      _elementMockLabel.innerText = label;
      var oldMockId = componentMockChildren.id;
      componentMockChildren.id = "node-tree-mock-clone";
      var componentMockChildrenClone = componentMockChildren == null ? void 0 : componentMockChildren.cloneNode(true);
      componentMockChildren.id = oldMockId;
      componentNode.appendChild(componentMockChildrenClone);
    }
  };

  var onRemoveMock = function onRemoveMock() {
    var componentCloneMock = document.getElementById("node-tree-mock-clone");
    componentCloneMock && componentCloneMock.remove();
  };

  var _useDrag = useDrag(function () {
    return {
      type: "box-" + index,
      item: _extends({}, data, {
        treeIndex: index
      }),
      options: {
        dropEffect: 'copy'
      },
      canDrag: function canDrag() {
        return !root;
      },
      collect: function collect(monitor) {
        return {
          isDragging: !!monitor.isDragging()
        };
      }
    };
  }, []),
      isDragging = _useDrag[0].isDragging,
      drag = _useDrag[1];

  useEffect(function () {
    var labelDoc = document.getElementById("node-tree-" + data.id);
    if (!labelDoc) return; // labelDoc.style.opacity = isDragging ? '0.5' : '1';

    var LabelClassName = labelDoc.className;
    labelDoc.className = isDragging ? labelDoc.className + ' RdtCant-drop' : LabelClassName.replace(' RdtCant-drop', '');
    draggingItemRef.current = data; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  var onDragEnter = function onDragEnter(dropId) {
    var dragLabel = 'Place here';

    if (draggingItemRef.current) {
      var _draggingItemRef$curr = draggingItemRef.current,
          dragItemId = _draggingItemRef$curr.id,
          dragItemIndex = _draggingItemRef$curr.treeIndex;

      var _canDrop = index !== dragItemIndex || dragItemId !== data.id && !isDirectChild(index, data.id, dragItemId, hierarchyRef.current) && !isParent(index, dragItemId, data.id, hierarchyRef.current);

      dragLabel = draggingItemRef.current.label;
      if (!_canDrop) return;
    }

    onAppendMock(dropId, dragLabel);
  };

  var onDragLeave = function onDragLeave() {
    onRemoveMock();
  };

  var onDrop = function onDrop(drag) {
    var dragIndex = drag.treeIndex;
    var dragItem = findById(dragIndex, drag.id);
    var dropItem = data;
    var isSameTree = dragIndex === index;
    var result = findParentByChildId(dragIndex, drag.id);
    var parentDragItem = result.parent;

    if (parentDragItem && dragItem) {
      var newParent = _extends({}, parentDragItem, {
        children: [].concat(parentDragItem.children.filter(function (i) {
          return i.id !== drag.id;
        }))
      });

      var removedDragItemHierarchy = editById(dragIndex, parentDragItem.id, newParent, 'replace');
      var addedDragItemHierarchy = editById(index, dropItem.id, {
        children: [dragItem]
      }, 'add', isSameTree ? removedDragItemHierarchy : undefined);
      if (!isSameTree) updateTree(dragIndex, removedDragItemHierarchy);
      updateTree(index, addedDragItemHierarchy);
      var oldRelationship = {
        parent: parentDragItem.id,
        child: dragItem.id
      };
      var newRelationship = {
        parent: dropItem.id,
        child: dragItem.id
      };
      prop.onChange && prop.onChange(addedDragItemHierarchy, {
        oldRelationship: oldRelationship,
        newRelationship: newRelationship
      });
    }
  };

  var _useDebounce = useDebounce(onDragEnter, 300),
      onDebounce = _useDebounce.onDebounce;

  var _useDrop = useDrop(function () {
    return {
      accept: "box-" + index,
      canDrop: function canDrop(item) {
        return index !== item.treeIndex || data.id !== item.id && !isDirectChild(index, data.id, item.id, hierarchyRef.current) && !isParent(index, item.id, data.id, hierarchyRef.current);
      },
      drop: function drop(drag) {
        return onDrop(drag);
      },
      collect: function collect(monitor) {
        return {
          isOver: !!monitor.isOver(),
          canDrop: monitor.canDrop()
        };
      }
    };
  }, []),
      _useDrop$ = _useDrop[0],
      isOver = _useDrop$.isOver,
      canDrop = _useDrop$.canDrop,
      drop = _useDrop[1];

  useEffect(function () {
    if (isOver) onDebounce(data.id);else onDragLeave(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);
  return React.createElement(CardArea, {
    id: "label_" + data.id,
    key: "label_" + data.id,
    horizontal: !!prop.horizontal,
    className: 'org-tree-node-label',
    ref: drop,
    onClick: function onClick(e) {
      return typeof prop.onClick === 'function' && prop.onClick(e, data);
    }
  }, renderCard ? React.createElement(RenderCustomCard, {
    key: "label_inner_" + data.id,
    ref: drag
  }, renderCard({
    isDragging: isDragging,
    label: label,
    labelId: "label_text_" + data.id,
    data: data,
    isPreviewCard: !!mock,
    isOver: isOver,
    canDrop: canDrop,
    treeIndex: index
  }), prop.collapsable && !isLastNode(data, prop) && React.createElement(RenderBtn, {
    setExpand: setExpand,
    expand: expand,
    data: data,
    prop: prop
  })) : React.createElement(RenderLabel, {
    key: "label_inner_" + data.id,
    ref: drag,
    isDragging: isDragging,
    className: clx.join(' '),
    style: _extends({}, prop.cardStyle, data.style)
  }, React.createElement(StyledLabel, {
    id: "label_text_" + data.id
  }, label), prop.collapsable && !isLastNode(data, prop) && React.createElement(RenderBtn, {
    setExpand: setExpand,
    expand: expand,
    data: data,
    prop: prop
  })));
};

var _templateObject$3, _templateObject2$3, _templateObject3$3;
var OrgTreeNode = /*#__PURE__*/styled.div(_templateObject$3 || (_templateObject$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  padding-left: 20px;\n\n  &:before,\n  &:after {\n    transition: all 0.35s;\n  }\n\n  padding-top: 20px;\n  display: table-cell;\n  vertical-align: top;\n\n  &.is-leaf,\n  &.collapsed {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n\n  &:before,\n  &:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 50%;\n    height: 19px;\n  }\n\n  &:after {\n    left: 50%;\n    border-left: 1px solid\n      ", ";\n  }\n\n  &:not(:first-of-type):before,\n  &:not(:last-of-type):after {\n    border-top: 1px solid\n      ", ";\n  }\n\n  // remove the line of the first label\n  &.org-tree-node-first {\n    padding-top: 0;\n\n    &:before,\n    &:after {\n      border-left: none;\n      opacity: 0;\n    }\n  }\n\n  ", "\n\n  ", "\n\n  .RdtCant-drop {\n    opacity: 0.5;\n    cursor: no-drop;\n    .org-tree-node-label-inner {\n      background-color: #aaaaaa33;\n    }\n    .org-tree-node-label-inner-personal {\n      opacity: 0.5;\n    }\n  }\n"])), function (prop) {
  return prop.strokeColor ? prop.strokeColor : '#000';
}, function (prop) {
  return prop.strokeColor ? prop.strokeColor : '#000';
}, function (props) {
  return props.reverse && css(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteralLoose(["\n      display: inline-flex;\n      flex-direction: column-reverse;\n      align-items: center;\n      padding-top: 0;\n      padding-bottom: 1.25rem;\n\n      &:before,\n      &:after {\n        top: unset;\n        bottom: 0;\n      }\n\n      &:not(:first-of-type):before,\n      &:not(:last-of-type):after {\n        border-top: none;\n        border-bottom: 0.0625rem solid\n          ", ";\n      }\n    "])), props.strokeColor ? props.strokeColor : '#000');
}, function (props) {
  return props.horizontal && css(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteralLoose(["\n      display: table-cell;\n      float: none;\n      padding-top: 0;\n      padding-left: 20px;\n\n      &.is-leaf,\n      &.collapsed {\n        padding-top: 10px;\n        padding-bottom: 10px;\n      }\n\n      &:before,\n      &:after {\n        width: 19px;\n        height: 50%;\n      }\n\n      &:after {\n        top: 50%;\n        left: 0;\n        border-left: 0;\n      }\n\n      &:only-child:before {\n        top: 1px;\n        border-bottom: 1px solid\n          ", ";\n      }\n\n      &:not(:first-of-type):before,\n      &:not(:last-of-type):after {\n        border-top: 0;\n        border-left: 1px solid ", ";\n      }\n\n      &:not(:only-child):after {\n        border-top: 1px solid ", ";\n      }\n\n      // remove the line of the first label\n      &.org-tree-node-first {\n        padding-left: 0;\n\n        &:after {\n          border-left: none;\n          opacity: 0;\n        }\n      }\n    "])), props.strokeColor ? props.strokeColor : '#000', props.strokeColor ? props.strokeColor : '#000', props.strokeColor ? props.strokeColor : '#000');
});

var RenderNode = function RenderNode(_ref) {
  var data = _ref.data,
      prop = _ref.prop,
      first = _ref.first,
      mock = _ref.mock,
      hierarchyProps = _ref.hierarchyProps;
  var node = prop.node;
  var cls = ['org-tree-node'];

  var _useState = useState(!(node.expand in data && !data[node.expand])),
      expand = _useState[0],
      setExpand = _useState[1];

  useEffect(function () {
    setExpand(prop.expandAll);
  }, [prop.expandAll]);

  if (isLastNode(data, prop)) {
    cls.push('is-leaf');
  } else if (prop.collapsable && !expand) {
    cls.push('collapsed');
  }

  if (first) cls.push('org-tree-node-first');
  return React.createElement(OrgTreeNode, {
    id: "node-tree-" + data.id,
    horizontal: prop.horizontal,
    reverse: prop.reverse,
    className: cls.join(' '),
    strokeColor: prop.strokeColor,
    strokeWidth: prop.strokeWidth,
    style: data.id === 'mock' ? {
      display: 'none'
    } : {}
  }, React.createElement(RenderCard, {
    hierarchyProps: hierarchyProps,
    setExpand: setExpand,
    expand: expand,
    data: data,
    prop: prop,
    mock: mock,
    root: first
  }), (!prop.collapsable || expand) && React.createElement(RenderChildren, {
    data: data,
    list: data.children,
    prop: prop,
    mock: mock,
    hierarchyProps: hierarchyProps
  }));
};

var useHierarchy = function useHierarchy(_ref) {
  var index = _ref.index;

  var _useHierarchyData = useHierarchyData(),
      treesData = _useHierarchyData.treesData;

  var _useState = useState(treesData[index]),
      hierarchy = _useState[0],
      setHierarchy = _useState[1];

  var hierarchyRef = useRef(hierarchy);
  var draggingItemRef = useRef(null);
  useEffect(function () {
    var newData = treesData[index];
    setHierarchy(newData);
    hierarchyRef.current = newData;
  }, [treesData]);
  return useMemo(function () {
    return {
      draggingItemRef: draggingItemRef,
      hierarchyRef: hierarchyRef,
      hierarchy: hierarchy,
      setHierarchy: setHierarchy
    };
  }, [draggingItemRef, hierarchyRef, hierarchy, setHierarchy]);
};

var _excluded$1 = ["hierarchy"];
var isLastNode = function isLastNode(data, prop) {
  var node = prop.node;
  return !(Array.isArray(data[node.children]) && data[node.children].length > 0);
};
var mock_data = {
  id: 'mock',
  label: 'Label',
  children: [{
    id: 'child_mock',
    label: 'Label',
    children: []
  }]
};
var TreeNode = function TreeNode(props) {
  var _useIndex = useIndex(),
      index = _useIndex.index;

  var _useHierarchy = useHierarchy({
    index: index
  }),
      hierarchy = _useHierarchy.hierarchy,
      hierarchyProps = _objectWithoutPropertiesLoose(_useHierarchy, _excluded$1);

  return React.createElement(React.Fragment, null, React.createElement(RenderNode, {
    data: hierarchy,
    hierarchyProps: hierarchyProps,
    prop: props,
    first: true
  }), React.createElement(RenderNode, {
    hierarchyProps: hierarchyProps,
    data: mock_data,
    prop: props,
    mock: true
  }));
};

var _templateObject$4, _templateObject2$4;
var OrgTreeContainer = /*#__PURE__*/styled.div(_templateObject$4 || (_templateObject$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: block;\n  padding: 15px;\n"])));
var OrgTree = /*#__PURE__*/styled.div(_templateObject2$4 || (_templateObject2$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: table;\n  text-align: center;\n\n  &:before,\n  &:after {\n    content: '';\n    display: table;\n  }\n\n  &:after {\n    clear: both;\n  }\n"])));

var _excluded$2 = ["data", "onClick", "collapsable", "expandAll", "horizontal", "reverse"];
var initialState = {
  node: {
    label: 'label',
    expand: 'expand',
    children: 'children'
  }
};
var OrgTreeComponent = function OrgTreeComponent(_ref) {
  var data = _ref.data,
      _onClick = _ref.onClick,
      _ref$collapsable = _ref.collapsable,
      collapsable = _ref$collapsable === void 0 ? true : _ref$collapsable,
      _ref$expandAll = _ref.expandAll,
      expandAll = _ref$expandAll === void 0 ? true : _ref$expandAll,
      _ref$horizontal = _ref.horizontal,
      horizontal = _ref$horizontal === void 0 ? false : _ref$horizontal,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  var _useState = useState(expandAll),
      expandAllNodes = _useState[0],
      setExpandAllNodes = _useState[1];

  var node = initialState.node;
  var onExpandNodes = useCallback(function () {
    var labelDoc = document.getElementById("children_" + data.id);
    if (labelDoc) setExpandAllNodes(function (expandAllNodes) {
      return !expandAllNodes;
    });else setExpandAllNodes(true);
  }, [data.id]);
  return React.createElement(OrgTreeContainer, {
    horizontal: horizontal
  }, React.createElement(OrgTree, {
    horizontal: horizontal
  }, React.createElement(TreeNode, Object.assign({
    data: data,
    horizontal: horizontal,
    node: node,
    reverse: reverse,
    onExpandNodes: onExpandNodes,
    collapsable: collapsable,
    expandAll: expandAllNodes,
    onClick: function onClick(e, nodeData) {
      return _onClick && _onClick(e, nodeData);
    }
  }, props))));
};

var _excluded$3 = ["data", "onClick", "collapsable", "expandAll", "horizontal", "reverse"];
var RenderTrees = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var data = _ref.data,
      _ref$collapsable = _ref.collapsable,
      collapsable = _ref$collapsable === void 0 ? true : _ref$collapsable,
      _ref$expandAll = _ref.expandAll,
      expandAll = _ref$expandAll === void 0 ? true : _ref$expandAll,
      _ref$horizontal = _ref.horizontal,
      horizontal = _ref$horizontal === void 0 ? false : _ref$horizontal,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  if (horizontal && reverse) throw new Error('The horizontal and reverse properties cannot be used at the same time');
  return React.createElement(DndProvider, {
    backend: HTML5Backend
  }, React.createElement(HierarchyTreesContextProvider, {
    data: data,
    treeDataRef: ref
  }, data.map(function (tree, i) {
    return React.createElement(IndexContextProvider, {
      key: i,
      index: i
    }, React.createElement(OrgTreeComponent, Object.assign({
      data: tree,
      collapsable: collapsable,
      expandAll: expandAll,
      horizontal: horizontal,
      reverse: reverse
    }, props)));
  })));
});

export default RenderTrees;
export { useTree };
//# sourceMappingURL=react-drag-hierarchy-tree.esm.js.map
