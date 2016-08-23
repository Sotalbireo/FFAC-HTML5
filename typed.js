/// <reference path="typings/index.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemModel = (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(argument) {
        _super.call(this, argument);
    }
    ItemModel.prototype.validate = function (attrs, opts) {
        if (!_.isNumber(attrs.atk)) {
            return "Items ATK point is not Number.";
        }
        if (!_.isNumber(attrs.cost)) {
            return "Items Cost is not Number.";
        }
    };
    return ItemModel;
}(Backbone.Model));
var ItemCollections = (function (_super) {
    __extends(ItemCollections, _super);
    function ItemCollections(argument) {
        _super.call(this, argument);
        this.model = ItemModel;
        this.url = 'app/data/item.json';
    }
    return ItemCollections;
}(Backbone.Collection));
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView(argument) {
        _super.call(this, argument);
        this.el = $('#c1 tbody');
        this.template = _.template($('#c2').html());
        this.model = new ItemModel({});
        this.collection = new ItemCollections({});
        this.collection.fetch();
        this.listenTo(this.collection, 'sync', this.perse);
    }
    ItemView.prototype.perse = function () {
        var _this = this;
        this.collection.each(function (ele, i) {
            if (!_this.model.isValid()) {
                _this.collection.remove(ele, { silent: true });
            }
        });
        this.render();
    };
    ItemView.prototype.render = function () {
        var _this = this;
        this.collection.each(function (model) {
            _this.el.append(_this.template(model.toJSON()));
        });
        return this;
    };
    return ItemView;
}(Backbone.View));
var Router = (function (_super) {
    __extends(Router, _super);
    function Router(argument) {
        _super.call(this, argument);
        this.routes = {
            "": "index",
            "#item": "itemView"
        };
    }
    Router.prototype.initialize = function () {
        _.bindAll(this);
    };
    Router.prototype.index = function () {
        console.log('index');
        new ItemView({});
    };
    Router.prototype.itemView = function () {
        console.log('itemView');
    };
    return Router;
}(Backbone.Router));
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(function () {
    new Router({});
    console.log(Backbone.history.start({ pushState: false, root: "" }));
});
