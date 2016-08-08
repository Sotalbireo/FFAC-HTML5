/// <reference path="typings/index.d.ts" />
class ItemModel extends Backbone.Model {
    constructor(argument) {
        super(argument);
    }
    validate(attrs, opts) {
        if (!_.isNumber(attrs.atk)) {
            return "Items ATK point is not Number.";
        }
        if (!_.isNumber(attrs.cost)) {
            return "Items Cost is not Number.";
        }
    }
}
class ItemCollections extends Backbone.Collection {
    constructor(argument) {
        super(argument);
        this.model = ItemModel;
        this.url = '/data';
    }
}
class MainView extends Backbone.View {
    constructor(argument) {
        super(argument);
        this.el = $('#a');
        this.tpl = _.template($('#b').html());
        this.render();
    }
    render() {
        let wrapr = document.createElement('p');
        wrapr.innerHTML += this.tpl({ 'name': 'john' });
        this.el.append(wrapr);
        return this;
    }
}
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(() => {
    new MainView({});
});
