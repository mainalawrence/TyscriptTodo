var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.Create = function (todo) {
        State.Data.push(todo);
        return true;
    };
    View.prototype.update = function (id, todo) {
        State.Data = State.Data.map(function (item) {
            if (item.id === id) {
                item.complete = todo.complete;
                item.date = todo.date;
                item.details = todo.details;
                item.title = todo.title;
            }
            return item;
        });
        return true;
    };
    View.prototype.Delete = function (id) {
        State.Data = State.Data.filter(function (item) {
            if (item.id !== id) {
                return item;
            }
        });
        return true;
    };
    return View;
}());
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super.call(this) || this;
        _this.Todos = document.getElementById("Todos");
        _this.complet = document.getElementById("complet");
        _this.reload = function () {
            while (_this.Todos.firstChild) {
                _this.Todos.removeChild(_this.Todos.firstChild);
            }
            while (_this.complet.firstChild) {
                _this.complet.removeChild(_this.complet.firstChild);
            }
        };
        _this.readTodos = function () {
            console.log("reading.....");
            _this.reload();
            State.Data.map(function (item) {
                var div = document.createElement('div');
                div.id = "".concat(item.id);
                div.className = "todo-complete flex-c";
                var h4 = document.createElement('h4');
                h4.textContent = item.title;
                var h5 = document.createElement('h5');
                h5.textContent = item.date;
                var p = document.createElement('p');
                p.textContent = item.details;
                var small = document.createElement('small');
                small.textContent = _this.date.value + "completed at " + Date().toString();
                var btndiv = document.createElement('div');
                var btndelete = document.createElement('input');
                btndelete.className = "btnd";
                btndelete.value = "Delete";
                btndelete.type = "button";
                var btncreate = document.createElement('input');
                btncreate.className = "btnc";
                btncreate.value = "Done";
                btncreate.type = "button";
                div.appendChild(h4);
                div.appendChild(h5);
                div.appendChild(p);
                div.appendChild(small);
                btndiv.className = "m-5";
                if (item.complete) {
                    _this.complet.appendChild(div);
                }
                else {
                    btndiv.appendChild(btndelete);
                    btndiv.appendChild(btncreate);
                    btncreate.addEventListener('click', function (e) {
                        State.Data = State.Data.map(function (item) {
                            console.log(div.id);
                            if (item.id === parseInt(div.id)) {
                                item.complete = !item.complete;
                            }
                            return item;
                        });
                        _this.readTodos();
                    });
                    btndelete.addEventListener('click', function (e) {
                        fetch("http://localhost:8001/".concat(div.id), {
                            method: 'DELETE',
                            mode: 'cors'
                        }).then(function (res) {
                            return res.json();
                        }).then(function (data) {
                            _this.Delete(parseInt(div.id));
                            _this.readTodos();
                        })["catch"](function (err) {
                            console.log(err);
                        });
                        _this.Delete(parseInt(div.id));
                        _this.readTodos();
                    });
                }
            });
            return true;
        };
        _this.form = document.getElementById('form');
        _this.title = document.getElementById('title');
        _this.textarea = document.getElementById('textarea');
        _this.date = document.getElementById('date');
        _this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (_this.title.value === "" || _this.textarea.value === "" || _this.date.value === "") {
                window.alert("Can`t Create an Empty Todo");
            }
            else {
                e.preventDefault();
                var newtodo_1 = {};
                newtodo_1.complete = false;
                newtodo_1.date = _this.date.value;
                newtodo_1.details = _this.textarea.value;
                newtodo_1.title = _this.title.value;
                newtodo_1.id = State.Data.length + 1;
                fetch("http://localhost:8001/", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            id: newtodo_1.id,
                            title: newtodo_1.title,
                            details: newtodo_1.details,
                            complete: newtodo_1.complete,
                            mdate: newtodo_1.date
                        }
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.rowsAffected.length >= 1) {
                        _this.Create(newtodo_1);
                        _this.readTodos();
                        console.log(data);
                        window.alert("saved successfully");
                    }
                    else {
                        window.alert("Failed Please Try again");
                    }
                })["catch"](function (err) {
                    window.alert("Creating error" + err);
                });
                _this.title.value = "";
                _this.textarea.value = "";
                _this.date.value = "";
                console.log(newtodo_1);
            }
        });
        return _this;
    }
    return Controller;
}(View));
var con = new Controller();
con.readTodos();
var State = /** @class */ (function () {
    function State() {
        this.Gdata = function () {
            console.log("connecting");
            fetch("http://localhost:8001/", {
                method: 'GET',
                mode: 'cors'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                State.Data = data;
                console.log(State.Data);
                con.readTodos();
            })["catch"](function (err) {
                console.log(err);
            });
            console.log("done connecting");
        };
    }
    State.Data = [];
    return State;
}());
var state = new State();
state.Gdata();
console.log(State.Data);
