/// <reference path="../../typings/index.d.ts" />
class MyPageModel extends Backbone.Model {
    constructor(args) {
        super(args);
        this.urlRoot = "users";
    }
    validate(attr, opt) {
    }
}
class MyPage extends Backbone.View {
    constructor(args) {
        super(args);
        console.log('mypage');
        let a = new MyPageModel({ "id": "1234" });
        console.log(a.url());
    }
}
//# sourceMappingURL=page.js.map